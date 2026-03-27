import { DimensionScore, CareerProfile, CareerMatch } from '../types';
import {
  buildCareerVector,
  buildUserVector,
  weightedEuclideanDistance,
  distanceToMatchPercent,
} from './fitScoring';

export function computeMatches(
  dimensionScores: DimensionScore[],
  careers: CareerProfile[],
  topN = 15,
): CareerMatch[] {
  // Only use aggregate (no-subdimension) scores
  const aggregateScores = dimensionScores.filter(s => s.subdimension === '');

  if (aggregateScores.length === 0) return [];

  const userVector = buildUserVector(aggregateScores);

  const matches = careers.map(career => {
    const careerVector = buildCareerVector(career);
    const distance = weightedEuclideanDistance(userVector, careerVector);
    const matchPct = distanceToMatchPercent(distance);

    return {
      careerProfileId: career.id,
      title: career.title,
      matchScore: Math.round(matchPct * 10) / 10,
      rank: 0,
    };
  });

  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches.slice(0, topN).map((m, i) => ({ ...m, rank: i + 1 }));
}
