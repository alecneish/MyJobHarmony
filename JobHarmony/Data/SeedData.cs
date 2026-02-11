using JobHarmony.Models;

namespace JobHarmony.Data;

public static class SeedData
{
    public static List<QuizQuestion> GetQuizQuestions() => new()
    {
        new QuizQuestion
        {
            Id = 1,
            QuestionText = "When starting a new project, what excites you most?",
            Options = new List<QuizOption>
            {
                new() { Label = "Exploring creative possibilities and brainstorming ideas", Trait = "openness", Weight = 3 },
                new() { Label = "Creating a detailed plan and timeline", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Collaborating with the team and assigning roles", Trait = "extraversion", Weight = 3 },
                new() { Label = "Understanding how it will help others", Trait = "agreeableness", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 2,
            QuestionText = "How do you handle a stressful deadline?",
            Options = new List<QuizOption>
            {
                new() { Label = "Stay calm and adapt as needed", Trait = "emotionalStability", Weight = 3 },
                new() { Label = "Break it down into manageable chunks", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Rally the team for a group push", Trait = "extraversion", Weight = 3 },
                new() { Label = "Find an innovative shortcut", Trait = "openness", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 3,
            QuestionText = "What kind of work environment do you prefer?",
            Options = new List<QuizOption>
            {
                new() { Label = "Open office with lots of interaction", Trait = "extraversion", Weight = 3 },
                new() { Label = "Quiet space for deep focused work", Trait = "conscientiousness", Weight = 2 },
                new() { Label = "Flexible and ever-changing", Trait = "openness", Weight = 3 },
                new() { Label = "Supportive and team-oriented", Trait = "agreeableness", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 4,
            QuestionText = "When receiving critical feedback, you typically...",
            Options = new List<QuizOption>
            {
                new() { Label = "Take it in stride and use it to improve", Trait = "emotionalStability", Weight = 3 },
                new() { Label = "Analyze it carefully and create an action plan", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Discuss it openly with the feedback giver", Trait = "extraversion", Weight = 2 },
                new() { Label = "Consider how to use it to help the whole team", Trait = "agreeableness", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 5,
            QuestionText = "What motivates you most at work?",
            Options = new List<QuizOption>
            {
                new() { Label = "Learning new skills and technologies", Trait = "openness", Weight = 3 },
                new() { Label = "Achieving measurable goals and milestones", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Building relationships and networking", Trait = "extraversion", Weight = 3 },
                new() { Label = "Maintaining balance and inner peace", Trait = "emotionalStability", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 6,
            QuestionText = "How do you approach problem-solving?",
            Options = new List<QuizOption>
            {
                new() { Label = "Think outside the box with unconventional ideas", Trait = "openness", Weight = 3 },
                new() { Label = "Follow a systematic, step-by-step process", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Brainstorm with colleagues for diverse perspectives", Trait = "extraversion", Weight = 2 },
                new() { Label = "Focus on solutions that benefit everyone", Trait = "agreeableness", Weight = 3 }
            }
        },
        new QuizQuestion
        {
            Id = 7,
            QuestionText = "In a team conflict, you would most likely...",
            Options = new List<QuizOption>
            {
                new() { Label = "Mediate and find common ground", Trait = "agreeableness", Weight = 3 },
                new() { Label = "Stay composed and objective", Trait = "emotionalStability", Weight = 3 },
                new() { Label = "Address it head-on in a group discussion", Trait = "extraversion", Weight = 3 },
                new() { Label = "Propose a creative compromise", Trait = "openness", Weight = 2 }
            }
        },
        new QuizQuestion
        {
            Id = 8,
            QuestionText = "What best describes your ideal career path?",
            Options = new List<QuizOption>
            {
                new() { Label = "Constantly evolving with new challenges", Trait = "openness", Weight = 3 },
                new() { Label = "Steady progression with clear advancement", Trait = "conscientiousness", Weight = 3 },
                new() { Label = "Leadership roles with high visibility", Trait = "extraversion", Weight = 3 },
                new() { Label = "Making a meaningful impact on others' lives", Trait = "agreeableness", Weight = 3 }
            }
        }
    };

    public static List<Job> GetJobs() => new()
    {
        new Job
        {
            Id = 1, Title = "Senior UX Designer", Company = "DesignCraft Studio",
            LogoEmoji = "\ud83c\udfa8", Location = "San Francisco, CA", Salary = "$120k - $160k",
            Type = "Full-time", FitScore = 95, FitLevel = "Excellent",
            FitReason = "Your creative thinking and openness to new ideas align perfectly with this design-focused role.",
            Tags = new List<string> { "Design", "UX", "Creative", "Remote-friendly" }, PostedDaysAgo = 2
        },
        new Job
        {
            Id = 2, Title = "Product Manager", Company = "TechFlow Inc",
            LogoEmoji = "\ud83d\ude80", Location = "New York, NY", Salary = "$130k - $170k",
            Type = "Full-time", FitScore = 88, FitLevel = "Great",
            FitReason = "Your leadership skills and structured thinking make you a strong fit for product management.",
            Tags = new List<string> { "Product", "Leadership", "Strategy", "Agile" }, PostedDaysAgo = 3
        },
        new Job
        {
            Id = 3, Title = "Data Scientist", Company = "Analytics Pro",
            LogoEmoji = "\ud83d\udcca", Location = "Remote", Salary = "$110k - $150k",
            Type = "Full-time", FitScore = 82, FitLevel = "Great",
            FitReason = "Your analytical mindset and conscientiousness are ideal for data-driven decision making.",
            Tags = new List<string> { "Data", "Python", "Machine Learning", "Analytics" }, PostedDaysAgo = 1
        },
        new Job
        {
            Id = 4, Title = "Community Manager", Company = "SocialBuzz",
            LogoEmoji = "\ud83c\udf1f", Location = "Austin, TX", Salary = "$70k - $90k",
            Type = "Full-time", FitScore = 78, FitLevel = "Good",
            FitReason = "Your people skills and agreeableness make community building a natural strength.",
            Tags = new List<string> { "Community", "Social Media", "Marketing", "Events" }, PostedDaysAgo = 5
        },
        new Job
        {
            Id = 5, Title = "Frontend Developer", Company = "WebWorks Agency",
            LogoEmoji = "\ud83d\udcbb", Location = "Remote", Salary = "$100k - $140k",
            Type = "Contract", FitScore = 91, FitLevel = "Excellent",
            FitReason = "Your creativity and attention to detail are perfect for crafting beautiful user interfaces.",
            Tags = new List<string> { "React", "TypeScript", "CSS", "Frontend" }, PostedDaysAgo = 1
        },
        new Job
        {
            Id = 6, Title = "HR Business Partner", Company = "PeopleFirst Corp",
            LogoEmoji = "\ud83e\udd1d", Location = "Chicago, IL", Salary = "$90k - $120k",
            Type = "Full-time", FitScore = 74, FitLevel = "Good",
            FitReason = "Your empathy and interpersonal skills align well with human resources roles.",
            Tags = new List<string> { "HR", "People Ops", "Culture", "Talent" }, PostedDaysAgo = 7
        },
        new Job
        {
            Id = 7, Title = "Technical Writer", Company = "DocuMentor",
            LogoEmoji = "\u270d\ufe0f", Location = "Remote", Salary = "$80k - $110k",
            Type = "Part-time", FitScore = 85, FitLevel = "Great",
            FitReason = "Your conscientiousness and clarity of thought are key assets for technical documentation.",
            Tags = new List<string> { "Writing", "Documentation", "Technical", "API" }, PostedDaysAgo = 4
        },
        new Job
        {
            Id = 8, Title = "Startup Co-Founder", Company = "VentureLab",
            LogoEmoji = "\ud83d\udca1", Location = "San Francisco, CA", Salary = "Equity-based",
            Type = "Full-time", FitScore = 69, FitLevel = "Moderate",
            FitReason = "Your openness to new experiences could thrive in a startup environment, though it requires high risk tolerance.",
            Tags = new List<string> { "Startup", "Entrepreneurship", "Leadership", "Innovation" }, PostedDaysAgo = 10
        }
    };

    public static List<Applicant> GetApplicants() => new()
    {
        new Applicant
        {
            Id = 1, Name = "Sarah Chen", Initials = "SC", AvatarColor = "#E67E22",
            ResumeFitPercent = 94, PersonalityFitPercent = 91,
            Skills = new List<string> { "UX Design", "Figma", "User Research", "Prototyping" },
            IsRecommended = true, Title = "Senior UX Designer"
        },
        new Applicant
        {
            Id = 2, Name = "Marcus Johnson", Initials = "MJ", AvatarColor = "#3498DB",
            ResumeFitPercent = 89, PersonalityFitPercent = 87,
            Skills = new List<string> { "Product Strategy", "Agile", "Data Analysis", "Leadership" },
            IsRecommended = true, Title = "Product Manager"
        },
        new Applicant
        {
            Id = 3, Name = "Emily Rodriguez", Initials = "ER", AvatarColor = "#2ECC71",
            ResumeFitPercent = 92, PersonalityFitPercent = 85,
            Skills = new List<string> { "Python", "TensorFlow", "SQL", "Statistics" },
            IsRecommended = true, Title = "Data Scientist"
        },
        new Applicant
        {
            Id = 4, Name = "David Kim", Initials = "DK", AvatarColor = "#9B59B6",
            ResumeFitPercent = 88, PersonalityFitPercent = 90,
            Skills = new List<string> { "React", "TypeScript", "Node.js", "GraphQL" },
            IsRecommended = true, Title = "Full Stack Developer"
        },
        new Applicant
        {
            Id = 5, Name = "Aisha Patel", Initials = "AP", AvatarColor = "#E74C3C",
            ResumeFitPercent = 91, PersonalityFitPercent = 88,
            Skills = new List<string> { "Content Strategy", "Social Media", "Community Building", "Events" },
            IsRecommended = true, Title = "Community Manager"
        },
        new Applicant
        {
            Id = 6, Name = "James Wilson", Initials = "JW", AvatarColor = "#1ABC9C",
            ResumeFitPercent = 76, PersonalityFitPercent = 72,
            Skills = new List<string> { "Java", "Spring Boot", "Microservices", "AWS" },
            IsRecommended = false, Title = "Backend Developer"
        },
        new Applicant
        {
            Id = 7, Name = "Lisa Zhang", Initials = "LZ", AvatarColor = "#F39C12",
            ResumeFitPercent = 81, PersonalityFitPercent = 78,
            Skills = new List<string> { "Marketing", "SEO", "Google Ads", "Analytics" },
            IsRecommended = false, Title = "Digital Marketing Specialist"
        },
        new Applicant
        {
            Id = 8, Name = "Robert Taylor", Initials = "RT", AvatarColor = "#34495E",
            ResumeFitPercent = 73, PersonalityFitPercent = 69,
            Skills = new List<string> { "Project Management", "Scrum", "Jira", "Risk Assessment" },
            IsRecommended = false, Title = "Project Manager"
        },
        new Applicant
        {
            Id = 9, Name = "Nina Kowalski", Initials = "NK", AvatarColor = "#E91E63",
            ResumeFitPercent = 79, PersonalityFitPercent = 82,
            Skills = new List<string> { "Technical Writing", "API Docs", "Markdown", "Git" },
            IsRecommended = false, Title = "Technical Writer"
        },
        new Applicant
        {
            Id = 10, Name = "Carlos Mendez", Initials = "CM", AvatarColor = "#FF5722",
            ResumeFitPercent = 70, PersonalityFitPercent = 75,
            Skills = new List<string> { "Sales", "CRM", "Negotiation", "Client Relations" },
            IsRecommended = false, Title = "Business Development Rep"
        },
        new Applicant
        {
            Id = 11, Name = "Priya Sharma", Initials = "PS", AvatarColor = "#8BC34A",
            ResumeFitPercent = 84, PersonalityFitPercent = 80,
            Skills = new List<string> { "UI Design", "Illustration", "Branding", "Adobe Suite" },
            IsRecommended = false, Title = "Visual Designer"
        }
    };

    public static PersonalityResult GetDefaultResult() => new()
    {
        MotivationType = "The Innovator",
        MotivationDescription = "You thrive on creativity and new ideas. You're driven by curiosity and love exploring uncharted territory.",
        MotivationIcon = "\ud83d\udca1",
        Openness = 75,
        Conscientiousness = 65,
        Extraversion = 60,
        Agreeableness = 70,
        EmotionalStability = 68
    };
}
