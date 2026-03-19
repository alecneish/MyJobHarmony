using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobHarmony.Areas.Quiz.Data;
using JobHarmony.Areas.Quiz.ViewModels;

namespace JobHarmony.Areas.Quiz.Controllers;

[Area("Quiz")]
public class ResultsController : Controller
{
    private readonly QuizDbContext _db;

    public ResultsController(QuizDbContext db)
    {
        _db = db;
    }

    public async Task<IActionResult> Summary(Guid id)
    {
        var session = await _db.QuizSessions
            .FirstOrDefaultAsync(s => s.Id == id && s.IsComplete);

        if (session == null)
            return RedirectToAction("Index", "Quiz");

        var scores = await _db.DimensionScores
            .Where(d => d.SessionId == id && d.Subdimension == "")
            .ToListAsync();

        var matches = await _db.CareerMatches
            .Include(m => m.CareerProfile)
            .Where(m => m.SessionId == id)
            .OrderBy(m => m.Rank)
            .Take(15)
            .ToListAsync();

        var oceanDims = new[] { "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "EmotionalStability" };
        var riasecDims = new[] { "Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional" };
        var valueDims = new[] { "Autonomy", "Security", "Challenge", "Service", "WorkLifeBalance" };
        var envDims = new[] { "Pace", "Collaboration", "Structure" };

        var vm = new ResultsViewModel
        {
            SessionId = id,
            Tier = session.Tier,
            PersonalityScores = BuildScoreList(scores, oceanDims),
            InterestScores = BuildScoreList(scores, riasecDims),
            ValueScores = BuildScoreList(scores, valueDims),
            EnvironmentScores = BuildScoreList(scores, envDims),
            TopCareers = matches.Select(m => new CareerMatchViewModel
            {
                Rank = m.Rank,
                Title = m.CareerProfile.Title,
                Category = m.CareerProfile.Category,
                Description = m.CareerProfile.Description,
                MatchScore = m.MatchScore
            }).ToList()
        };

        vm.HollandCode = ComputeHollandCode(vm.InterestScores);
        vm.PersonalitySummary = BuildPersonalitySummary(vm.PersonalityScores);
        vm.ValuesSummary = BuildValuesSummary(vm.ValueScores);
        vm.EnvironmentSummary = BuildEnvironmentSummary(vm.EnvironmentScores);

        return View(vm);
    }

    private static List<DimensionScoreViewModel> BuildScoreList(
        List<Models.DimensionScore> scores, string[] dimensions)
    {
        return dimensions.Select(d =>
        {
            var score = scores.FirstOrDefault(s => s.Dimension == d);
            var normalizedScore = score?.NormalizedScore ?? 50.0;

            var (lowDesc, highDesc) = ResultsViewModel.DimensionDescriptions
                .GetValueOrDefault(d, ("", ""));
            var description = normalizedScore >= 50 ? highDesc : lowDesc;

            return new DimensionScoreViewModel
            {
                Dimension = d,
                Label = ResultsViewModel.DimensionLabels.GetValueOrDefault(d, d),
                Score = normalizedScore,
                Description = description
            };
        }).ToList();
    }

    private static string ComputeHollandCode(List<DimensionScoreViewModel> interestScores)
    {
        var top3 = interestScores
            .OrderByDescending(s => s.Score)
            .Take(3)
            .Select(s => s.Dimension[0])
            .ToArray();

        return new string(top3);
    }

    private static string BuildPersonalitySummary(List<DimensionScoreViewModel> scores)
    {
        var highlights = new List<string>();

        foreach (var s in scores.Where(s => s.Score >= 70 || s.Score <= 30))
        {
            highlights.Add(s.Description);
        }

        if (highlights.Count == 0)
        {
            return "You have a balanced personality profile with moderate scores across most dimensions. " +
                   "This flexibility means you can adapt to a wide range of career environments.";
        }

        return string.Join(" ", highlights);
    }

    private static string BuildValuesSummary(List<DimensionScoreViewModel> scores)
    {
        var topValues = scores.OrderByDescending(s => s.Score).Take(2).ToList();
        var parts = topValues.Select(v => $"{v.Label} ({v.Score:F0}%)");
        return $"Your top career motivators are {string.Join(" and ", parts)}. " +
               topValues.First().Description;
    }

    private static string BuildEnvironmentSummary(List<DimensionScoreViewModel> scores)
    {
        var parts = new List<string>();

        var pace = scores.FirstOrDefault(s => s.Dimension == "Pace");
        if (pace != null)
            parts.Add(pace.Score >= 60 ? "a fast-paced, dynamic environment" : "a steady, thoughtful pace");

        var collab = scores.FirstOrDefault(s => s.Dimension == "Collaboration");
        if (collab != null)
            parts.Add(collab.Score >= 60 ? "close team collaboration" : "independent, focused work");

        var structure = scores.FirstOrDefault(s => s.Dimension == "Structure");
        if (structure != null)
            parts.Add(structure.Score >= 60 ? "clear processes and guidelines" : "flexibility and autonomy");

        return $"You work best with {string.Join(", ", parts)}.";
    }
}
