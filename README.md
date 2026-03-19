# JobHarmony — Career Compass

## App Summary

JobHarmony is a career matching platform that helps people find jobs that fit who they are. Many employees feel disengaged not because they lack skills, but because their personality and work style clash with their environment. JobHarmony addresses this by giving job seekers a structured personality assessment based on the Big Five (OCEAN) model, then using those results to surface job listings ranked by how well they match the applicant's profile. On the recruiter side, the platform helps companies identify candidates whose personalities align with their team culture. The result is a two-sided matching experience: applicants find direction and purpose, and companies find genuinely motivated hires.

---

## Working Features

- Career personality quiz with progress tracking and results visualization (`/quiz` → `/quiz/results`).
- Quiz interface playground that demonstrates every common HTML form question/answer type in one page (`/quiz/interface`).
- Job browsing with fit badges and saved jobs (`/jobs`, `/jobs/saved`).
- Recruiter view of recommended candidates (`/recruit`).

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router |
| Backend | Node.js, Express, TypeScript (ts-node-dev) |
| Database | Supabase/Postgres (local + prod via REST API) |
| Auth | Not yet implemented |
| External APIs | None |

---

## Architecture Diagram

```text
┌─────────────┐      HTTP (fetch)      ┌──────────────────────┐
│             │ ── GET /api/jobs ─────► │                      │
│    User     │ ── GET /api/quiz ─────► │  Express API Server  │
│  (Browser)  │ ── POST /api/quiz ────► │   (Node.js / TS)     │
│             │                         │                      │
│             │ ◄── JSON responses ──── │   ┌──────────────┐   │
│             │                         │   │  Route files │   │
│             │                         │   │  /api/quiz   │   │
└─────────────┘                         │   │  /api/jobs   │   │
      ▲                                 │   │  /api/recruit│   │
      │ Vite dev server                 │   └──────┬───────┘   │
      │ (proxy /api → :3001)            │          │           │
┌─────┴───────┐                         │   ┌──────▼───────┐   │
│  React App  │                         │   │  Supabase    │   │
│  Vite :5173 │                         │   │  REST API    │   │
│  TypeScript │                         │   │  (Postgres)  │   │
└─────────────┘                         │   └──────────────┘   │
                                        └──────────────────────┘
```

---

## Prerequisites

| Tool | Version | Install |
| --- | --- | --- |
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | bundled with Node |
| Git | any | https://git-scm.com |
| Docker | latest | https://www.docker.com/get-started |

**Verify your installations:**

```bash
node --version    # should print 18.x or higher
npm --version
git --version
docker --version
```

---

## Getting Started (step-by-step)

Run every command below **from the project root** (`JobHarmony/`) unless noted otherwise.

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd JobHarmony
```

### 2. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

This installs everything, including the Supabase CLI (as a dev dependency in `backend/`).

### 3. Start local Supabase

Make sure Docker Desktop is running, then:

```bash
cd backend
npx supabase start
cd ..
```

This spins up a local Postgres database and prints output with URLs and keys. **Keep this terminal output open** — you'll need values from it in the next step.

### 4. Set up the backend environment

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in these values using the output from step 3:

| Variable | Where to find it |
| --- | --- |
| `DATABASE_URL` | "Database → URL" (e.g. `postgresql://postgres:postgres@127.0.0.1:54322/postgres`) |
| `SUPABASE_URL` | "APIs → Project URL" (e.g. `http://127.0.0.1:54321`) |
| `SUPABASE_SECRET_KEY` | "Authentication Keys → Secret" |
| `SUPABASE_PUBLISHABLE_KEY` | "Authentication Keys → Publishable" (optional) |

### 5. Run migrations

```bash
npm run migrate --prefix backend
```

This runs the scoring engine migration (`20260316000000_scoring_engine.sql`) which creates the `quiz_sessions`, `quiz_responses`, `dimension_scores`, `career_matches`, and `career_profiles` tables.

### 6. Start the app

Open **two terminals**, both from the project root:

**Terminal 1 — Backend (port 3001):**

```bash
npm run dev --prefix backend
```

**Terminal 2 — Frontend (port 5173):**

```bash
npm run dev --prefix frontend
```

Then open your browser to `http://localhost:5173`. All `/api/*` requests are automatically proxied to the backend.

### Stopping and resuming

When you're done developing:

```bash
cd backend
npx supabase stop
cd ..
```

When resuming, run `npx supabase start` again from `backend/` (step 3). Your data is preserved between sessions. The Database URL and keys stay the same.

---

## Migrations (how to create and run)

1. Make sure `backend/.env` has the right `DATABASE_URL` (local or prod).
2. Create a new migration (from project root):

   ```bash
   npm run migrate:create --prefix backend -- add-quiz-results-table
   ```

   This creates `backend/migrations/<timestamp>-add-quiz-results-table.js`.
