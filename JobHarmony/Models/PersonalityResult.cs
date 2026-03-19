namespace JobHarmony.Models;

public class PersonalityResult
{
    public string MotivationType { get; set; } = "";
    public string MotivationDescription { get; set; } = "";
    public string MotivationIcon { get; set; } = "";
    public int Openness { get; set; }
    public int Conscientiousness { get; set; }
    public int Extraversion { get; set; }
    public int Agreeableness { get; set; }
    public int EmotionalStability { get; set; }
}
