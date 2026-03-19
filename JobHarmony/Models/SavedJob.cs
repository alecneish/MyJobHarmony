namespace JobHarmony.Models;

public class SavedJob
{
    public int Id { get; set; }
    public int ApplicantId { get; set; }
    public int JobId { get; set; }
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;

    public Applicant Applicant { get; set; } = null!;
    public Job Job { get; set; } = null!;
}
