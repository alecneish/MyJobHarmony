using Microsoft.EntityFrameworkCore;
using JobHarmony.Areas.Quiz.Data;
using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Services;

public class CareerMatchingService
{
    private readonly QuizDbContext _db;

    private static readonly Dictionary<string, double> DimensionWeights = new()
    {
        // OCEAN traits — high weight (core personality)
        ["OCEAN"] = 1.0,
        // RIASEC interests — highest weight (direct career indicator)
        ["RIASEC"] = 1.2,
        // Work Values — medium weight
        ["Values"] = 0.8,
        // Work Environment — lower weight
        ["Environment"] = 0.6
    };

    public CareerMatchingService(QuizDbContext db)
    {
        _db = db;
    }

    public async Task<List<CareerMatch>> ComputeMatchesAsync(Guid sessionId)
    {
        var scores = await _db.DimensionScores
            .Where(d => d.SessionId == sessionId && d.Subdimension == "")
            .ToListAsync();

        if (scores.Count == 0)
            return new List<CareerMatch>();

        var userVector = BuildUserVector(scores);
        var careers = await _db.CareerProfiles.ToListAsync();

        // Clear any previous matches
        var oldMatches = await _db.CareerMatches
            .Where(m => m.SessionId == sessionId)
            .ToListAsync();
        _db.CareerMatches.RemoveRange(oldMatches);

        var matches = new List<CareerMatch>();

        foreach (var career in careers)
        {
            var careerVector = BuildCareerVector(career);
            double distance = WeightedEuclideanDistance(userVector, careerVector);

            // Max possible distance with all dimensions at 0-100 range
            double maxDistance = MaxPossibleDistance(userVector.Count);
            double matchPct = Math.Max(0, (1.0 - distance / maxDistance) * 100.0);

            matches.Add(new CareerMatch
            {
                SessionId = sessionId,
                CareerProfileId = career.Id,
                MatchScore = Math.Round(matchPct, 1)
            });
        }

        matches = matches.OrderByDescending(m => m.MatchScore).ToList();

        for (int i = 0; i < matches.Count; i++)
            matches[i].Rank = i + 1;

        _db.CareerMatches.AddRange(matches);
        await _db.SaveChangesAsync();

        return matches;
    }

    private Dictionary<string, (double Value, double Weight)> BuildUserVector(List<DimensionScore> scores)
    {
        var vector = new Dictionary<string, (double Value, double Weight)>();

        foreach (var score in scores)
        {
            string dimCategory = GetDimensionCategory(score.Dimension);
            double weight = DimensionWeights.GetValueOrDefault(dimCategory, 0.5);
            vector[score.Dimension] = (score.NormalizedScore, weight);
        }

        return vector;
    }

    private Dictionary<string, (double Value, double Weight)> BuildCareerVector(CareerProfile career)
    {
        var vector = new Dictionary<string, (double Value, double Weight)>();

        double oceanW = DimensionWeights["OCEAN"];
        vector["Openness"] = (career.Openness, oceanW);
        vector["Conscientiousness"] = (career.Conscientiousness, oceanW);
        vector["Extraversion"] = (career.Extraversion, oceanW);
        vector["Agreeableness"] = (career.Agreeableness, oceanW);
        vector["EmotionalStability"] = (career.EmotionalStability, oceanW);

        double riasecW = DimensionWeights["RIASEC"];
        vector["Realistic"] = (career.Realistic, riasecW);
        vector["Investigative"] = (career.Investigative, riasecW);
        vector["Artistic"] = (career.Artistic, riasecW);
        vector["Social"] = (career.Social, riasecW);
        vector["Enterprising"] = (career.Enterprising, riasecW);
        vector["Conventional"] = (career.Conventional, riasecW);

        double valW = DimensionWeights["Values"];
        vector["Autonomy"] = (career.ValAutonomy, valW);
        vector["Security"] = (career.ValSecurity, valW);
        vector["Challenge"] = (career.ValChallenge, valW);
        vector["Service"] = (career.ValService, valW);
        vector["WorkLifeBalance"] = (career.ValWorkLifeBalance, valW);

        double envW = DimensionWeights["Environment"];
        vector["Pace"] = (career.EnvPace, envW);
        vector["Collaboration"] = (career.EnvCollaboration, envW);
        vector["Structure"] = (career.EnvStructure, envW);

        return vector;
    }

    private static double WeightedEuclideanDistance(
        Dictionary<string, (double Value, double Weight)> a,
        Dictionary<string, (double Value, double Weight)> b)
    {
        double sumSquared = 0;
        double totalWeight = 0;

        foreach (var key in b.Keys)
        {
            if (!a.ContainsKey(key)) continue;

            double diff = a[key].Value - b[key].Value;
            double weight = b[key].Weight;
            sumSquared += weight * diff * diff;
            totalWeight += weight;
        }

        if (totalWeight == 0) return 0;
        return Math.Sqrt(sumSquared / totalWeight);
    }

    private static double MaxPossibleDistance(int dimensionCount)
    {
        return 100.0; // Max difference per dimension is 100, normalized by weight
    }

    private static string GetDimensionCategory(string dimension)
    {
        return dimension switch
        {
            "Openness" or "Conscientiousness" or "Extraversion"
                or "Agreeableness" or "EmotionalStability" => "OCEAN",
            "Realistic" or "Investigative" or "Artistic"
                or "Social" or "Enterprising" or "Conventional" => "RIASEC",
            "Autonomy" or "Security" or "Challenge"
                or "Service" or "WorkLifeBalance" => "Values",
            "Pace" or "Collaboration" or "Structure" => "Environment",
            _ => "Other"
        };
    }
}
