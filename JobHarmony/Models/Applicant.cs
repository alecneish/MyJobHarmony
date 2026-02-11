namespace JobHarmony.Models;

public class Applicant
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Initials { get; set; } = "";
    public string AvatarColor { get; set; } = "";
    public int ResumeFitPercent { get; set; }
    public int PersonalityFitPercent { get; set; }
    public List<string> Skills { get; set; } = new();
    public bool IsRecommended { get; set; }
    public string Title { get; set; } = "";
}
