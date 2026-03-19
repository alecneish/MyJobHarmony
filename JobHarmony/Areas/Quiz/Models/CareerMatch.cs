namespace JobHarmony.Areas.Quiz.Models;

public class CareerMatch
{
    public int Id { get; set; }
    public Guid SessionId { get; set; }
    public int CareerProfileId { get; set; }
    public double MatchScore { get; set; }
    public int Rank { get; set; }

    public QuizSession Session { get; set; } = null!;
    public CareerProfile CareerProfile { get; set; } = null!;
}
