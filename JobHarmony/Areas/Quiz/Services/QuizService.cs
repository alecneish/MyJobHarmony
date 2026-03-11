using Microsoft.EntityFrameworkCore;
using JobHarmony.Areas.Quiz.Data;
using JobHarmony.Areas.Quiz.Models;

namespace JobHarmony.Areas.Quiz.Services;

public class QuizService
{
    private readonly QuizDbContext _db;

    public QuizService(QuizDbContext db)
    {
        _db = db;
    }

    public async Task<QuizSession> StartSessionAsync(string tier)
    {
        var session = new QuizSession
        {
            Id = Guid.NewGuid(),
            Tier = tier,
            StartedAt = DateTime.UtcNow
        };
        _db.QuizSessions.Add(session);
        await _db.SaveChangesAsync();
        return session;
    }

    public async Task<QuizSession?> GetSessionAsync(Guid sessionId)
    {
        return await _db.QuizSessions
            .Include(s => s.Responses)
            .FirstOrDefaultAsync(s => s.Id == sessionId);
    }

    public async Task<List<Question>> GetQuestionsForTierAsync(string tier)
    {
        var query = _db.Questions.AsQueryable();

        if (tier == "Free")
            query = query.Where(q => q.Tier == "Free");

        return await query
            .OrderBy(q => q.Section)
            .ThenBy(q => q.SectionOrder)
            .ToListAsync();
    }

    public async Task<List<string>> GetSectionsForTierAsync(string tier)
    {
        var query = _db.Questions.AsQueryable();

        if (tier == "Free")
            query = query.Where(q => q.Tier == "Free");

        return await query
            .Select(q => q.Section)
            .Distinct()
            .ToListAsync();
    }

    public async Task<List<Question>> GetQuestionsForSectionAsync(string tier, string section)
    {
        var query = _db.Questions.Where(q => q.Section == section);

        if (tier == "Free")
            query = query.Where(q => q.Tier == "Free");

        return await query.OrderBy(q => q.SectionOrder).ToListAsync();
    }

    public async Task SaveResponseAsync(Guid sessionId, int questionId, int answerValue)
    {
        var existing = await _db.Responses
            .FirstOrDefaultAsync(r => r.SessionId == sessionId && r.QuestionId == questionId);

        if (existing != null)
        {
            existing.AnswerValue = answerValue;
        }
        else
        {
            _db.Responses.Add(new Response
            {
                SessionId = sessionId,
                QuestionId = questionId,
                AnswerValue = answerValue
            });
        }
        await _db.SaveChangesAsync();
    }

    public async Task SaveResponseBatchAsync(Guid sessionId, Dictionary<int, int> answers)
    {
        foreach (var (questionId, answerValue) in answers)
        {
            var existing = await _db.Responses
                .FirstOrDefaultAsync(r => r.SessionId == sessionId && r.QuestionId == questionId);

            if (existing != null)
            {
                existing.AnswerValue = answerValue;
            }
            else
            {
                _db.Responses.Add(new Response
                {
                    SessionId = sessionId,
                    QuestionId = questionId,
                    AnswerValue = answerValue
                });
            }
        }
        await _db.SaveChangesAsync();
    }

    public async Task CompleteSessionAsync(Guid sessionId)
    {
        var session = await _db.QuizSessions.FindAsync(sessionId);
        if (session != null)
        {
            session.IsComplete = true;
            session.CompletedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }

    public async Task<int> GetAnsweredCountAsync(Guid sessionId)
    {
        return await _db.Responses.CountAsync(r => r.SessionId == sessionId);
    }

    public async Task<int> GetTotalQuestionCountAsync(string tier)
    {
        var query = _db.Questions.AsQueryable();
        if (tier == "Free")
            query = query.Where(q => q.Tier == "Free");
        return await query.CountAsync();
    }
}
