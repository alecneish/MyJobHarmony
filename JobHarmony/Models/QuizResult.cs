namespace JobHarmony.Models;

public class QuizResult
{
    public int Id { get; set; }
    public int? ApplicantId { get; set; }
    public int Openness { get; set; }
    public int Conscientiousness { get; set; }
    public int Extraversion { get; set; }
    public int Agreeableness { get; set; }
    public int EmotionalStability { get; set; }
    public string DominantTrait { get; set; } = "";
    public string MotivationType { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Applicant? Applicant { get; set; }
}