3. Edit the new file and add your `exports.up`/`exports.down` changes (tables/columns). (This is when to use claude code or cursor to help generate the SQL. Just give it the name of the migration file and it will generate the SQL that you request.)
4. Run migrations:

   ```bash
   npm run migrate --prefix backend
   ```

   Runs against whatever `DATABASE_URL` is set to in `backend/.env`. If it points to prod, it runs on prod. If local, it runs locally.
5. Commit the migration file (but do **not** commit `backend/.env`).

---

## Linking to the remote Supabase project (owner only)
Yes, just commit them.
**What linking does:**

- Connects the Supabase CLI to a specific Supabase project so you can push migrations/seeds to that project via CLI.

**Who should do this:**

- Only one responsible person or CI. Non-technical teammates running locally should NOT link.

**How to link (owner/CI):**

1. Log in: `cd backend && npx supabase login` (opens browser for token).
2. Link the project: `npx supabase link --project-ref <your_project_ref>` (still from `backend/`).
3. After linking, push migrations when needed (with prod `DATABASE_URL` set in env/CI): `npm run migrate` or `npx supabase db push` (from `backend/`).

**Responsibilities of the linking owner:**

- Keep the project ref/credentials secure; do not commit secrets.
- Only run migrations on prod/stage when intended; double-check `DATABASE_URL`/context before running.
- Inform the team which database is linked and when migrations were applied.

---

## Production environment (secrets to set)

Set these in your hosting/CI secrets (do not commit to git):

- `DATABASE_URL`: Supabase Postgres URL from Settings → Database → Connection info (prod instance).
- `SUPABASE_URL`: Supabase REST base URL (e.g., `https://<project>.supabase.co`).
- `SUPABASE_SECRET_KEY`: Supabase Secret key (server-side only).
- Optional: `SUPABASE_PUBLISHABLE_KEY` if any client surface needs it (keep out of git anyway).

Migrations: run `npm run migrate --prefix backend` in a linked/authorized context with these prod secrets set. Do not auto-run migrations on deploy unless you intentionally add that step.

---

## Scoring Engine

The scoring system lives entirely in `backend/src/` and is the core of how JobHarmony matches users to careers. Here is everything you need to understand or extend it.

### How it works (end-to-end)

```
User answers quiz (1–5 per question)
        ↓
POST /api/quiz/submit  { responses: [{questionId, answerValue}] }
        ↓
scoringEngine.ts  → dimension scores (subdimension + aggregate)
        ↓
careerMatchingService.ts  → top 15 career matches (ranked)
        ↓
Supabase  → persists session, responses, scores, matches
        ↓
Response: { sessionId, dimensionScores, careerMatches }
```

### Question format

Questions are defined in `backend/src/data/seedData.ts`. Each is a Likert-scale (1–5) statement. Key fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | `number` | Used to link a response to a question |
| `dimension` | `string` | Top-level trait (e.g. `"Openness"`, `"Realistic"`, `"Autonomy"`) |
| `subdimension` | `string` | Facet within the dimension (empty string `""` for single-facet dimensions) |
| `isReverseScored` | `boolean` | If true, answer is flipped: `value = 6 - value` before scoring |
| `weight` | `number` | Multiplier applied when computing weighted average (most are `1.0`) |
| `tier` | `"Free"` \| `"Premium"` | Informational only — all questions are scored the same way |

There are 62 questions across 4 sections and 18 dimensions. All 4 sections must be answered for a complete profile. You can submit a partial set — missing dimensions simply won't appear in the output.

### Dimensions

There are 18 scored dimensions organized into 4 categories. The category name controls the weight applied during career matching:

| Category | Weight | Dimensions |
| --- | --- | --- |
| RIASEC | 1.2 | Realistic, Investigative, Artistic, Social, Enterprising, Conventional |
| OCEAN | 1.0 | Openness, Conscientiousness, Extraversion, Agreeableness, EmotionalStability |
| Values | 0.8 | Autonomy, Security, Challenge, Service, WorkLifeBalance |
| Environment | 0.6 | Pace, Collaboration, Structure |

### Scoring pipeline (`scoringEngine.ts`)

1. For each response, look up the question's `isReverseScored` and `weight`.
2. Apply reverse scoring if needed: `adjustedValue = isReverseScored ? 6 - answerValue : answerValue`
3. Compute a **weighted average** per `(dimension, subdimension)` group:
   `rawAvg = Σ(adjustedValue × weight) / Σ(weight)`
4. **Normalize** to 0–100: `normalizedScore = ((rawAvg - 1.0) / 4.0) × 100`
5. **Roll up**: average all subdimension scores within a dimension to produce an aggregate score (`subdimension = ""`). These aggregate scores are what career matching uses.

