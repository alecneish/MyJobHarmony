using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Data.Seed;

public static class CareerProfileSeedData
{
    public static List<CareerProfile> GetAllProfiles()
    {
        int id = 1;
        return new List<CareerProfile>
        {
            // =====================================================================
            // TECHNOLOGY
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Software Developer", Category = "Technology",
                Description = "Design, build, and maintain software applications and systems.",
                Openness = 75, Conscientiousness = 80, Extraversion = 40, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 55, Investigative = 85, Artistic = 50, Social = 30, Enterprising = 35, Conventional = 45,
                ValAutonomy = 80, ValSecurity = 60, ValChallenge = 85, ValService = 40, ValWorkLifeBalance = 70,
                EnvPace = 70, EnvCollaboration = 55, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Data Scientist", Category = "Technology",
                Description = "Analyze complex data sets to find patterns, build predictive models, and drive business decisions.",
                Openness = 80, Conscientiousness = 80, Extraversion = 35, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 40, Investigative = 95, Artistic = 35, Social = 30, Enterprising = 40, Conventional = 60,
                ValAutonomy = 75, ValSecurity = 65, ValChallenge = 90, ValService = 35, ValWorkLifeBalance = 65,
                EnvPace = 60, EnvCollaboration = 50, EnvStructure = 50 },

            new CareerProfile { Id = id++, Title = "UX Designer", Category = "Technology",
                Description = "Research user needs and design intuitive, delightful digital experiences.",
                Openness = 90, Conscientiousness = 65, Extraversion = 55, Agreeableness = 70, EmotionalStability = 65,
                Realistic = 35, Investigative = 65, Artistic = 90, Social = 70, Enterprising = 40, Conventional = 30,
                ValAutonomy = 75, ValSecurity = 50, ValChallenge = 70, ValService = 65, ValWorkLifeBalance = 70,
                EnvPace = 60, EnvCollaboration = 75, EnvStructure = 40 },

            new CareerProfile { Id = id++, Title = "Cybersecurity Analyst", Category = "Technology",
                Description = "Protect organizations from digital threats by monitoring, detecting, and responding to security incidents.",
                Openness = 65, Conscientiousness = 90, Extraversion = 30, Agreeableness = 45, EmotionalStability = 80,
                Realistic = 60, Investigative = 85, Artistic = 20, Social = 25, Enterprising = 35, Conventional = 70,
                ValAutonomy = 65, ValSecurity = 80, ValChallenge = 85, ValService = 50, ValWorkLifeBalance = 55,
                EnvPace = 75, EnvCollaboration = 45, EnvStructure = 75 },

            new CareerProfile { Id = id++, Title = "Product Manager", Category = "Technology",
                Description = "Define product vision and strategy, prioritize features, and coordinate cross-functional teams.",
                Openness = 80, Conscientiousness = 75, Extraversion = 75, Agreeableness = 65, EmotionalStability = 70,
                Realistic = 25, Investigative = 60, Artistic = 45, Social = 65, Enterprising = 85, Conventional = 45,
                ValAutonomy = 75, ValSecurity = 55, ValChallenge = 80, ValService = 55, ValWorkLifeBalance = 55,
                EnvPace = 80, EnvCollaboration = 85, EnvStructure = 45 },

            new CareerProfile { Id = id++, Title = "DevOps Engineer", Category = "Technology",
                Description = "Build and maintain the infrastructure, CI/CD pipelines, and systems that keep software running reliably.",
                Openness = 65, Conscientiousness = 85, Extraversion = 35, Agreeableness = 55, EmotionalStability = 75,
                Realistic = 75, Investigative = 80, Artistic = 20, Social = 25, Enterprising = 35, Conventional = 65,
                ValAutonomy = 80, ValSecurity = 65, ValChallenge = 80, ValService = 30, ValWorkLifeBalance = 60,
                EnvPace = 75, EnvCollaboration = 50, EnvStructure = 60 },

            new CareerProfile { Id = id++, Title = "IT Project Manager", Category = "Technology",
                Description = "Plan, execute, and deliver technology projects on time and within budget.",
                Openness = 55, Conscientiousness = 85, Extraversion = 65, Agreeableness = 65, EmotionalStability = 75,
                Realistic = 30, Investigative = 45, Artistic = 20, Social = 60, Enterprising = 75, Conventional = 70,
                ValAutonomy = 60, ValSecurity = 70, ValChallenge = 65, ValService = 45, ValWorkLifeBalance = 55,
                EnvPace = 75, EnvCollaboration = 80, EnvStructure = 80 },

            // =====================================================================
            // HEALTHCARE
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Registered Nurse", Category = "Healthcare",
                Description = "Provide direct patient care, administer treatments, and coordinate with healthcare teams.",
                Openness = 55, Conscientiousness = 80, Extraversion = 65, Agreeableness = 85, EmotionalStability = 70,
                Realistic = 60, Investigative = 55, Artistic = 20, Social = 90, Enterprising = 30, Conventional = 50,
                ValAutonomy = 45, ValSecurity = 80, ValChallenge = 60, ValService = 95, ValWorkLifeBalance = 50,
                EnvPace = 80, EnvCollaboration = 80, EnvStructure = 75 },

