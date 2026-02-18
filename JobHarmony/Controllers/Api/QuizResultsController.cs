using JobHarmony.Data;
using JobHarmony.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobHarmony.Controllers.Api;

[ApiController]
[Route("api/quiz")]
public class QuizResultsController : ControllerBase
{
    private readonly JobHarmonyContext _context;

    public QuizResultsController(JobHarmonyContext context)
    {
        _context = context;
    }

    // POST /api/quiz/results
    [HttpPost("results")]
    public async Task<IActionResult> SubmitResults([FromBody] QuizResultDto dto)
    {
        var result = new QuizResult
        {
            Openness = dto.Openness,
            Conscientiousness = dto.Conscientiousness,
            Extraversion = dto.Extraversion,
            Agreeableness = dto.Agreeableness,
            EmotionalStability = dto.EmotionalStability,
            DominantTrait = dto.DominantTrait,
            MotivationType = dto.MotivationType,
            CreatedAt = DateTime.UtcNow
        };

        _context.QuizResults.Add(result);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            resultId = result.Id,
            message = "Your results have been saved!"
        });
    }
}

public class QuizResultDto
{
    public int Openness { get; set; }
    public int Conscientiousness { get; set; }
    public int Extraversion { get; set; }
    public int Agreeableness { get; set; }
    public int EmotionalStability { get; set; }
    public string DominantTrait { get; set; } = "";
    public string MotivationType { get; set; } = "";
}