Output is an array of `DimensionScore` objects — one per subdimension plus one aggregate per dimension.

### Career matching pipeline (`careerMatchingService.ts`)

1. Filter scores to aggregates only (`subdimension === ""`).
2. Build a **user vector**: `{ [dimension]: { value: normalizedScore, weight: categoryWeight } }`
3. For each of the 66 career profiles, build a **career vector** with the same structure.
4. Compute **weighted Euclidean distance**:
   `distance = √( Σ(weight × diff²) / Σ(weight) )`
5. Convert to a **match percentage**:
   `matchScore = max(0, (1 - distance / 100) × 100)`
6. Sort descending by `matchScore`, assign `rank`, return top 15.

### Career profiles (`backend/src/data/careerProfiles.ts`)

66 profiles spanning Technology, Healthcare, Business, Creative, Education, Trades, Public Service, Science, Media, and Transportation. Each profile is a pre-defined vector of all 18 dimension scores (0–100 scale) representing the "ideal" trait profile for that career.

To add a career: append an object to the array in `getCareerProfiles()`. All 18 dimension fields are required.

### API contract

**Submit quiz responses**

```
POST /api/quiz/submit
Content-Type: application/json

{
  "responses": [
    { "questionId": 1, "answerValue": 4 },
    { "questionId": 2, "answerValue": 2 },
    ...
  ],
  "userId": "optional-uuid"   // omit for anonymous sessions
}
```

**Success response (200)**

```json
{
  "success": true,
  "sessionId": "uuid",
  "dimensionScores": [
    {
      "dimension": "Openness",
      "subdimension": "OpennessToIdeas",
      "rawScore": 3.5,
      "normalizedScore": 62.5
    },
    {
      "dimension": "Openness",
      "subdimension": "",
      "rawScore": 3.5,
      "normalizedScore": 62.5
    },
    ...
  ],
  "careerMatches": [
    { "careerProfileId": 3, "title": "UX Designer", "matchScore": 87.4, "rank": 1 },
    { "careerProfileId": 1, "title": "Software Developer", "matchScore": 83.1, "rank": 2 },
    ...
  ]
}
```

If Supabase is unavailable, `sessionId` will be `null` but scores and matches are still returned.

**Validation rules:**
- `responses` must be a non-empty array
- `answerValue` must be an integer between 1 and 5 (inclusive)
- Unknown `questionId` values are silently ignored

**Get questions**

```
GET /api/quiz/questions
```

Returns all 62 questions. Use `tier` to decide which to show (Free = shorter quiz, all = full quiz).

### Database tables (migration: `backend/supabase/migrations/20260316000000_scoring_engine.sql`)

| Table | Purpose |
| --- | --- |
| `quiz_sessions` | One row per quiz attempt; optionally tied to a `user_id` |
| `quiz_responses` | Raw answers: `question_id` + `answer_value` per session |
| `dimension_scores` | Computed scores: both subdimension and aggregate rows |
| `career_matches` | Top-ranked career matches with `match_score` and `rank` |
| `career_profiles` | Reference table for career metadata (mirrors `careerProfiles.ts`) |

To apply the migration locally: `cd backend && npx supabase db push`
To apply to production: run the SQL in the Supabase dashboard or via a linked CLI push.

---

## Project Structure

```
JobHarmony/
├── backend/
│   ├── src/
│   │   ├── index.ts          ← Express app entry point (port 3001)
│   │   ├── routes/
│   │   │   ├── quiz.ts       ← GET/POST /api/quiz
│   │   │   ├── jobs.ts       ← GET /api/jobs
│   │   │   └── recruit.ts    ← GET /api/recruit
│   │   ├── data/
│   │   │   ├── seedData.ts       ← Quiz questions (Likert) + jobs/applicants
│   │   │   └── careerProfiles.ts ← 66 career profiles with 18 dimension scores each
│   │   ├── services/
│   │   │   ├── scoringEngine.ts        ← Weighted avg + normalize + roll-up
│   │   │   └── careerMatchingService.ts← Weighted Euclidean distance + ranking
│   │   ├── db/               ← Supabase client (REST API)
│   │   └── types/            ← Shared TypeScript interfaces
│   ├── supabase/
│   │   └── migrations/
│   │       └── 20260316000000_scoring_engine.sql
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx          ← React entry point
│   │   ├── App.tsx           ← Router setup
│   │   ├── pages/            ← Page-level components
│   │   ├── components/       ← Reusable UI components
│   │   └── types/            ← Shared TypeScript interfaces
│   ├── index.html
│   ├── vite.config.ts        ← Dev server + API proxy config
│   ├── package.json
│   └── tsconfig.json
└── README.md
```
