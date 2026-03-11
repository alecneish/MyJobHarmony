namespace JobHarmony.Areas.Quiz.Models;

public class QuizSession
{
    public Guid Id { get; set; }
    public string Tier { get; set; } = "Free";
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public bool IsComplete { get; set; }

    public ICollection<Response> Responses { get; set; } = new List<Response>();
    public ICollection<DimensionScore> DimensionScores { get; set; } = new List<DimensionScore>();
    public ICollection<CareerMatch> CareerMatches { get; set; } = new List<CareerMatch>();
}
