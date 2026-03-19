namespace JobHarmony.Areas.Quiz.Models;

public class CareerProfile
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Big Five (OCEAN) - 0 to 100
    public double Openness { get; set; }
    public double Conscientiousness { get; set; }
    public double Extraversion { get; set; }
    public double Agreeableness { get; set; }
    public double EmotionalStability { get; set; }

    // Holland Codes (RIASEC) - 0 to 100
    public double Realistic { get; set; }
    public double Investigative { get; set; }
    public double Artistic { get; set; }
    public double Social { get; set; }
    public double Enterprising { get; set; }
    public double Conventional { get; set; }

    // Work Values - 0 to 100
    public double ValAutonomy { get; set; }
    public double ValSecurity { get; set; }
    public double ValChallenge { get; set; }
    public double ValService { get; set; }
    public double ValWorkLifeBalance { get; set; }

    // Work Environment - 0 to 100
    public double EnvPace { get; set; }
    public double EnvCollaboration { get; set; }
    public double EnvStructure { get; set; }

    public ICollection<CareerMatch> Matches { get; set; } = new List<CareerMatch>();
}
