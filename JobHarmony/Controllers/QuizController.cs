using Microsoft.AspNetCore.Mvc;
using JobHarmony.Data;
using JobHarmony.Models;

namespace JobHarmony.Controllers;

public class QuizController : Controller
{
    public IActionResult Index()
    {
        var model = new QuizViewModel
        {
            Questions = SeedData.GetQuizQuestions()
        };
        return View(model);
    }

    public IActionResult Results()
    {
        var model = SeedData.GetDefaultResult();
        return View(model);
    }
}
