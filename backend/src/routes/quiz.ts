import { Router, Request, Response } from 'express';
import { getQuizQuestions } from '../data/seedData';
import { getCareerProfiles } from '../data/careerProfiles';
import { computeScores } from '../services/scoringEngine';
import { computeMatches } from '../services/careerMatchingService';
import { supabase } from '../db/database';
import { QuizResponse } from '../types';

const router = Router();

router.get('/questions', (_req: Request, res: Response) => {
  const questions = getQuizQuestions();
  res.json(questions);
});

router.post('/submit', async (req: Request, res: Response) => {
  const { responses, userId } = req.body as { responses: QuizResponse[]; userId?: string };

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
  const dimensionScores = computeScores(responses);
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
