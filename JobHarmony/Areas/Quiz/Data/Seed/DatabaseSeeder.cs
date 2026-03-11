using Microsoft.EntityFrameworkCore;

namespace JobHarmony.Areas.Quiz.Data.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(QuizDbContext db)
    {
        if (await db.Questions.AnyAsync())
            return;

        var questions = QuestionSeedData.GetAllQuestions();
        db.Questions.AddRange(questions);

        var careers = CareerProfileSeedData.GetAllProfiles();
        db.CareerProfiles.AddRange(careers);

        await db.SaveChangesAsync();
    }
}
