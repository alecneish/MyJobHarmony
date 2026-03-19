namespace JobHarmony.Areas.Quiz.Models;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Dimension { get; set; } = string.Empty;
    public string Subdimension { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public int SectionOrder { get; set; }
    public string QuestionFormat { get; set; } = "Likert";
    public bool IsReverseScored { get; set; }
    public double Weight { get; set; } = 1.0;
    public string Tier { get; set; } = "Free";

    public ICollection<Response> Responses { get; set; } = new List<Response>();
}
