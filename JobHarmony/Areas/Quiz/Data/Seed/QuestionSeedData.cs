using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Data.Seed;

public static class QuestionSeedData
{
    public static List<Question> GetAllQuestions()
    {
        var questions = new List<Question>();
        int id = 1;

        // =====================================================================
        // SECTION 1: YOUR PERSONALITY (Big Five / OCEAN)
        // Free Tier: 10 questions (2 per trait)
        // Premium adds: 10 more (4 per trait total)
        // =====================================================================

        // --- Openness to Experience ---
        questions.Add(new Question { Id = id++, Text = "I enjoy exploring new ideas, even if they seem impractical at first.", Dimension = "Openness", Subdimension = "OpennessToIdeas", Section = "Your Personality", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I prefer sticking with what I know rather than trying unfamiliar approaches.", Dimension = "Openness", Subdimension = "OpennessToIdeas", Section = "Your Personality", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I am drawn to art, music, or creative expression.", Dimension = "Openness", Subdimension = "Aesthetics", Section = "Your Personality", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I enjoy imagining how things could be different from how they are now.", Dimension = "Openness", Subdimension = "Imagination", Section = "Your Personality", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Conscientiousness ---
        questions.Add(new Question { Id = id++, Text = "I set high standards for myself and work hard to meet them.", Dimension = "Conscientiousness", Subdimension = "AchievementStriving", Section = "Your Personality", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I tend to leave tasks unfinished when something more interesting comes along.", Dimension = "Conscientiousness", Subdimension = "SelfDiscipline", Section = "Your Personality", SectionOrder = 6, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I like to plan things out in advance rather than being spontaneous.", Dimension = "Conscientiousness", Subdimension = "Orderliness", Section = "Your Personality", SectionOrder = 7, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "When I commit to something, I follow through no matter what.", Dimension = "Conscientiousness", Subdimension = "Dutifulness", Section = "Your Personality", SectionOrder = 8, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Extraversion ---
        questions.Add(new Question { Id = id++, Text = "I feel energized when I spend time around other people.", Dimension = "Extraversion", Subdimension = "Warmth", Section = "Your Personality", SectionOrder = 9, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I am comfortable taking charge and directing a group.", Dimension = "Extraversion", Subdimension = "Assertiveness", Section = "Your Personality", SectionOrder = 10, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I prefer quiet, solitary activities over busy social settings.", Dimension = "Extraversion", Subdimension = "Gregariousness", Section = "Your Personality", SectionOrder = 11, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I seek out exciting experiences and enjoy a fast-paced life.", Dimension = "Extraversion", Subdimension = "ExcitementSeeking", Section = "Your Personality", SectionOrder = 12, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Agreeableness ---
        questions.Add(new Question { Id = id++, Text = "I generally trust other people's intentions.", Dimension = "Agreeableness", Subdimension = "Trust", Section = "Your Personality", SectionOrder = 13, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I prioritize harmony in my relationships, even if it means compromising.", Dimension = "Agreeableness", Subdimension = "Compliance", Section = "Your Personality", SectionOrder = 14, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I find it easy to see things from other people's perspectives.", Dimension = "Agreeableness", Subdimension = "Tendermindedness", Section = "Your Personality", SectionOrder = 15, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I would rather compete and win than cooperate and share credit.", Dimension = "Agreeableness", Subdimension = "Modesty", Section = "Your Personality", SectionOrder = 16, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Premium" });

        // --- Emotional Stability (reverse of Neuroticism) ---
        questions.Add(new Question { Id = id++, Text = "I stay calm and collected even when things go wrong.", Dimension = "EmotionalStability", Subdimension = "Anxiety", Section = "Your Personality", SectionOrder = 17, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I often worry about things that might go wrong in the future.", Dimension = "EmotionalStability", Subdimension = "Anxiety", Section = "Your Personality", SectionOrder = 18, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I bounce back quickly from setbacks and disappointments.", Dimension = "EmotionalStability", Subdimension = "Vulnerability", Section = "Your Personality", SectionOrder = 19, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "Small frustrations can throw off my whole day.", Dimension = "EmotionalStability", Subdimension = "AngryHostility", Section = "Your Personality", SectionOrder = 20, QuestionFormat = "Likert", IsReverseScored = true, Weight = 1.0, Tier = "Premium" });

        // =====================================================================
        // SECTION 2: YOUR INTERESTS (Holland Codes / RIASEC)
        // Free Tier: 12 questions (2 per type)
        // Premium adds: 6 more (3 per type total)
        // =====================================================================

        // --- Realistic ---
        questions.Add(new Question { Id = id++, Text = "Building, repairing, or working with my hands on physical projects.", Dimension = "Realistic", Subdimension = "", Section = "Your Interests", SectionOrder = 1, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Operating tools, machinery, or technical equipment.", Dimension = "Realistic", Subdimension = "", Section = "Your Interests", SectionOrder = 2, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Working outdoors in nature or on physical, hands-on tasks.", Dimension = "Realistic", Subdimension = "", Section = "Your Interests", SectionOrder = 3, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Investigative ---
        questions.Add(new Question { Id = id++, Text = "Researching a complex problem to understand how something works.", Dimension = "Investigative", Subdimension = "", Section = "Your Interests", SectionOrder = 4, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Analyzing data or running experiments to test a hypothesis.", Dimension = "Investigative", Subdimension = "", Section = "Your Interests", SectionOrder = 5, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Reading academic papers or deep-dive articles to learn something new.", Dimension = "Investigative", Subdimension = "", Section = "Your Interests", SectionOrder = 6, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Artistic ---
        questions.Add(new Question { Id = id++, Text = "Designing something visually appealing — a layout, outfit, or space.", Dimension = "Artistic", Subdimension = "", Section = "Your Interests", SectionOrder = 7, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Writing, composing, or creating original content.", Dimension = "Artistic", Subdimension = "", Section = "Your Interests", SectionOrder = 8, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Performing, presenting, or expressing ideas in front of an audience.", Dimension = "Artistic", Subdimension = "", Section = "Your Interests", SectionOrder = 9, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Social ---
        questions.Add(new Question { Id = id++, Text = "Helping someone work through a personal challenge or difficult decision.", Dimension = "Social", Subdimension = "", Section = "Your Interests", SectionOrder = 10, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Teaching or mentoring someone to help them grow.", Dimension = "Social", Subdimension = "", Section = "Your Interests", SectionOrder = 11, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Volunteering for a cause that helps people in my community.", Dimension = "Social", Subdimension = "", Section = "Your Interests", SectionOrder = 12, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Enterprising ---
        questions.Add(new Question { Id = id++, Text = "Persuading or negotiating to close a deal or win someone over.", Dimension = "Enterprising", Subdimension = "", Section = "Your Interests", SectionOrder = 13, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Leading a team or project to achieve an ambitious goal.", Dimension = "Enterprising", Subdimension = "", Section = "Your Interests", SectionOrder = 14, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Starting a business or launching a new initiative from scratch.", Dimension = "Enterprising", Subdimension = "", Section = "Your Interests", SectionOrder = 15, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // --- Conventional ---
        questions.Add(new Question { Id = id++, Text = "Organizing files, data, or systems so everything runs smoothly.", Dimension = "Conventional", Subdimension = "", Section = "Your Interests", SectionOrder = 16, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Following detailed procedures to ensure accuracy and compliance.", Dimension = "Conventional", Subdimension = "", Section = "Your Interests", SectionOrder = 17, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Managing budgets, spreadsheets, or financial records.", Dimension = "Conventional", Subdimension = "", Section = "Your Interests", SectionOrder = 18, QuestionFormat = "Interest", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // =====================================================================
        // SECTION 3: WHAT DRIVES YOU (Work Values)
        // Free Tier: 5 questions
        // Premium adds: 7 more (12 total covering all 8 Schein anchors)
        // =====================================================================

        // --- Free Tier Values ---
        questions.Add(new Question { Id = id++, Text = "Having the freedom to decide how, when, and where I do my work matters more to me than a high salary.", Dimension = "Autonomy", Subdimension = "", Section = "What Drives You", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I value job stability and a predictable career path over risky but exciting opportunities.", Dimension = "Security", Subdimension = "", Section = "What Drives You", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I am at my best when I am tackling difficult problems that push my abilities.", Dimension = "Challenge", Subdimension = "", Section = "What Drives You", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Making a positive difference in other people's lives is a central goal of my career.", Dimension = "Service", Subdimension = "", Section = "What Drives You", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "Maintaining a healthy balance between my work and personal life is non-negotiable for me.", Dimension = "WorkLifeBalance", Subdimension = "", Section = "What Drives You", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });

        // --- Premium Values (extended Schein anchors) ---
        questions.Add(new Question { Id = id++, Text = "I want to become a deep expert in my specific field or craft.", Dimension = "Challenge", Subdimension = "TechnicalCompetence", Section = "What Drives You", SectionOrder = 6, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I aspire to manage people and be responsible for an organization's results.", Dimension = "Enterprising", Subdimension = "Management", Section = "What Drives You", SectionOrder = 7, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I dream of building something of my own — a company, product, or brand.", Dimension = "Autonomy", Subdimension = "Entrepreneurship", Section = "What Drives You", SectionOrder = 8, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I would sacrifice pay or prestige if it meant my work truly helped others.", Dimension = "Service", Subdimension = "Dedication", Section = "What Drives You", SectionOrder = 9, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I feel restless if my job does not constantly challenge me with new problems.", Dimension = "Challenge", Subdimension = "PureChallenge", Section = "What Drives You", SectionOrder = 10, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I need to know my job is secure before I can focus on doing my best work.", Dimension = "Security", Subdimension = "Stability", Section = "What Drives You", SectionOrder = 11, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I would rather work independently, even if it means less support or resources.", Dimension = "Autonomy", Subdimension = "Independence", Section = "What Drives You", SectionOrder = 12, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // =====================================================================
        // SECTION 4: YOUR IDEAL WORKPLACE (Work Environment)
        // Free Tier: 3 questions
        // Premium adds: 5 more
        // =====================================================================

        // --- Free Tier Environment ---
        questions.Add(new Question { Id = id++, Text = "I thrive in fast-paced environments where things change quickly.", Dimension = "Pace", Subdimension = "", Section = "Your Ideal Workplace", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I do my best work as part of a close-knit team rather than on my own.", Dimension = "Collaboration", Subdimension = "", Section = "Your Ideal Workplace", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });
        questions.Add(new Question { Id = id++, Text = "I prefer clear guidelines and structured processes over open-ended ambiguity.", Dimension = "Structure", Subdimension = "", Section = "Your Ideal Workplace", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Free" });

        // --- Premium Environment ---
        questions.Add(new Question { Id = id++, Text = "I strongly prefer working remotely or from home over being in an office.", Dimension = "Collaboration", Subdimension = "Remote", Section = "Your Ideal Workplace", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.8, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I am happiest working in a small team (under 10 people) rather than a large organization.", Dimension = "Collaboration", Subdimension = "TeamSize", Section = "Your Ideal Workplace", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.8, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I want frequent feedback on my performance rather than annual reviews.", Dimension = "Structure", Subdimension = "Feedback", Section = "Your Ideal Workplace", SectionOrder = 6, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.8, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I prefer a workplace focused on rapid growth over one that is stable and predictable.", Dimension = "Pace", Subdimension = "Growth", Section = "Your Ideal Workplace", SectionOrder = 7, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.8, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "A casual, informal workplace culture is far more appealing to me than a formal one.", Dimension = "Structure", Subdimension = "Culture", Section = "Your Ideal Workplace", SectionOrder = 8, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.8, Tier = "Premium" });

        // =====================================================================
        // SECTION 5: UNDER PRESSURE (Stress Behaviors / Derailers) — Premium Only
        // 6 questions
        // =====================================================================

        questions.Add(new Question { Id = id++, Text = "When I am under stress, I tend to withdraw and avoid people.", Dimension = "EmotionalStability", Subdimension = "StressWithdrawal", Section = "Under Pressure", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = true, Weight = 0.9, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "Under pressure, I become overly cautious and have trouble making decisions.", Dimension = "EmotionalStability", Subdimension = "StressCaution", Section = "Under Pressure", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = true, Weight = 0.9, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I tend to become more controlling and demanding when deadlines loom.", Dimension = "Agreeableness", Subdimension = "StressControl", Section = "Under Pressure", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = true, Weight = 0.9, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "When stressed, I become a perfectionist and struggle to let anything go.", Dimension = "Conscientiousness", Subdimension = "StressPerfectionism", Section = "Under Pressure", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.9, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I can stay focused and productive even during chaotic or high-pressure periods.", Dimension = "EmotionalStability", Subdimension = "StressResilience", Section = "Under Pressure", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.9, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "When things go wrong at work, my first instinct is to blame others.", Dimension = "Agreeableness", Subdimension = "StressBlame", Section = "Under Pressure", SectionOrder = 6, QuestionFormat = "Likert", IsReverseScored = true, Weight = 0.9, Tier = "Premium" });

        // =====================================================================
        // SECTION 6: YOUR NEEDS (SDT: Autonomy, Competence, Relatedness) — Premium Only
        // 6 questions (2 per need)
        // =====================================================================

        questions.Add(new Question { Id = id++, Text = "I feel most motivated when I have significant control over my own tasks and schedule.", Dimension = "Autonomy", Subdimension = "SDTAutonomy", Section = "Your Needs", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I feel stifled when someone micromanages my work.", Dimension = "Autonomy", Subdimension = "SDTAutonomy", Section = "Your Needs", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I need to feel like I am genuinely good at what I do to stay engaged.", Dimension = "Challenge", Subdimension = "SDTCompetence", Section = "Your Needs", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "Learning new skills and mastering new challenges is deeply satisfying to me.", Dimension = "Challenge", Subdimension = "SDTCompetence", Section = "Your Needs", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "Feeling connected to my coworkers is just as important as the work itself.", Dimension = "Collaboration", Subdimension = "SDTRelatedness", Section = "Your Needs", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I feel unfulfilled if I do not have meaningful relationships at work.", Dimension = "Collaboration", Subdimension = "SDTRelatedness", Section = "Your Needs", SectionOrder = 6, QuestionFormat = "Likert", IsReverseScored = false, Weight = 1.0, Tier = "Premium" });

        // =====================================================================
        // SECTION 7: YOUR CAREER JOURNEY (Career Stage & Grit) — Premium Only
        // 5 questions
        // =====================================================================

        questions.Add(new Question { Id = id++, Text = "I am satisfied with my current career direction.", Dimension = "EmotionalStability", Subdimension = "CareerSatisfaction", Section = "Your Career Journey", SectionOrder = 1, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.7, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I feel ready to make a clear decision about my next career move.", Dimension = "Conscientiousness", Subdimension = "DecisionReadiness", Section = "Your Career Journey", SectionOrder = 2, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.7, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I have maintained a consistent focus on the same long-term career goals for years.", Dimension = "Conscientiousness", Subdimension = "PassionConsistency", Section = "Your Career Journey", SectionOrder = 3, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.7, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "Setbacks do not discourage me — I keep pushing toward my goals.", Dimension = "EmotionalStability", Subdimension = "Perseverance", Section = "Your Career Journey", SectionOrder = 4, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.7, Tier = "Premium" });
        questions.Add(new Question { Id = id++, Text = "I often find myself thinking about completely changing my career path.", Dimension = "Openness", Subdimension = "CareerExploration", Section = "Your Career Journey", SectionOrder = 5, QuestionFormat = "Likert", IsReverseScored = false, Weight = 0.7, Tier = "Premium" });

        return questions;
    }
}
