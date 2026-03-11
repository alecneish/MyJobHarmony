using JobHarmony.Data;
using JobHarmony.Areas.Quiz.Data;
using JobHarmony.Areas.Quiz.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Register EF Core with SQLite
builder.Services.AddDbContext<JobHarmonyContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Quiz area DbContext and services
builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("QuizConnection")));

builder.Services.AddScoped<QuizService>();
builder.Services.AddScoped<ScoringEngine>();
builder.Services.AddScoped<CareerMatchingService>();

var app = builder.Build();

// Auto-apply migrations and create the database on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<JobHarmonyContext>();
    db.Database.Migrate();

    var quizDb = scope.ServiceProvider.GetRequiredService<QuizDbContext>();
    quizDb.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

// Attribute-routed API controllers (e.g. /api/quiz/results)
app.MapControllers();

app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