            new CareerProfile { Id = id++, Title = "Physician", Category = "Healthcare",
                Description = "Diagnose illnesses, prescribe treatments, and guide patients through complex health decisions.",
                Openness = 70, Conscientiousness = 90, Extraversion = 55, Agreeableness = 70, EmotionalStability = 80,
                Realistic = 50, Investigative = 90, Artistic = 20, Social = 80, Enterprising = 55, Conventional = 45,
                ValAutonomy = 70, ValSecurity = 75, ValChallenge = 90, ValService = 90, ValWorkLifeBalance = 35,
                EnvPace = 85, EnvCollaboration = 65, EnvStructure = 60 },

            new CareerProfile { Id = id++, Title = "Physical Therapist", Category = "Healthcare",
                Description = "Help patients recover movement and manage pain through targeted exercise and rehabilitation programs.",
                Openness = 60, Conscientiousness = 75, Extraversion = 65, Agreeableness = 80, EmotionalStability = 75,
                Realistic = 70, Investigative = 65, Artistic = 25, Social = 85, Enterprising = 35, Conventional = 40,
                ValAutonomy = 65, ValSecurity = 70, ValChallenge = 65, ValService = 90, ValWorkLifeBalance = 65,
                EnvPace = 55, EnvCollaboration = 65, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Mental Health Counselor", Category = "Healthcare",
                Description = "Support individuals through emotional, behavioral, and psychological challenges using therapeutic techniques.",
                Openness = 80, Conscientiousness = 70, Extraversion = 55, Agreeableness = 85, EmotionalStability = 80,
                Realistic = 15, Investigative = 65, Artistic = 45, Social = 95, Enterprising = 30, Conventional = 25,
                ValAutonomy = 75, ValSecurity = 55, ValChallenge = 65, ValService = 95, ValWorkLifeBalance = 65,
                EnvPace = 35, EnvCollaboration = 45, EnvStructure = 45 },

            new CareerProfile { Id = id++, Title = "Healthcare Administrator", Category = "Healthcare",
                Description = "Manage the operations of hospitals, clinics, or healthcare systems to ensure quality patient care.",
                Openness = 50, Conscientiousness = 85, Extraversion = 65, Agreeableness = 60, EmotionalStability = 75,
                Realistic = 20, Investigative = 45, Artistic = 15, Social = 55, Enterprising = 80, Conventional = 75,
                ValAutonomy = 55, ValSecurity = 75, ValChallenge = 65, ValService = 70, ValWorkLifeBalance = 50,
                EnvPace = 70, EnvCollaboration = 75, EnvStructure = 80 },

            new CareerProfile { Id = id++, Title = "Pharmacist", Category = "Healthcare",
                Description = "Dispense medications, counsel patients on drug interactions, and ensure safe pharmaceutical care.",
                Openness = 45, Conscientiousness = 90, Extraversion = 45, Agreeableness = 70, EmotionalStability = 75,
                Realistic = 40, Investigative = 75, Artistic = 10, Social = 65, Enterprising = 35, Conventional = 80,
                ValAutonomy = 55, ValSecurity = 85, ValChallenge = 55, ValService = 80, ValWorkLifeBalance = 65,
                EnvPace = 60, EnvCollaboration = 50, EnvStructure = 85 },

