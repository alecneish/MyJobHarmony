namespace JobHarmony.Areas.Quiz.ViewModels;

public class DimensionScoreViewModel
{
    public string Dimension { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public double Score { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class CareerMatchViewModel
{
    public int Rank { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double MatchScore { get; set; }
}

public class ResultsViewModel
{
    public Guid SessionId { get; set; }
    public string Tier { get; set; } = "Free";

    public List<DimensionScoreViewModel> PersonalityScores { get; set; } = new();
    public List<DimensionScoreViewModel> InterestScores { get; set; } = new();
    public List<DimensionScoreViewModel> ValueScores { get; set; } = new();
    public List<DimensionScoreViewModel> EnvironmentScores { get; set; } = new();

    public List<CareerMatchViewModel> TopCareers { get; set; } = new();

    public string HollandCode { get; set; } = string.Empty;
    public string PersonalitySummary { get; set; } = string.Empty;
    public string ValuesSummary { get; set; } = string.Empty;
    public string EnvironmentSummary { get; set; } = string.Empty;

    // Dimension label mappings
    public static readonly Dictionary<string, string> DimensionLabels = new()
    {
        ["Openness"] = "Openness to Experience",
        ["Conscientiousness"] = "Conscientiousness",
        ["Extraversion"] = "Extraversion",
        ["Agreeableness"] = "Agreeableness",
        ["EmotionalStability"] = "Emotional Stability",
        ["Realistic"] = "Realistic (Hands-on)",
        ["Investigative"] = "Investigative (Analytical)",
        ["Artistic"] = "Artistic (Creative)",
        ["Social"] = "Social (Helping)",
        ["Enterprising"] = "Enterprising (Leading)",
        ["Conventional"] = "Conventional (Organizing)",
        ["Autonomy"] = "Autonomy",
        ["Security"] = "Security",
        ["Challenge"] = "Challenge",
        ["Service"] = "Service",
        ["WorkLifeBalance"] = "Work-Life Balance",
        ["Pace"] = "Fast Pace",
        ["Collaboration"] = "Collaboration",
        ["Structure"] = "Structure"
    };

    public static readonly Dictionary<string, (string Low, string High)> DimensionDescriptions = new()
    {
        ["Openness"] = ("You prefer practical, tried-and-true approaches and value stability in your thinking.", "You are intellectually curious, imaginative, and drawn to new ideas and experiences."),
        ["Conscientiousness"] = ("You are flexible and spontaneous, preferring to adapt rather than plan.", "You are disciplined, organized, and driven to achieve your goals."),
        ["Extraversion"] = ("You recharge through solitude and prefer deeper one-on-one connections.", "You are energized by social interaction and enjoy being at the center of activity."),
        ["Agreeableness"] = ("You are direct, competitive, and comfortable challenging others.", "You are cooperative, empathetic, and value harmony in relationships."),
        ["EmotionalStability"] = ("You experience emotions intensely and may feel stress more acutely.", "You are calm under pressure, emotionally resilient, and even-keeled."),
        ["Autonomy"] = ("You are comfortable with guidance and structured work environments.", "You need independence and freedom to thrive in your career."),
        ["Security"] = ("You are willing to take risks for growth and opportunity.", "You prioritize stability, predictability, and job security."),
        ["Challenge"] = ("You prefer steady, manageable work that doesn't overwhelm.", "You crave intellectual challenge and are driven by difficult problems."),
        ["Service"] = ("Your career motivation centers on personal growth and achievement.", "You are deeply motivated by helping others and making a difference."),
        ["WorkLifeBalance"] = ("You are willing to invest heavily in work for career advancement.", "Maintaining boundaries between work and personal life is essential to you."),
        ["Pace"] = ("You prefer a steady, predictable pace and time to think.", "You thrive in fast-moving environments with constant change and urgency."),
        ["Collaboration"] = ("You do your best work independently or in small, quiet settings.", "You are energized by teamwork and close collaboration with others."),
        ["Structure"] = ("You prefer flexibility, autonomy, and figuring things out as you go.", "You work best with clear guidelines, defined processes, and predictable expectations.")
    };
}
