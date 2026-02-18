# JobHarmony — Career Compass

## App Summary

JobHarmony is a career matching platform designed to solve one of the most persistent problems in the modern workplace: people ending up in jobs that don't fit who they are. Many employees feel disengaged not because they lack skills, but because their personality and work style clash with their environment. JobHarmony addresses this by giving job seekers a structured personality assessment based on the Big Five (OCEAN) model, then using those results to surface job listings ranked by how well they match the applicant's profile. On the recruiter side, the platform helps companies identify enthusiastic candidates whose personalities align with their team culture — not just their resume. The result is a two-sided matching experience: applicants find direction and purpose, and companies find genuinely motivated hires. The app is designed to be simple and accessible, requiring no account to complete the quiz and see results.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | Razor (CSHTML), Bootstrap 5, jQuery, vanilla CSS |
| Backend     | ASP.NET Core 10 MVC (C#)                        |
| ORM         | Entity Framework Core 10                        |
| Database    | SQLite (`jobharmony.db`)                        |
| Auth        | Not yet implemented (planned: ASP.NET Identity) |
| External APIs | None                                          |

---

## Architecture Diagram

```
┌─────────────┐        HTTP requests        ┌──────────────────────┐
│             │ ─── GET /Jobs/Index ──────► │                      │
│    User     │ ─── GET /Quiz/Index ──────► │   ASP.NET Core MVC   │
│  (Browser)  │                             │   (Controllers +     │
│             │ ◄── Razor HTML responses ── │    Razor Views)      │
│             │                             │                      │
│             │  POST /api/quiz/results     │   ┌──────────────┐   │
│             │ ──────── fetch() ─────────► │   │  API Layer   │   │
│             │ ◄──── JSON response ──────  │   │ /Controllers │   │
│             │                             │   │    /Api/     │   │
└─────────────┘                             │   └──────┬───────┘   │
                                            │          │ EF Core   │
                                            │   ┌──────▼───────┐   │
                                            │   │ JobHarmony   │   │
                                            │   │   Context    │   │
                                            │   └──────┬───────┘   │
                                            └──────────┼───────────┘
                                                       │
                                            ┌──────────▼───────────┐
                                            │   SQLite Database    │
                                            │   (jobharmony.db)    │
                                            │                      │
                                            │  Users               │
                                            │  Applicants          │
                                            │  Jobs                │
                                            │  QuizQuestions       │
                                            │  QuizOptions         │
                                            │  QuizResults  ◄──── saves on submit
                                            │  SavedJobs           │
                                            │  JobTags             │
                                            └──────────────────────┘
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| .NET SDK | 10.0+ | https://dotnet.microsoft.com/download |
| EF Core CLI tools | latest | `dotnet tool install --global dotnet-ef` |
| Git | any | https://git-scm.com |

**Verify your installations:**
```bash
dotnet --version        # should print 10.x.x
dotnet ef --version     # should print 10.x.x
git --version
```

> SQLite is bundled — no separate database server is needed.

---

## Installation and Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd JobHarmony
```

### 2. Install dependencies
```bash
cd JobHarmony
dotnet restore
```

### 3. Configure the connection string

Open `appsettings.json` and confirm this block is present (it should be already):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=jobharmony.db"
  }
}
```

For environment variable overrides, see `.env.example`.

### 4. Create the database and apply migrations

```bash
dotnet ef database update
```

This creates `jobharmony.db` in the `JobHarmony/` project folder with all 8 tables.

> **Note:** The app also auto-applies migrations on startup, so this step is optional if you're about to run the app anyway.

### 5. (Optional) Load sample data

The schema and seed files in `/db` are for reference and manual inspection.
To load seed data manually using the sqlite3 CLI:
```bash
sqlite3 JobHarmony/jobharmony.db < db/seed.sql
```

---

## Running the Application

```bash
cd JobHarmony
dotnet run
```

Then open your browser to:
```
https://localhost:5001
```
or
```
http://localhost:5000
```

The exact URLs are printed in the terminal output when the app starts.

---

## Verifying the Vertical Slice

The wired-up button is **"See Results"** — the final Next button on the personality quiz.

### Step-by-step

1. **Navigate to the quiz**
   Go to `https://localhost:5001/Quiz` and answer all 8 questions.

2. **Click "See Results"**
   On the last question, the Next button reads "See Results →". Click it.

3. **Watch for the confirmation snackbar**
   A notification at the bottom-left of the screen should read:
   > *Your results have been saved!*

4. **You are redirected to `/Quiz/Results`**
   The results page displays your personality breakdown as normal.

5. **Verify the database was updated**
   Open a terminal and run:
   ```bash
   sqlite3 JobHarmony/jobharmony.db "SELECT * FROM QuizResults ORDER BY Id DESC LIMIT 5;"
   ```
   You should see a new row with your five trait scores, dominant trait, and motivation type.

6. **Confirm it persists after a page refresh**
   Refresh `/Quiz/Results` — the page still renders (it reads from `localStorage`).
   Run the sqlite3 query again — your row is still there.

7. **Confirm multiple submissions accumulate**
   Retake the quiz (`/Quiz`) and submit again. Each submission adds a new row to `QuizResults`.

---

## Project Structure

```
JobHarmony/
├── Controllers/
│   ├── Api/
│   │   └── QuizResultsController.cs   ← POST /api/quiz/results
│   ├── HomeController.cs
│   ├── JobsController.cs
│   ├── QuizController.cs
│   └── RecruitController.cs
├── Data/
│   ├── JobHarmonyContext.cs            ← EF Core DbContext (8 DbSets)
│   └── SeedData.cs                    ← In-memory data for MVC views
├── Models/
│   ├── Applicant.cs
│   ├── Job.cs
│   ├── JobTag.cs
│   ├── QuizOption.cs
│   ├── QuizQuestion.cs
│   ├── QuizResult.cs                  ← DB entity for quiz submissions
│   ├── SavedJob.cs
│   └── User.cs
├── Migrations/                         ← EF-generated migration files
├── Views/                              ← Razor templates
├── wwwroot/
│   ├── css/site.css
│   └── js/site.js                     ← fetch() call wired to quiz submit
├── appsettings.json                    ← Connection string lives here
└── Program.cs                         ← App bootstrap + EF registration
db/
├── schema.sql                          ← Human-readable schema reference
└── seed.sql                            ← Sample INSERT statements
.env.example                            ← Config variable reference
```