            // =====================================================================
            // BUSINESS & FINANCE
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Financial Analyst", Category = "Business & Finance",
                Description = "Evaluate investment opportunities, analyze financial data, and advise organizations on fiscal strategy.",
                Openness = 50, Conscientiousness = 85, Extraversion = 45, Agreeableness = 50, EmotionalStability = 75,
                Realistic = 20, Investigative = 80, Artistic = 15, Social = 30, Enterprising = 65, Conventional = 85,
                ValAutonomy = 55, ValSecurity = 75, ValChallenge = 75, ValService = 25, ValWorkLifeBalance = 45,
                EnvPace = 75, EnvCollaboration = 50, EnvStructure = 80 },

            new CareerProfile { Id = id++, Title = "Marketing Manager", Category = "Business & Finance",
                Description = "Develop and execute marketing strategies to grow brand awareness and drive revenue.",
                Openness = 80, Conscientiousness = 70, Extraversion = 80, Agreeableness = 60, EmotionalStability = 65,
                Realistic = 15, Investigative = 50, Artistic = 70, Social = 65, Enterprising = 85, Conventional = 40,
                ValAutonomy = 70, ValSecurity = 50, ValChallenge = 75, ValService = 40, ValWorkLifeBalance = 50,
                EnvPace = 80, EnvCollaboration = 75, EnvStructure = 40 },

            new CareerProfile { Id = id++, Title = "Management Consultant", Category = "Business & Finance",
                Description = "Advise organizations on strategy, operations, and transformation to solve complex business problems.",
                Openness = 75, Conscientiousness = 85, Extraversion = 70, Agreeableness = 55, EmotionalStability = 75,
                Realistic = 15, Investigative = 75, Artistic = 25, Social = 55, Enterprising = 90, Conventional = 50,
                ValAutonomy = 65, ValSecurity = 55, ValChallenge = 90, ValService = 40, ValWorkLifeBalance = 30,
                EnvPace = 90, EnvCollaboration = 70, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Accountant", Category = "Business & Finance",
                Description = "Prepare financial records, ensure tax compliance, and provide fiscal accountability for organizations.",
                Openness = 30, Conscientiousness = 90, Extraversion = 35, Agreeableness = 60, EmotionalStability = 75,
                Realistic = 25, Investigative = 55, Artistic = 10, Social = 25, Enterprising = 40, Conventional = 95,
                ValAutonomy = 50, ValSecurity = 90, ValChallenge = 40, ValService = 30, ValWorkLifeBalance = 70,
                EnvPace = 45, EnvCollaboration = 40, EnvStructure = 95 },

            new CareerProfile { Id = id++, Title = "Human Resources Manager", Category = "Business & Finance",
                Description = "Oversee recruiting, employee relations, training, and organizational culture initiatives.",
                Openness = 60, Conscientiousness = 75, Extraversion = 70, Agreeableness = 80, EmotionalStability = 70,
                Realistic = 10, Investigative = 40, Artistic = 20, Social = 85, Enterprising = 65, Conventional = 60,
                ValAutonomy = 55, ValSecurity = 70, ValChallenge = 55, ValService = 75, ValWorkLifeBalance = 65,
                EnvPace = 55, EnvCollaboration = 85, EnvStructure = 65 },

            new CareerProfile { Id = id++, Title = "Entrepreneur", Category = "Business & Finance",
                Description = "Build and grow a business from the ground up, taking on risk and wearing many hats.",
                Openness = 85, Conscientiousness = 75, Extraversion = 75, Agreeableness = 45, EmotionalStability = 70,
                Realistic = 35, Investigative = 55, Artistic = 50, Social = 50, Enterprising = 95, Conventional = 30,
                ValAutonomy = 95, ValSecurity = 20, ValChallenge = 90, ValService = 50, ValWorkLifeBalance = 30,
                EnvPace = 90, EnvCollaboration = 55, EnvStructure = 20 },

            new CareerProfile { Id = id++, Title = "Real Estate Agent", Category = "Business & Finance",
                Description = "Help clients buy, sell, and rent properties by providing market expertise and negotiation skills.",
                Openness = 55, Conscientiousness = 65, Extraversion = 85, Agreeableness = 65, EmotionalStability = 65,
                Realistic = 30, Investigative = 30, Artistic = 30, Social = 75, Enterprising = 90, Conventional = 45,
                ValAutonomy = 85, ValSecurity = 35, ValChallenge = 60, ValService = 55, ValWorkLifeBalance = 45,
                EnvPace = 70, EnvCollaboration = 40, EnvStructure = 25 },

            // =====================================================================
            // CREATIVE
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Graphic Designer", Category = "Creative",
                Description = "Create visual concepts using software or by hand to communicate ideas that inspire and inform.",
                Openness = 90, Conscientiousness = 60, Extraversion = 40, Agreeableness = 60, EmotionalStability = 60,
                Realistic = 40, Investigative = 35, Artistic = 95, Social = 35, Enterprising = 30, Conventional = 30,
                ValAutonomy = 80, ValSecurity = 45, ValChallenge = 65, ValService = 35, ValWorkLifeBalance = 70,
                EnvPace = 55, EnvCollaboration = 50, EnvStructure = 35 },

            new CareerProfile { Id = id++, Title = "Content Writer / Copywriter", Category = "Creative",
                Description = "Write compelling articles, marketing copy, or content that engages audiences and drives action.",
                Openness = 85, Conscientiousness = 65, Extraversion = 40, Agreeableness = 60, EmotionalStability = 60,
                Realistic = 15, Investigative = 55, Artistic = 90, Social = 45, Enterprising = 45, Conventional = 35,
                ValAutonomy = 85, ValSecurity = 40, ValChallenge = 60, ValService = 45, ValWorkLifeBalance = 75,
                EnvPace = 50, EnvCollaboration = 35, EnvStructure = 30 },

            new CareerProfile { Id = id++, Title = "Video Producer / Filmmaker", Category = "Creative",
                Description = "Plan, shoot, and edit video content for entertainment, marketing, or educational purposes.",
                Openness = 90, Conscientiousness = 65, Extraversion = 60, Agreeableness = 55, EmotionalStability = 60,
                Realistic = 55, Investigative = 35, Artistic = 95, Social = 50, Enterprising = 55, Conventional = 25,
                ValAutonomy = 80, ValSecurity = 30, ValChallenge = 75, ValService = 40, ValWorkLifeBalance = 45,
                EnvPace = 70, EnvCollaboration = 65, EnvStructure = 25 },

            new CareerProfile { Id = id++, Title = "Architect", Category = "Creative",
                Description = "Design buildings and structures that are functional, safe, and aesthetically compelling.",
                Openness = 85, Conscientiousness = 80, Extraversion = 45, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 65, Investigative = 70, Artistic = 90, Social = 40, Enterprising = 50, Conventional = 50,
                ValAutonomy = 70, ValSecurity = 60, ValChallenge = 80, ValService = 50, ValWorkLifeBalance = 50,
                EnvPace = 50, EnvCollaboration = 60, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Interior Designer", Category = "Creative",
                Description = "Transform indoor spaces to be beautiful, functional, and reflective of clients' needs.",
                Openness = 85, Conscientiousness = 65, Extraversion = 60, Agreeableness = 70, EmotionalStability = 65,
                Realistic = 50, Investigative = 35, Artistic = 90, Social = 65, Enterprising = 55, Conventional = 35,
                ValAutonomy = 75, ValSecurity = 45, ValChallenge = 60, ValService = 60, ValWorkLifeBalance = 65,
                EnvPace = 50, EnvCollaboration = 55, EnvStructure = 35 },

            new CareerProfile { Id = id++, Title = "Musician / Composer", Category = "Creative",
                Description = "Create, perform, or produce music for entertainment, media, or personal expression.",
                Openness = 95, Conscientiousness = 55, Extraversion = 55, Agreeableness = 55, EmotionalStability = 50,
                Realistic = 40, Investigative = 30, Artistic = 95, Social = 45, Enterprising = 40, Conventional = 15,
                ValAutonomy = 90, ValSecurity = 20, ValChallenge = 70, ValService = 40, ValWorkLifeBalance = 50,
                EnvPace = 45, EnvCollaboration = 40, EnvStructure = 15 },

            // =====================================================================
            // EDUCATION
            // =====================================================================
            new CareerProfile { Id = id++, Title = "K-12 Teacher", Category = "Education",
                Description = "Educate students, develop curriculum, and foster a positive learning environment.",
                Openness = 70, Conscientiousness = 75, Extraversion = 70, Agreeableness = 80, EmotionalStability = 65,
                Realistic = 25, Investigative = 45, Artistic = 50, Social = 90, Enterprising = 35, Conventional = 50,
                ValAutonomy = 50, ValSecurity = 75, ValChallenge = 55, ValService = 90, ValWorkLifeBalance = 70,
                EnvPace = 60, EnvCollaboration = 65, EnvStructure = 65 },

            new CareerProfile { Id = id++, Title = "College Professor", Category = "Education",
                Description = "Conduct research, teach university courses, and mentor graduate students in your field of expertise.",
                Openness = 90, Conscientiousness = 75, Extraversion = 50, Agreeableness = 60, EmotionalStability = 70,
                Realistic = 20, Investigative = 90, Artistic = 45, Social = 65, Enterprising = 40, Conventional = 35,
                ValAutonomy = 90, ValSecurity = 65, ValChallenge = 85, ValService = 70, ValWorkLifeBalance = 60,
                EnvPace = 40, EnvCollaboration = 45, EnvStructure = 35 },

            new CareerProfile { Id = id++, Title = "School Counselor", Category = "Education",
                Description = "Guide students through academic planning, social challenges, and career exploration.",
                Openness = 70, Conscientiousness = 70, Extraversion = 65, Agreeableness = 85, EmotionalStability = 75,
                Realistic = 10, Investigative = 50, Artistic = 30, Social = 95, Enterprising = 35, Conventional = 40,
                ValAutonomy = 50, ValSecurity = 70, ValChallenge = 50, ValService = 95, ValWorkLifeBalance = 70,
                EnvPace = 45, EnvCollaboration = 65, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Corporate Trainer", Category = "Education",
                Description = "Design and deliver training programs that develop employees' skills and improve organizational performance.",
                Openness = 70, Conscientiousness = 70, Extraversion = 80, Agreeableness = 70, EmotionalStability = 70,
                Realistic = 15, Investigative = 45, Artistic = 45, Social = 80, Enterprising = 65, Conventional = 45,
                ValAutonomy = 60, ValSecurity = 60, ValChallenge = 60, ValService = 75, ValWorkLifeBalance = 65,
                EnvPace = 55, EnvCollaboration = 80, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Instructional Designer", Category = "Education",
                Description = "Create effective learning experiences and educational materials using research-based design principles.",
                Openness = 75, Conscientiousness = 75, Extraversion = 45, Agreeableness = 65, EmotionalStability = 70,
                Realistic = 25, Investigative = 65, Artistic = 65, Social = 60, Enterprising = 35, Conventional = 50,
                ValAutonomy = 70, ValSecurity = 65, ValChallenge = 65, ValService = 70, ValWorkLifeBalance = 70,
                EnvPace = 45, EnvCollaboration = 55, EnvStructure = 55 },

            // =====================================================================
            // TRADES & HANDS-ON
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Electrician", Category = "Trades & Hands-On",
                Description = "Install, maintain, and repair electrical systems in buildings, factories, and infrastructure.",
                Openness = 40, Conscientiousness = 80, Extraversion = 45, Agreeableness = 55, EmotionalStability = 75,
                Realistic = 95, Investigative = 50, Artistic = 15, Social = 30, Enterprising = 35, Conventional = 60,
                ValAutonomy = 70, ValSecurity = 80, ValChallenge = 55, ValService = 40, ValWorkLifeBalance = 65,
                EnvPace = 55, EnvCollaboration = 40, EnvStructure = 70 },

            new CareerProfile { Id = id++, Title = "Civil Engineer", Category = "Trades & Hands-On",
                Description = "Design and oversee construction of infrastructure like roads, bridges, and water systems.",
                Openness = 60, Conscientiousness = 85, Extraversion = 45, Agreeableness = 55, EmotionalStability = 75,
                Realistic = 80, Investigative = 80, Artistic = 30, Social = 35, Enterprising = 50, Conventional = 65,
                ValAutonomy = 55, ValSecurity = 75, ValChallenge = 75, ValService = 55, ValWorkLifeBalance = 60,
                EnvPace = 50, EnvCollaboration = 60, EnvStructure = 75 },

            new CareerProfile { Id = id++, Title = "Environmental Scientist", Category = "Trades & Hands-On",
                Description = "Study the environment and develop solutions to environmental problems like pollution and climate change.",
                Openness = 80, Conscientiousness = 75, Extraversion = 40, Agreeableness = 65, EmotionalStability = 70,
                Realistic = 65, Investigative = 90, Artistic = 25, Social = 50, Enterprising = 30, Conventional = 45,
                ValAutonomy = 65, ValSecurity = 60, ValChallenge = 75, ValService = 80, ValWorkLifeBalance = 65,
                EnvPace = 40, EnvCollaboration = 50, EnvStructure = 50 },

            new CareerProfile { Id = id++, Title = "Chef / Culinary Professional", Category = "Trades & Hands-On",
                Description = "Create dishes and menus, manage kitchen operations, and deliver exceptional dining experiences.",
                Openness = 80, Conscientiousness = 70, Extraversion = 55, Agreeableness = 50, EmotionalStability = 60,
                Realistic = 85, Investigative = 30, Artistic = 80, Social = 45, Enterprising = 55, Conventional = 35,
                ValAutonomy = 70, ValSecurity = 35, ValChallenge = 70, ValService = 55, ValWorkLifeBalance = 30,
                EnvPace = 90, EnvCollaboration = 65, EnvStructure = 50 },

            new CareerProfile { Id = id++, Title = "Landscape Architect", Category = "Trades & Hands-On",
                Description = "Design outdoor spaces including parks, campuses, and residential areas that blend aesthetics with ecology.",
                Openness = 80, Conscientiousness = 70, Extraversion = 45, Agreeableness = 60, EmotionalStability = 70,
                Realistic = 70, Investigative = 60, Artistic = 85, Social = 40, Enterprising = 40, Conventional = 40,
                ValAutonomy = 70, ValSecurity = 55, ValChallenge = 65, ValService = 55, ValWorkLifeBalance = 65,
                EnvPace = 40, EnvCollaboration = 50, EnvStructure = 45 },

            new CareerProfile { Id = id++, Title = "Automotive Technician", Category = "Trades & Hands-On",
                Description = "Diagnose, repair, and maintain vehicles using diagnostic tools and mechanical expertise.",
                Openness = 35, Conscientiousness = 75, Extraversion = 40, Agreeableness = 50, EmotionalStability = 70,
                Realistic = 95, Investigative = 55, Artistic = 10, Social = 25, Enterprising = 30, Conventional = 55,
                ValAutonomy = 65, ValSecurity = 70, ValChallenge = 55, ValService = 40, ValWorkLifeBalance = 65,
                EnvPace = 55, EnvCollaboration = 35, EnvStructure = 65 },

            // =====================================================================
            // PUBLIC SERVICE & LAW
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Social Worker", Category = "Public Service",
                Description = "Help individuals and families navigate social, emotional, and financial challenges.",
                Openness = 70, Conscientiousness = 70, Extraversion = 60, Agreeableness = 90, EmotionalStability = 70,
                Realistic = 15, Investigative = 45, Artistic = 25, Social = 95, Enterprising = 30, Conventional = 40,
                ValAutonomy = 50, ValSecurity = 55, ValChallenge = 55, ValService = 95, ValWorkLifeBalance = 55,
                EnvPace = 55, EnvCollaboration = 65, EnvStructure = 50 },

            new CareerProfile { Id = id++, Title = "Nonprofit Manager", Category = "Public Service",
                Description = "Lead a mission-driven organization, managing programs, fundraising, and community partnerships.",
                Openness = 70, Conscientiousness = 75, Extraversion = 70, Agreeableness = 75, EmotionalStability = 70,
                Realistic = 15, Investigative = 40, Artistic = 30, Social = 80, Enterprising = 75, Conventional = 45,
                ValAutonomy = 65, ValSecurity = 45, ValChallenge = 65, ValService = 90, ValWorkLifeBalance = 50,
                EnvPace = 60, EnvCollaboration = 80, EnvStructure = 45 },

            new CareerProfile { Id = id++, Title = "Urban Planner", Category = "Public Service",
                Description = "Develop plans and programs for land use, community development, and urban revitalization.",
                Openness = 75, Conscientiousness = 75, Extraversion = 50, Agreeableness = 65, EmotionalStability = 70,
                Realistic = 40, Investigative = 70, Artistic = 55, Social = 65, Enterprising = 50, Conventional = 55,
                ValAutonomy = 55, ValSecurity = 65, ValChallenge = 65, ValService = 80, ValWorkLifeBalance = 65,
                EnvPace = 40, EnvCollaboration = 65, EnvStructure = 60 },

            new CareerProfile { Id = id++, Title = "Lawyer", Category = "Public Service",
                Description = "Advise and represent clients in legal matters, from contracts and litigation to criminal defense.",
                Openness = 60, Conscientiousness = 85, Extraversion = 65, Agreeableness = 40, EmotionalStability = 75,
                Realistic = 10, Investigative = 75, Artistic = 30, Social = 55, Enterprising = 85, Conventional = 65,
                ValAutonomy = 65, ValSecurity = 65, ValChallenge = 85, ValService = 55, ValWorkLifeBalance = 30,
                EnvPace = 80, EnvCollaboration = 55, EnvStructure = 70 },

            new CareerProfile { Id = id++, Title = "Policy Analyst", Category = "Public Service",
                Description = "Research and evaluate public policies, propose solutions, and advise government leaders.",
                Openness = 75, Conscientiousness = 80, Extraversion = 45, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 10, Investigative = 85, Artistic = 25, Social = 55, Enterprising = 55, Conventional = 65,
                ValAutonomy = 60, ValSecurity = 65, ValChallenge = 75, ValService = 80, ValWorkLifeBalance = 60,
                EnvPace = 45, EnvCollaboration = 55, EnvStructure = 65 },

            new CareerProfile { Id = id++, Title = "Police Officer", Category = "Public Service",
                Description = "Protect communities by enforcing laws, responding to emergencies, and maintaining public safety.",
                Openness = 40, Conscientiousness = 80, Extraversion = 60, Agreeableness = 50, EmotionalStability = 80,
                Realistic = 70, Investigative = 50, Artistic = 10, Social = 65, Enterprising = 55, Conventional = 70,
                ValAutonomy = 40, ValSecurity = 85, ValChallenge = 65, ValService = 80, ValWorkLifeBalance = 40,
                EnvPace = 80, EnvCollaboration = 65, EnvStructure = 85 },

            new CareerProfile { Id = id++, Title = "Firefighter / EMT", Category = "Public Service",
                Description = "Respond to emergencies, fight fires, and provide medical assistance in life-threatening situations.",
                Openness = 40, Conscientiousness = 80, Extraversion = 60, Agreeableness = 65, EmotionalStability = 85,
                Realistic = 90, Investigative = 35, Artistic = 10, Social = 70, Enterprising = 40, Conventional = 55,
                ValAutonomy = 35, ValSecurity = 80, ValChallenge = 70, ValService = 90, ValWorkLifeBalance = 40,
                EnvPace = 85, EnvCollaboration = 85, EnvStructure = 80 },

            // =====================================================================
            // SCIENCE & RESEARCH
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Research Scientist", Category = "Science & Research",
                Description = "Conduct original research to advance knowledge in biology, chemistry, physics, or another scientific field.",
                Openness = 90, Conscientiousness = 80, Extraversion = 35, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 50, Investigative = 95, Artistic = 25, Social = 30, Enterprising = 25, Conventional = 45,
                ValAutonomy = 80, ValSecurity = 55, ValChallenge = 90, ValService = 55, ValWorkLifeBalance = 55,
                EnvPace = 35, EnvCollaboration = 45, EnvStructure = 40 },

            new CareerProfile { Id = id++, Title = "Lab Technician", Category = "Science & Research",
                Description = "Support scientific research by running experiments, maintaining equipment, and recording data.",
                Openness = 55, Conscientiousness = 80, Extraversion = 30, Agreeableness = 60, EmotionalStability = 70,
                Realistic = 70, Investigative = 75, Artistic = 10, Social = 25, Enterprising = 15, Conventional = 70,
                ValAutonomy = 45, ValSecurity = 75, ValChallenge = 50, ValService = 40, ValWorkLifeBalance = 70,
                EnvPace = 35, EnvCollaboration = 40, EnvStructure = 80 },

            new CareerProfile { Id = id++, Title = "Statistician", Category = "Science & Research",
                Description = "Apply mathematical and statistical methods to analyze data and solve real-world problems.",
                Openness = 65, Conscientiousness = 85, Extraversion = 30, Agreeableness = 55, EmotionalStability = 75,
                Realistic = 25, Investigative = 90, Artistic = 15, Social = 20, Enterprising = 35, Conventional = 75,
                ValAutonomy = 70, ValSecurity = 70, ValChallenge = 80, ValService = 30, ValWorkLifeBalance = 70,
                EnvPace = 40, EnvCollaboration = 40, EnvStructure = 60 },

            new CareerProfile { Id = id++, Title = "Epidemiologist", Category = "Science & Research",
                Description = "Study disease patterns in populations to prevent outbreaks and improve public health.",
                Openness = 70, Conscientiousness = 85, Extraversion = 40, Agreeableness = 65, EmotionalStability = 75,
                Realistic = 30, Investigative = 90, Artistic = 15, Social = 55, Enterprising = 35, Conventional = 65,
                ValAutonomy = 60, ValSecurity = 70, ValChallenge = 80, ValService = 85, ValWorkLifeBalance = 60,
                EnvPace = 50, EnvCollaboration = 55, EnvStructure = 65 },

            // =====================================================================
            // MEDIA & COMMUNICATIONS
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Journalist / Reporter", Category = "Media & Communications",
                Description = "Research and report on news, events, and issues to inform the public.",
                Openness = 85, Conscientiousness = 70, Extraversion = 65, Agreeableness = 50, EmotionalStability = 65,
                Realistic = 20, Investigative = 75, Artistic = 65, Social = 60, Enterprising = 55, Conventional = 30,
                ValAutonomy = 80, ValSecurity = 35, ValChallenge = 75, ValService = 70, ValWorkLifeBalance = 40,
                EnvPace = 85, EnvCollaboration = 45, EnvStructure = 25 },

            new CareerProfile { Id = id++, Title = "Public Relations Specialist", Category = "Media & Communications",
                Description = "Manage an organization's public image through media relations, communications, and crisis management.",
                Openness = 70, Conscientiousness = 70, Extraversion = 80, Agreeableness = 65, EmotionalStability = 65,
                Realistic = 10, Investigative = 40, Artistic = 55, Social = 75, Enterprising = 80, Conventional = 40,
                ValAutonomy = 55, ValSecurity = 50, ValChallenge = 65, ValService = 45, ValWorkLifeBalance = 50,
                EnvPace = 80, EnvCollaboration = 75, EnvStructure = 40 },

            new CareerProfile { Id = id++, Title = "Social Media Manager", Category = "Media & Communications",
                Description = "Create and manage social media content and strategy to grow audiences and build brand engagement.",
                Openness = 80, Conscientiousness = 60, Extraversion = 75, Agreeableness = 60, EmotionalStability = 60,
                Realistic = 15, Investigative = 35, Artistic = 75, Social = 65, Enterprising = 70, Conventional = 35,
                ValAutonomy = 70, ValSecurity = 40, ValChallenge = 55, ValService = 40, ValWorkLifeBalance = 60,
                EnvPace = 85, EnvCollaboration = 60, EnvStructure = 30 },

            // =====================================================================
            // SKILLED SERVICES
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Dental Hygienist", Category = "Healthcare",
                Description = "Clean teeth, examine patients for oral diseases, and provide preventive dental care.",
                Openness = 40, Conscientiousness = 80, Extraversion = 55, Agreeableness = 75, EmotionalStability = 75,
                Realistic = 65, Investigative = 50, Artistic = 15, Social = 65, Enterprising = 25, Conventional = 65,
                ValAutonomy = 50, ValSecurity = 80, ValChallenge = 40, ValService = 70, ValWorkLifeBalance = 80,
                EnvPace = 45, EnvCollaboration = 50, EnvStructure = 75 },

            new CareerProfile { Id = id++, Title = "Veterinarian", Category = "Healthcare",
                Description = "Diagnose and treat diseases and injuries in animals, and advise pet owners on animal care.",
                Openness = 65, Conscientiousness = 85, Extraversion = 50, Agreeableness = 75, EmotionalStability = 70,
                Realistic = 75, Investigative = 80, Artistic = 15, Social = 60, Enterprising = 40, Conventional = 45,
                ValAutonomy = 65, ValSecurity = 65, ValChallenge = 70, ValService = 85, ValWorkLifeBalance = 50,
                EnvPace = 60, EnvCollaboration = 45, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Personal Trainer / Fitness Coach", Category = "Healthcare",
                Description = "Design exercise programs and motivate clients to achieve their health and fitness goals.",
                Openness = 60, Conscientiousness = 70, Extraversion = 80, Agreeableness = 75, EmotionalStability = 70,
                Realistic = 70, Investigative = 40, Artistic = 20, Social = 85, Enterprising = 65, Conventional = 25,
                ValAutonomy = 80, ValSecurity = 35, ValChallenge = 55, ValService = 80, ValWorkLifeBalance = 60,
                EnvPace = 65, EnvCollaboration = 55, EnvStructure = 30 },

            // =====================================================================
            // ADDITIONAL DIVERSE CAREERS
            // =====================================================================
            new CareerProfile { Id = id++, Title = "Pilot", Category = "Transportation",
                Description = "Operate aircraft to transport passengers or cargo safely and efficiently.",
                Openness = 50, Conscientiousness = 90, Extraversion = 50, Agreeableness = 50, EmotionalStability = 90,
                Realistic = 85, Investigative = 55, Artistic = 10, Social = 30, Enterprising = 45, Conventional = 70,
                ValAutonomy = 55, ValSecurity = 75, ValChallenge = 70, ValService = 40, ValWorkLifeBalance = 40,
                EnvPace = 65, EnvCollaboration = 40, EnvStructure = 90 },

            new CareerProfile { Id = id++, Title = "Supply Chain / Logistics Manager", Category = "Business & Finance",
                Description = "Coordinate the flow of goods from suppliers to customers, optimizing efficiency and reducing costs.",
                Openness = 45, Conscientiousness = 85, Extraversion = 55, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 45, Investigative = 55, Artistic = 10, Social = 40, Enterprising = 65, Conventional = 80,
                ValAutonomy = 50, ValSecurity = 70, ValChallenge = 65, ValService = 30, ValWorkLifeBalance = 55,
                EnvPace = 75, EnvCollaboration = 70, EnvStructure = 80 },

            new CareerProfile { Id = id++, Title = "Event Planner", Category = "Business & Finance",
                Description = "Organize and coordinate events such as conferences, weddings, and corporate gatherings.",
                Openness = 70, Conscientiousness = 75, Extraversion = 85, Agreeableness = 70, EmotionalStability = 60,
                Realistic = 35, Investigative = 25, Artistic = 65, Social = 80, Enterprising = 75, Conventional = 50,
                ValAutonomy = 60, ValSecurity = 40, ValChallenge = 60, ValService = 65, ValWorkLifeBalance = 35,
                EnvPace = 85, EnvCollaboration = 80, EnvStructure = 50 },

            new CareerProfile { Id = id++, Title = "Librarian / Information Specialist", Category = "Education",
                Description = "Organize, curate, and provide access to information resources, and help patrons with research.",
                Openness = 80, Conscientiousness = 75, Extraversion = 40, Agreeableness = 75, EmotionalStability = 75,
                Realistic = 15, Investigative = 70, Artistic = 40, Social = 65, Enterprising = 20, Conventional = 70,
                ValAutonomy = 65, ValSecurity = 75, ValChallenge = 50, ValService = 75, ValWorkLifeBalance = 80,
                EnvPace = 25, EnvCollaboration = 45, EnvStructure = 70 },

            new CareerProfile { Id = id++, Title = "Sales Representative", Category = "Business & Finance",
                Description = "Sell products or services to businesses or consumers through relationship-building and persuasion.",
                Openness = 50, Conscientiousness = 65, Extraversion = 90, Agreeableness = 55, EmotionalStability = 65,
                Realistic = 20, Investigative = 25, Artistic = 15, Social = 70, Enterprising = 95, Conventional = 40,
                ValAutonomy = 70, ValSecurity = 45, ValChallenge = 65, ValService = 40, ValWorkLifeBalance = 45,
                EnvPace = 85, EnvCollaboration = 50, EnvStructure = 35 },

            new CareerProfile { Id = id++, Title = "Psychologist", Category = "Healthcare",
                Description = "Study human behavior and mental processes, and provide therapy or conduct research.",
                Openness = 85, Conscientiousness = 75, Extraversion = 50, Agreeableness = 80, EmotionalStability = 80,
                Realistic = 10, Investigative = 85, Artistic = 35, Social = 90, Enterprising = 30, Conventional = 30,
                ValAutonomy = 75, ValSecurity = 60, ValChallenge = 75, ValService = 90, ValWorkLifeBalance = 60,
                EnvPace = 35, EnvCollaboration = 40, EnvStructure = 40 },

            new CareerProfile { Id = id++, Title = "Mechanical Engineer", Category = "Trades & Hands-On",
                Description = "Design, develop, and test mechanical devices and systems from engines to manufacturing equipment.",
                Openness = 65, Conscientiousness = 85, Extraversion = 40, Agreeableness = 50, EmotionalStability = 75,
                Realistic = 85, Investigative = 80, Artistic = 25, Social = 25, Enterprising = 40, Conventional = 60,
                ValAutonomy = 60, ValSecurity = 70, ValChallenge = 80, ValService = 35, ValWorkLifeBalance = 60,
                EnvPace = 50, EnvCollaboration = 55, EnvStructure = 70 },

            new CareerProfile { Id = id++, Title = "Flight Attendant", Category = "Transportation",
                Description = "Ensure passenger safety and comfort during flights while providing excellent customer service.",
                Openness = 60, Conscientiousness = 70, Extraversion = 80, Agreeableness = 80, EmotionalStability = 70,
                Realistic = 40, Investigative = 15, Artistic = 20, Social = 80, Enterprising = 45, Conventional = 55,
                ValAutonomy = 35, ValSecurity = 65, ValChallenge = 40, ValService = 75, ValWorkLifeBalance = 40,
                EnvPace = 70, EnvCollaboration = 70, EnvStructure = 75 },

            new CareerProfile { Id = id++, Title = "Web Developer", Category = "Technology",
                Description = "Build and maintain websites and web applications using modern frameworks and technologies.",
                Openness = 70, Conscientiousness = 75, Extraversion = 35, Agreeableness = 55, EmotionalStability = 70,
                Realistic = 50, Investigative = 75, Artistic = 60, Social = 25, Enterprising = 35, Conventional = 45,
                ValAutonomy = 80, ValSecurity = 55, ValChallenge = 75, ValService = 35, ValWorkLifeBalance = 75,
                EnvPace = 65, EnvCollaboration = 45, EnvStructure = 45 },

            new CareerProfile { Id = id++, Title = "Occupational Therapist", Category = "Healthcare",
                Description = "Help patients develop or recover daily living and work skills after injury, illness, or disability.",
                Openness = 65, Conscientiousness = 75, Extraversion = 60, Agreeableness = 85, EmotionalStability = 75,
                Realistic = 55, Investigative = 60, Artistic = 35, Social = 90, Enterprising = 25, Conventional = 40,
                ValAutonomy = 60, ValSecurity = 70, ValChallenge = 60, ValService = 90, ValWorkLifeBalance = 65,
                EnvPace = 45, EnvCollaboration = 60, EnvStructure = 55 },

            new CareerProfile { Id = id++, Title = "Game Designer", Category = "Technology",
                Description = "Conceptualize and design video game mechanics, narratives, levels, and player experiences.",
                Openness = 90, Conscientiousness = 65, Extraversion = 45, Agreeableness = 55, EmotionalStability = 60,
                Realistic = 40, Investigative = 60, Artistic = 90, Social = 40, Enterprising = 45, Conventional = 30,
                ValAutonomy = 75, ValSecurity = 40, ValChallenge = 80, ValService = 35, ValWorkLifeBalance = 55,
                EnvPace = 65, EnvCollaboration = 65, EnvStructure = 35 },

            new CareerProfile { Id = id++, Title = "Construction Manager", Category = "Trades & Hands-On",
                Description = "Plan and oversee construction projects, managing budgets, timelines, and subcontractors.",
                Openness = 45, Conscientiousness = 85, Extraversion = 65, Agreeableness = 50, EmotionalStability = 75,
                Realistic = 80, Investigative = 45, Artistic = 15, Social = 50, Enterprising = 75, Conventional = 65,
                ValAutonomy = 60, ValSecurity = 70, ValChallenge = 65, ValService = 35, ValWorkLifeBalance = 45,
                EnvPace = 75, EnvCollaboration = 70, EnvStructure = 70 },
        };
    }
}
