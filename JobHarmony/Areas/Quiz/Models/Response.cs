namespace JobHarmony.Areas.Quiz.Models;

public class Response
{
    public int Id { get; set; }
    public Guid SessionId { get; set; }
    public int QuestionId { get; set; }
    public int AnswerValue { get; set; }

    public QuizSession Session { get; set; } = null!;
    public Question Question { get; set; } = null!;
}
