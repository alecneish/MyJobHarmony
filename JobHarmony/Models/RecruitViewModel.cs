namespace JobHarmony.Models;

public class RecruitViewModel
{
    public List<Applicant> RecommendedApplicants { get; set; } = new();
    public List<Applicant> AllApplicants { get; set; } = new();
}
