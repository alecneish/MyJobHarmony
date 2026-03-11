using Microsoft.AspNetCore.Mvc;
using JobHarmony.Areas.Quiz.Services;
using JobHarmony.Areas.Quiz.ViewModels;

namespace JobHarmony.Areas.Quiz.Controllers;

[Area("Quiz")]
public class QuizController : Controller
{
    private readonly QuizService _quizService;
    private readonly ScoringEngine _scoringEngine;
    private readonly CareerMatchingService _matchingService;
    private const string SessionCookieKey = "QuizSessionId";

    public QuizController(
        QuizService quizService,
        ScoringEngine scoringEngine,
        CareerMatchingService matchingService)
    {
        _quizService = quizService;
        _scoringEngine = scoringEngine;
        _matchingService = matchingService;
    }

    public async Task<IActionResult> Index()
    {
        var freeCount = await _quizService.GetTotalQuestionCountAsync("Free");
        var premiumCount = await _quizService.GetTotalQuestionCountAsync("Premium");

        var vm = new QuizStartViewModel
        {
            FreeQuestionCount = freeCount,
            PremiumQuestionCount = premiumCount,
            FreeEstimatedMinutes = Math.Max(5, (int)Math.Ceiling(freeCount * 0.3)),
            PremiumEstimatedMinutes = Math.Max(15, (int)Math.Ceiling(premiumCount * 0.3))
        };

        return View(vm);
    }

    [HttpPost]
    public async Task<IActionResult> Start(string tier)
    {
        tier = tier == "Premium" ? "Premium" : "Free";
        var session = await _quizService.StartSessionAsync(tier);

        Response.Cookies.Append(SessionCookieKey, session.Id.ToString(), new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        });

        return RedirectToAction("Take");
    }

    public async Task<IActionResult> Take()
    {
        var sessionId = GetSessionId();
        if (sessionId == null)
            return RedirectToAction("Index");

        var session = await _quizService.GetSessionAsync(sessionId.Value);
        if (session == null)
            return RedirectToAction("Index");

        var questions = await _quizService.GetQuestionsForTierAsync(session.Tier);
        var answeredIds = session.Responses.ToDictionary(r => r.QuestionId, r => r.AnswerValue);

        var sections = questions
            .GroupBy(q => q.Section)
            .Select(g => new QuizSectionViewModel
            {
                SectionName = g.Key,
                SectionDescription = QuizPageViewModel.SectionDescriptions.GetValueOrDefault(g.Key, ""),
                Questions = g.Select(q => new QuestionViewModel
                {
                    Id = q.Id,
                    Text = q.Text,
                    QuestionFormat = q.QuestionFormat,
                    CurrentAnswer = answeredIds.ContainsKey(q.Id) ? answeredIds[q.Id] : null
                }).ToList()
            })
            .ToList();

        var vm = new QuizPageViewModel
        {
            SessionId = session.Id,
            Tier = session.Tier,
            Sections = sections,
            TotalQuestions = questions.Count,
            AnsweredQuestions = answeredIds.Count
        };

        return View(vm);
    }

    [HttpPost]
    public async Task<IActionResult> SaveAnswer([FromBody] SaveAnswerRequest request)
    {
        var sessionId = GetSessionId();
        if (sessionId == null)
            return Unauthorized();

        await _quizService.SaveResponseAsync(sessionId.Value, request.QuestionId, request.AnswerValue);

        var answered = await _quizService.GetAnsweredCountAsync(sessionId.Value);
        var session = await _quizService.GetSessionAsync(sessionId.Value);
        var total = await _quizService.GetTotalQuestionCountAsync(session!.Tier);

        return Json(new { answered, total });
    }

    [HttpPost]
    public async Task<IActionResult> Complete()
    {
        var sessionId = GetSessionId();
        if (sessionId == null)
            return RedirectToAction("Index");

        await _quizService.CompleteSessionAsync(sessionId.Value);
        await _scoringEngine.ComputeScoresAsync(sessionId.Value);
        await _matchingService.ComputeMatchesAsync(sessionId.Value);

        return RedirectToAction("Summary", "Results", new { id = sessionId.Value });
    }

    private Guid? GetSessionId()
    {
        if (Request.Cookies.TryGetValue(SessionCookieKey, out var value) && Guid.TryParse(value, out var id))
            return id;
        return null;
    }
}

public class SaveAnswerRequest
{
    public int QuestionId { get; set; }
    public int AnswerValue { get; set; }
}
