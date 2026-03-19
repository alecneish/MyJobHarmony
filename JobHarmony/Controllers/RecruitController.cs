using Microsoft.AspNetCore.Mvc;
using JobHarmony.Data;
using JobHarmony.Models;

namespace JobHarmony.Controllers;

public class RecruitController : Controller
{
    public IActionResult Index()
    {
        var applicants = SeedData.GetApplicants();
        var model = new RecruitViewModel
        {
            RecommendedApplicants = applicants.Where(a => a.IsRecommended).ToList(),
            AllApplicants = applicants.Where(a => !a.IsRecommended).ToList()
        };
        return View(model);
    }
}
