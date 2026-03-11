# JobHarmony — Career Compass

## App Summary

JobHarmony is a career matching platform that helps people find jobs that fit who they are. Many employees feel disengaged not because they lack skills, but because their personality and work style clash with their environment. JobHarmony addresses this by giving job seekers a structured personality assessment based on the Big Five (OCEAN) model, then using those results to surface job listings ranked by how well they match the applicant's profile. On the recruiter side, the platform helps companies identify candidates whose personalities align with their team culture. The result is a two-sided matching experience: applicants find direction and purpose, and companies find genuinely motivated hires.

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

(Currently no migrations to run, but this ensures the setup works.)

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
│   │   ├── data/             ← Seed / static data
│   │   ├── db/               ← Supabase client (REST API)
│   │   └── types/            ← Shared TypeScript interfaces
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
