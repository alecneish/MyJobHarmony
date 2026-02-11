namespace JobHarmony.Models;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Company { get; set; } = "";
    public string LogoEmoji { get; set; } = "";
    public string Location { get; set; } = "";
    public string Salary { get; set; } = "";
    public string Type { get; set; } = "";
    public int FitScore { get; set; }
    public string FitLevel { get; set; } = "";
    public string FitReason { get; set; } = "";
    public List<string> Tags { get; set; } = new();
    public int PostedDaysAgo { get; set; }
}
