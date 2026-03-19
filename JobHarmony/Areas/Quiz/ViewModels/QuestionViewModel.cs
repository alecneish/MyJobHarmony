namespace JobHarmony.Areas.Quiz.ViewModels;

public class QuestionViewModel
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string QuestionFormat { get; set; } = "Likert";
    public int? CurrentAnswer { get; set; }
}

public class QuizSectionViewModel
{
    public string SectionName { get; set; } = string.Empty;
    public string SectionDescription { get; set; } = string.Empty;
    public List<QuestionViewModel> Questions { get; set; } = new();
}

public class QuizPageViewModel
{
    public Guid SessionId { get; set; }
    public string Tier { get; set; } = "Free";
    public List<QuizSectionViewModel> Sections { get; set; } = new();
    public int TotalQuestions { get; set; }
    public int AnsweredQuestions { get; set; }

    public static readonly Dictionary<string, string> SectionDescriptions = new()
    {
        ["Your Personality"] = "Rate how well each statement describes you. There are no right or wrong answers — just be honest.",
        ["Your Interests"] = "How much would you enjoy each of these activities? Imagine salary and prestige are equal for all options.",
        ["What Drives You"] = "What matters most to you in a career? Rate how strongly you agree with each statement.",
        ["Your Ideal Workplace"] = "What kind of work environment brings out your best?",
        ["Under Pressure"] = "How do you tend to react when things get stressful at work?",
        ["Your Needs"] = "What psychological needs must your career satisfy for you to feel fulfilled?",
        ["Your Career Journey"] = "Where are you right now in your career path?"
    };
}
