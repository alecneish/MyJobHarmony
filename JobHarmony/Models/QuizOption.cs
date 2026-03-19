namespace JobHarmony.Models;

public class QuizOption
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string Label { get; set; } = "";
    public string Trait { get; set; } = "";
    public int Weight { get; set; }

    public QuizQuestion Question { get; set; } = null!;
}
