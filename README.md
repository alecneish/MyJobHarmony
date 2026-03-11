# JobHarmony — Career Compass

## App Summary

JobHarmony is a career matching platform that helps people find jobs that fit who they are. Many employees feel disengaged not because they lack skills, but because their personality and work style clash with their environment. JobHarmony addresses this by giving job seekers a structured personality assessment based on the Big Five (OCEAN) model, then using those results to surface job listings ranked by how well they match the applicant's profile. On the recruiter side, the platform helps companies identify candidates whose personalities align with their team culture. The result is a two-sided matching experience: applicants find direction and purpose, and companies find genuinely motivated hires.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router |
| Backend | Node.js, Express, TypeScript (ts-node-dev) |
| Database | Supabase/Postgres (prod), SQLite (dev) |
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
│  React App  │                         │   │  SQLite DB   │   │
│  Vite :5173 │                         │   │ (better-     │   │
│  TypeScript │                         │   │  sqlite3)    │   │
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
| SQLite | bundled | - |

**Verify your installations:**

```bash
node --version    # should print 18.x or higher
npm --version
git --version
docker --version
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd JobHarmony
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

---

## Supabase / Postgres

Supabase is the primary database. Dev runs against a local Docker Supabase/Postgres; prod uses the shared Supabase instance.

### Quick setup (non-technical)

1. Install backend deps (pulls Supabase client):
   ```bash
   cd backend
   npm install
   ```
2. Start local Supabase: `supabase start` (this prints your local Postgres connection string).
3. Copy the backend env template: `cp backend/.env.example backend/.env`.
4. In `backend/.env`, set:
   - `DATABASE_URL` to the **Database URL** (Postgres) from step 2 output (e.g., `postgres://postgres:postgres@127.0.0.1:54322/postgres`). Do not use the API/REST URL.
   - `SUPABASE_URL` to the REST base URL (e.g., `http://127.0.0.1:54321`).
   - `SUPABASE_SECRET_KEY` to the “Secret” key shown.
   - Optional: `SUPABASE_PUBLISHABLE_KEY` to the “Publishable” key (client-safe if needed).
   For prod, use the values from Supabase → Settings → Database / API.
5. Install frontend deps and run apps:
   - Backend: `npm run dev` (from `backend`)
   - Frontend: `cd frontend && npm install && npm run dev`
6. Migrations: `cd backend && npm run migrate`
   - Runs against whatever `DATABASE_URL` is set to (prod if prod URL, local if local).

### Start local Supabase/Postgres

```bash
supabase start
```

This brings up the local Supabase stack (Postgres, auth, etc.). Use the Postgres connection string shown in the command output (typically `postgres://postgres:postgres@127.0.0.1:54322/postgres`).

To stop local Supabase when you’re done:

```bash
supabase stop
```

When resuming work, run `supabase start` again and reuse the Database URL/keys it prints.

### App connection behavior

- Dev: point the Node backend to the local Supabase/Postgres container (use the `SUPABASE_DB_*` vars). No automatic migrations will run against Supabase.
- Prod: configure deployments to use the `*_PROD` Supabase settings. Do **not** auto-run migrations against prod.

---

## Running the Application

You need two terminals — one for the backend, one for the frontend.

### Terminal 1 — Backend (port 3001)
```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend (port 5173)
```bash
cd frontend
npm run dev
```

Then open your browser to:

```text
http://localhost:5173
```

All `/api/*` requests from the frontend are automatically proxied to `http://localhost:3001` by Vite.

---

## Migrations (how to create and run)

1. Make sure `backend/.env` has the right `DATABASE_URL` (local Docker or Supabase).
2. Create a new migration (example name):
   ```bash
   cd backend
   npm run migrate:create -- add-quiz-results-table
   ```
   This creates `backend/migrations/<timestamp>-add-quiz-results-table.js`.
3. Edit the new file and add your `exports.up`/`exports.down` changes (tables/columns).
4. Run migrations against the current `DATABASE_URL` target:
   ```bash
   npm run migrate
   ```
   - If `DATABASE_URL` points to prod, this runs on prod. If it points to local Docker, it runs locally.
5. Commit the migration file (but do not commit `backend/.env`).

---

## Linking to the remote Supabase project (owner only)

What linking does:
- Connects the Supabase CLI to a specific Supabase project so you can push migrations/seeds to that project via CLI.

Who should do this:
- Only one responsible person or CI. Non-technical teammates running locally should NOT link.

How to link (owner/CI):
1. Install Supabase CLI and log in: `supabase login` (opens browser for token).
2. From the repo root, link the project: `supabase link --project-ref <your_project_ref>`.
3. After linking, push migrations when needed (with prod `DATABASE_URL` set in env/CI): `cd backend && npm run migrate` or `supabase db push`.

Responsibilities of the linking owner:
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

Migrations: run `cd backend && npm run migrate` in a linked/authorized context with these prod secrets set. Do not auto-run migrations on deploy unless you intentionally add that step.

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
│   │   ├── data/             ← In-memory or SQLite data access
│   │   ├── db/               ← SQLite database file
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
├── db/
│   ├── schema.sql            ← Human-readable schema reference
│   └── seed.sql              ← Sample INSERT statements
└── README.md
```
