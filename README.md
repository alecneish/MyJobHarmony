# JobHarmony — Career Compass

## App Summary

JobHarmony is a career matching platform that helps people find jobs that fit who they are. Many employees feel disengaged not because they lack skills, but because their personality and work style clash with their environment. JobHarmony addresses this by giving job seekers a structured personality assessment based on the Big Five (OCEAN) model, then using those results to surface job listings ranked by how well they match the applicant's profile. On the recruiter side, the platform helps companies identify candidates whose personalities align with their team culture. The result is a two-sided matching experience: applicants find direction and purpose, and companies find genuinely motivated hires.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 18, TypeScript, Vite, React Router        |
| Backend     | Node.js, Express, TypeScript (ts-node-dev)      |
| Database    | SQLite (via better-sqlite3)                     |
| Auth        | Not yet implemented                             |
| External APIs | None                                          |

---

## Architecture Diagram

```
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
|------|---------|---------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | bundled with Node |
| Git | any | https://git-scm.com |

**Verify your installations:**
```bash
node --version    # should print 18.x or higher
npm --version
git --version
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
```
http://localhost:5173
```

All `/api/*` requests from the frontend are automatically proxied to `http://localhost:3001` by Vite.

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
