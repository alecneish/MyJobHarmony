using Microsoft.EntityFrameworkCore;
using JobHarmony.Areas.Quiz.Data;
using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Services;

public class ScoringEngine
{
    private readonly QuizDbContext _db;

    public ScoringEngine(QuizDbContext db)
    {
        _db = db;
    }

    public async Task<List<DimensionScore>> ComputeScoresAsync(Guid sessionId)
    {
        var responses = await _db.Responses
            .Include(r => r.Question)
            .Where(r => r.SessionId == sessionId)
            .ToListAsync();

        if (responses.Count == 0)
            return new List<DimensionScore>();

        // Clear any previous scores for this session
        var oldScores = await _db.DimensionScores
            .Where(d => d.SessionId == sessionId)
            .ToListAsync();
        _db.DimensionScores.RemoveRange(oldScores);

        var grouped = responses.GroupBy(r => new { r.Question.Dimension, r.Question.Subdimension });

        var scores = new List<DimensionScore>();

        foreach (var group in grouped)
        {
            double weightedSum = 0;
            double totalWeight = 0;

            foreach (var response in group)
            {
                int value = response.AnswerValue;

                if (response.Question.IsReverseScored)
                    value = 6 - value; // Flip 1-5 scale: 1→5, 2→4, 3→3, 4→2, 5→1

                weightedSum += value * response.Question.Weight;
                totalWeight += response.Question.Weight;
            }

            double rawAvg = totalWeight > 0 ? weightedSum / totalWeight : 3.0;
            double normalized = ((rawAvg - 1.0) / 4.0) * 100.0;

            var score = new DimensionScore
            {
                SessionId = sessionId,
                Dimension = group.Key.Dimension,
                Subdimension = group.Key.Subdimension,
                RawScore = Math.Round(rawAvg, 2),
                NormalizedScore = Math.Round(normalized, 1)
            };

            scores.Add(score);
        }

        // Also compute aggregate dimension scores (averaging subdimensions)
        var aggregated = scores
            .Where(s => !string.IsNullOrEmpty(s.Subdimension))
            .GroupBy(s => s.Dimension)
            .Select(g => new DimensionScore
            {
                SessionId = sessionId,
                Dimension = g.Key,
                Subdimension = "",
                RawScore = Math.Round(g.Average(s => s.RawScore), 2),
                NormalizedScore = Math.Round(g.Average(s => s.NormalizedScore), 1)
            })
            .ToList();

        scores.AddRange(aggregated);
        _db.DimensionScores.AddRange(scores);
        await _db.SaveChangesAsync();

        return scores;
    }
}
