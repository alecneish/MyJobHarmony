using Microsoft.AspNetCore.Mvc;
using JobHarmony.Data;
using JobHarmony.Models;

namespace JobHarmony.Controllers;

public class JobsController : Controller
{
    public IActionResult Index()
    {
        var jobs = SeedData.GetJobs();
        var model = new JobListingsViewModel
        {
            Jobs = jobs,
            AllTags = jobs.SelectMany(j => j.Tags).Distinct().OrderBy(t => t).ToList(),
            AllTypes = jobs.Select(j => j.Type).Distinct().OrderBy(t => t).ToList(),
            AllLocations = jobs.Select(j => j.Location).Distinct().OrderBy(l => l).ToList()
        };
        return View(model);
    }

    public IActionResult Saved()
    {
        var jobs = SeedData.GetJobs();
        var model = new JobListingsViewModel
        {
            Jobs = jobs,
            AllTags = jobs.SelectMany(j => j.Tags).Distinct().OrderBy(t => t).ToList(),
            AllTypes = jobs.Select(j => j.Type).Distinct().OrderBy(t => t).ToList(),
            AllLocations = jobs.Select(j => j.Location).Distinct().OrderBy(l => l).ToList()
        };
        return View(model);
    }
}
