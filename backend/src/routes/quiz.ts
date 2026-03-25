import { Router, Request, Response } from 'express';
import { getCareerProfiles } from '../data/careerProfiles';
import { getQuizQuestions as getSeedQuizQuestions } from '../data/seedData';
import { computeScores } from '../services/scoringEngine';
import { computeMatches } from '../services/careerMatchingService';
import { supabase } from '../db/database';
import { QuizQuestion, QuizResponse } from '../types';
import { optionalAuth } from '../middleware';
import type { AuthenticatedRequest } from '../middleware';

const router = Router();

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, token] = header.split(' ');
  if (!type || type.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim();
}

async function resolveUserId(req: Request): Promise<string | null> {
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user?.id) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

router.get('/questions', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('QuizQuestions')
    .select('*')
    .order('Id', { ascending: true });

  if (error || !data) {
    // Keep the app usable locally even if Supabase is misconfigured.
    if (error) console.error('Failed to load quiz questions from Supabase:', error);
    res.json(getSeedQuizQuestions());
    return;
  }

  const questions: QuizQuestion[] = data.map((row: any) => ({
    id: row.Id,
    text: row.QuestionText,
    dimension: row.Dimension ?? '',
    subdimension: row.Subdimension ?? '',
    section: row.Section ?? '',
    sectionOrder: row.SectionOrder ?? 0,
    questionFormat: row.QuestionFormat ?? 'Likert',
    isReverseScored: Boolean(row.IsReverseScored),
    weight: Number(row.Weight ?? 1.0),
    tier: row.Tier ?? 'Free',
  }));

  res.json(questions);
});

router.get('/last', async (req: Request, res: Response) => {
  const userId = await resolveUserId(req);
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { data: session, error: sessionErr } = await supabase
    .from('quiz_sessions')
    .select('id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (sessionErr) {
    console.error('Failed to load last quiz session:', sessionErr);
    res.status(500).json({ message: 'Failed to load last quiz session' });
    return;
  }

  if (!session?.id) {
    res.status(404).json({ message: 'No saved quiz results' });
    return;
  }

  const sessionId = session.id as string;

  const { data: scores, error: scoresErr } = await supabase
    .from('dimension_scores')
    .select('dimension, subdimension, raw_score, normalized_score')
    .eq('session_id', sessionId);

  if (scoresErr || !scores) {
    console.error('Failed to load dimension scores:', scoresErr);
    res.status(500).json({ message: 'Failed to load dimension scores' });
    return;
  }

  const dimensionScores = scores.map((row: any) => ({
    dimension: row.dimension,
    subdimension: row.subdimension ?? '',
    rawScore: Number(row.raw_score),
    normalizedScore: Number(row.normalized_score),
  }));

  const careers = getCareerProfiles();
  const careerMatches = computeMatches(dimensionScores as any, careers);

  res.json({ sessionId, dimensionScores, careerMatches });
});

router.post('/submit', optionalAuth, async (req: Request, res: Response) => {
  const { responses } = req.body as { responses: QuizResponse[] };
  const userId = (req as AuthenticatedRequest).authUser?.id ?? null;

  if (!Array.isArray(responses) || responses.length === 0) {
    res.status(400).json({ success: false, message: 'responses must be a non-empty array' });
    return;
  }

  for (const r of responses) {
    if (typeof r.questionId !== 'number' || typeof r.answerValue !== 'number' ||
        r.answerValue < 1 || r.answerValue > 5) {
      res.status(400).json({ success: false, message: 'Each response requires questionId and answerValue (1–5)' });
      return;
    }
  }

  // Compute scores and matches in memory
  const { data: qData, error: qErr } = await supabase
    .from('QuizQuestions')
    .select('*')
    .order('Id', { ascending: true });

  const questions: QuizQuestion[] =
    qErr || !qData
      ? (qErr && (console.error('Failed to load quiz questions from Supabase for scoring:', qErr), null),
        getSeedQuizQuestions())
      : qData.map((row: any) => ({
          id: row.Id,
          text: row.QuestionText,
          dimension: row.Dimension ?? '',
          subdimension: row.Subdimension ?? '',
          section: row.Section ?? '',
          sectionOrder: row.SectionOrder ?? 0,
          questionFormat: row.QuestionFormat ?? 'Likert',
          isReverseScored: Boolean(row.IsReverseScored),
          weight: Number(row.Weight ?? 1.0),
          tier: row.Tier ?? 'Free',
        }));

  const dimensionScores = computeScores(responses, questions);
  const careers = getCareerProfiles();
  const careerMatches = computeMatches(dimensionScores, careers);

  // Persist to Supabase
  try {
    // 1. Create session
    const { data: session, error: sessionErr } = await supabase
      .from('quiz_sessions')
      .insert({ user_id: userId ?? null })
      .select('id')
      .single();

    if (sessionErr || !session) throw sessionErr ?? new Error('Failed to create session');

    const sessionId: string = session.id;

    // 2. Persist raw responses
    const { error: responsesErr } = await supabase
      .from('quiz_responses')
      .insert(responses.map(r => ({
        session_id:   sessionId,
        question_id:  r.questionId,
        answer_value: r.answerValue,
      })));

    if (responsesErr) throw responsesErr;

    // 3. Persist dimension scores
    const { error: scoresErr } = await supabase
      .from('dimension_scores')
      .insert(dimensionScores.map(s => ({
        session_id:       sessionId,
        dimension:        s.dimension,
        subdimension:     s.subdimension,
        raw_score:        s.rawScore,
        normalized_score: s.normalizedScore,
      })));

    if (scoresErr) throw scoresErr;

    // 4. Persist career matches
    const { error: matchesErr } = await supabase
      .from('career_matches')
      .insert(careerMatches.map(m => ({
        session_id:        sessionId,
        career_profile_id: m.careerProfileId,
        match_score:       m.matchScore,
        rank:              m.rank,
      })));

    if (matchesErr) throw matchesErr;

    res.json({ success: true, sessionId, dimensionScores, careerMatches });
  } catch (err) {
    console.error('Persistence error:', err);
    // Still return results even if DB write fails
    res.json({ success: true, sessionId: null, dimensionScores, careerMatches });
  }
});

export default router;
