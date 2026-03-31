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

  const { data, error } = await supabase
    .from('QuizQuestions')
    .select('*')
    .order('Id', { ascending: true });

  if (error || !data) {
    // Keep the app usable locally even if Supabase is misconfigured.
    if (error) console.error('Failed to load quiz questions from Supabase:', error);
    // Still apply tier filtering on seed data fallback
    const seedQuestions = getSeedQuizQuestions();
    res.json(filterByTier(seedQuestions, tierParam));
    return;
  }

  // The DB Tier column defaults to 'Free' for all rows (never backfilled).
  // Use the seed data's tier assignments as the source of truth.
  const seedTierById = new Map(getSeedQuizQuestions().map(q => [q.id, q.tier]));

  const allQuestions: QuizQuestion[] = data.map((row: any) => ({
    id: row.Id,
    text: row.QuestionText,
    dimension: row.Dimension ?? '',
    subdimension: row.Subdimension ?? '',
    section: row.Section ?? '',
    sectionOrder: row.SectionOrder ?? 0,
    questionFormat: row.QuestionFormat ?? 'Likert',
    isReverseScored: Boolean(row.IsReverseScored),
    weight: Number(row.Weight ?? 1.0),
    tier: seedTierById.get(row.Id) ?? row.Tier ?? 'Free',
  }));

  questionCache = allQuestions;
  res.json(filterByTier(allQuestions, tierParam));
});

function filterByTier(allQuestions: QuizQuestion[], tierParam: string): QuizQuestion[] {
  if (tierParam === 'medium') {
    return allQuestions.filter(q => q.tier === 'Free');
  } else if (tierParam === 'short') {
    // One Free question per dimension, deterministic (first by ID order)
    const seenDimensions = new Set<string>();
    const questions: QuizQuestion[] = [];
    for (const q of allQuestions.filter(q => q.tier === 'Free')) {
      if (!seenDimensions.has(q.dimension)) {
        seenDimensions.add(q.dimension);
        questions.push(q);
      }
    }
    return questions;
  } else {
    return allQuestions;
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
    const { data: qData, error: qErr } = await supabase
      .from('QuizQuestions')
      .select('*')
      .order('Id', { ascending: true });

    if (qErr || !qData) {
      if (qErr) console.error('Failed to load quiz questions from Supabase for scoring:', qErr);
      questionCache = getSeedQuizQuestions();
    } else {
      const seedTierById = new Map(getSeedQuizQuestions().map(q => [q.id, q.tier]));
      questionCache = qData.map((row: any) => ({
        id: row.Id,
        text: row.QuestionText,
        dimension: row.Dimension ?? '',
        subdimension: row.Subdimension ?? '',
        section: row.Section ?? '',
        sectionOrder: row.SectionOrder ?? 0,
        questionFormat: row.QuestionFormat ?? 'Likert',
        isReverseScored: Boolean(row.IsReverseScored),
        weight: Number(row.Weight ?? 1.0),
        tier: seedTierById.get(row.Id) ?? row.Tier ?? 'Free',
      }));
    }
  }

  const dimensionScores = computeScores(responses, questionCache);
  const careers = getCareerProfiles();
  const careerMatches = computeMatches(dimensionScores, careers);

  // Respond immediately — client gets results without waiting for DB writes.
  // Persistence runs in the background; sessionId is sent once the session row is created.
  // If persistence fails the results are still in localStorage on the client.
  res.json({ success: true, sessionId: null, dimensionScores, careerMatches });

  // Background persistence — does not block the response
  (async () => {
    try {
      // 1. Create session first (needed for foreign keys on subsequent inserts)
      const { data: session, error: sessionErr } = await supabase
        .from('quiz_sessions')
        .insert({ user_id: userId ?? null })
        .select('id')
        .single();

      if (sessionErr || !session) throw sessionErr ?? new Error('Failed to create session');

      const sessionId: string = session.id;

      // 2. Persist responses, scores, and matches in parallel
      const [responsesResult, scoresResult, matchesResult] = await Promise.all([
        supabase.from('quiz_responses').insert(
          responses.map(r => ({
            session_id:   sessionId,
            question_id:  r.questionId,
            answer_value: r.answerValue,
          }))
        ),
        supabase.from('dimension_scores').insert(
          dimensionScores.map(s => ({
            session_id:       sessionId,
            dimension:        s.dimension,
            subdimension:     s.subdimension,
            raw_score:        s.rawScore,
            normalized_score: s.normalizedScore,
          }))
        ),
        supabase.from('career_matches').insert(
          careerMatches.map(m => ({
            session_id:        sessionId,
            career_profile_id: m.careerProfileId,
            match_score:       m.matchScore,
            rank:              m.rank,
          }))
        ),
      ]);

      if (responsesResult.error) console.error('Failed to persist quiz_responses:', responsesResult.error);
      if (scoresResult.error) console.error('Failed to persist dimension_scores:', scoresResult.error);
      if (matchesResult.error) console.error('Failed to persist career_matches:', matchesResult.error);
    } catch (err) {
      console.error('Background persistence error:', err);
    }
  })();
});

export default router;
