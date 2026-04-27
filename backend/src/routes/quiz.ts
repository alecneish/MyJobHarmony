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

// Module-level cache — quiz questions rarely change, no need to re-fetch on every submit
let questionCache: QuizQuestion[] | null = null;

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

router.get('/questions', async (req: Request, res: Response) => {
  const tierParam = (req.query.tier as string) || 'full';
  const seedQuestions = getSeedQuizQuestions();
  const seedById = new Map(seedQuestions.map((q) => [q.id, q]));

  const { data, error } = await supabase
    .from('QuizQuestions')
    .select('*')
    .order('Id', { ascending: true });

  if (error || !data) {
    // Keep the app usable locally even if Supabase is misconfigured.
    if (error) console.error('Failed to load quiz questions from Supabase:', error);
    // Still apply tier filtering on seed data fallback
    res.json(filterByTier(seedQuestions, tierParam));
    return;
  }

  // The DB Tier column defaults to 'Free' for all rows (never backfilled).
  // Use seed data as source of truth for tier and question wording.

  const allQuestions: QuizQuestion[] = data.map((row: any) => ({
    id: row.Id,
    text: seedById.get(row.Id)?.text ?? row.QuestionText,
    dimension: seedById.get(row.Id)?.dimension ?? row.Dimension ?? '',
    subdimension: seedById.get(row.Id)?.subdimension ?? row.Subdimension ?? '',
    section: seedById.get(row.Id)?.section ?? row.Section ?? '',
    sectionOrder: seedById.get(row.Id)?.sectionOrder ?? row.SectionOrder ?? 0,
    questionFormat: seedById.get(row.Id)?.questionFormat ?? row.QuestionFormat ?? 'Likert',
    isReverseScored: seedById.get(row.Id)?.isReverseScored ?? Boolean(row.IsReverseScored),
    weight: seedById.get(row.Id)?.weight ?? Number(row.Weight ?? 1.0),
    tier: seedById.get(row.Id)?.tier ?? row.Tier ?? 'Free',
  }));

  questionCache = allQuestions;
  res.json(filterByTier(allQuestions, tierParam));
});

function filterByTier(allQuestions: QuizQuestion[], tierParam: string): QuizQuestion[] {
  if (tierParam === 'medium') {
    return allQuestions.filter(q => q.tier === 'Free');
  } else if (tierParam === 'short') {
    // 10-question snapshot from the Free pool (deterministic by ID order).
    return allQuestions.filter(q => q.tier === 'Free').slice(0, 10);
  } else {
    // Full assessment is fixed to 62 questions.
    return allQuestions.slice(0, 62);
  }
}

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

  // Use cached questions — avoids a DB round trip on every submission.
  // Cache is populated by GET /questions; fall back to seed data if not yet warm.
  if (!questionCache) {
    const seedQuestions = getSeedQuizQuestions();
    const seedById = new Map(seedQuestions.map((q) => [q.id, q]));
    const { data: qData, error: qErr } = await supabase
      .from('QuizQuestions')
      .select('*')
      .order('Id', { ascending: true });

    if (qErr || !qData) {
      if (qErr) console.error('Failed to load quiz questions from Supabase for scoring:', qErr);
      questionCache = seedQuestions;
    } else {
      questionCache = qData.map((row: any) => ({
        id: row.Id,
        text: seedById.get(row.Id)?.text ?? row.QuestionText,
        dimension: seedById.get(row.Id)?.dimension ?? row.Dimension ?? '',
        subdimension: seedById.get(row.Id)?.subdimension ?? row.Subdimension ?? '',
        section: seedById.get(row.Id)?.section ?? row.Section ?? '',
        sectionOrder: seedById.get(row.Id)?.sectionOrder ?? row.SectionOrder ?? 0,
        questionFormat: seedById.get(row.Id)?.questionFormat ?? row.QuestionFormat ?? 'Likert',
        isReverseScored: seedById.get(row.Id)?.isReverseScored ?? Boolean(row.IsReverseScored),
        weight: seedById.get(row.Id)?.weight ?? Number(row.Weight ?? 1.0),
        tier: seedById.get(row.Id)?.tier ?? row.Tier ?? 'Free',
      }));
    }
  }

  const dimensionScores = computeScores(responses, questionCache);
  const careers = getCareerProfiles();
  const careerMatches = computeMatches(dimensionScores, careers);

  // Persist before responding so the client knows whether results were stored.
  // optionalAuth must attach authUser whenever the JWT is valid (even without user_profiles),
  // or user_id is null and the session is anonymous.
  //
  // Logged-in users: only the latest attempt matters — remove prior sessions for this user
  // (cascades to quiz_responses, dimension_scores, career_matches).
  try {
    if (userId) {
      const { error: deleteErr } = await supabase
        .from('quiz_sessions')
        .delete()
        .eq('user_id', userId);

      if (deleteErr) throw deleteErr;
    }

    const { data: session, error: sessionErr } = await supabase
      .from('quiz_sessions')
      .insert({ user_id: userId ?? null })
      .select('id')
      .single();

    if (sessionErr || !session) {
      throw sessionErr ?? new Error('Failed to create session');
    }

    const sessionId: string = session.id;

    const [responsesResult, scoresResult, matchesResult] = await Promise.all([
      supabase.from('quiz_responses').insert(
        responses.map(r => ({
          session_id: sessionId,
          question_id: r.questionId,
          answer_value: r.answerValue,
        })),
      ),
      supabase.from('dimension_scores').insert(
        dimensionScores.map(s => ({
          session_id: sessionId,
          dimension: s.dimension,
          subdimension: s.subdimension,
          raw_score: s.rawScore,
          normalized_score: s.normalizedScore,
        })),
      ),
      supabase.from('career_matches').insert(
        careerMatches.map(m => ({
          session_id: sessionId,
          career_profile_id: m.careerProfileId,
          match_score: m.matchScore,
          rank: m.rank,
        })),
      ),
    ]);

    if (responsesResult.error) throw responsesResult.error;
    if (scoresResult.error) throw scoresResult.error;
    if (matchesResult.error) throw matchesResult.error;

    res.json({
      success: true,
      persisted: true,
      sessionId,
      dimensionScores,
      careerMatches,
    });
  } catch (err) {
    console.error('Quiz persistence error:', err);
    const message =
      userId != null
        ? 'Could not save your quiz results. Please try again.'
        : 'Could not save your quiz session.';

    res.status(200).json({
      success: false,
      persisted: false,
      message,
      sessionId: null,
      dimensionScores,
      careerMatches,
    });
  }
});

export default router;
