namespace JobHarmony.Areas.Quiz.Models;

public class DimensionScore
{
    public int Id { get; set; }
    public Guid SessionId { get; set; }
    public string Dimension { get; set; } = string.Empty;
    public string Subdimension { get; set; } = string.Empty;
    public double RawScore { get; set; }
    public double NormalizedScore { get; set; }

    public QuizSession Session { get; set; } = null!;
}
