# Profile CRUD Rebuild Instructions

Use this document to re-implement the exact Edit Profile + Applicant Detail features on top of latest `main` with minimal drift.

## Scope Guardrails

- Only modify the files listed in this document.
- Do not introduce unrelated refactors.
- Keep route names, endpoint shapes, and component paths exactly as specified.
- Reuse existing styling patterns/classes where possible.

---

## 1) Backend: Applicant CRUD + Resume Endpoints

### File: `backend/src/routes/applicant.ts`
Create this file if missing. Implement an Express router with these endpoints:

1. `GET /api/applicant/:id`
   - Parse numeric `id` from params.
   - Return 404 with `{ message }` if applicant does not exist.
   - Return 200 with `{ applicant }` when found.

2. `POST /api/applicant`
   - Accept JSON payload:
     - `name: string`
     - `title: string`
     - `bio: string`
     - `skills: string[]`
     - optional `resumeUrl: string`
   - Validate required fields (`name`, `title`, `skills` non-empty).
   - Insert applicant and return `{ applicant }`.

3. `PATCH /api/applicant/:id`
   - Update existing applicant by id using same payload shape.
   - Return 404 if not found.
   - Return `{ applicant }` after update.

4. `POST /api/applicant/:id/resume`
   - Accept resume upload.
   - Persist/assign resume URL to applicant.
   - Return `{ applicant }`.

5. `DELETE /api/applicant/:id/resume`
   - Remove resume URL/reference for applicant.
   - Return `{ applicant }`.

### File: `backend/src/index.ts`
- Register applicant router under `/api/applicant`.

### File: `backend/src/types/index.ts`
- Add/adjust backend applicant request/response typings used by the route handlers.

### Files: `backend/package.json`, `backend/package-lock.json`
- Ensure dependencies needed by applicant routes/resume upload logic are present.

---

## 2) Frontend: Applicant API Client

### File: `frontend/src/lib/applicantApi.ts`
Create this module with:

- `ApplicantUpsertPayload` interface:
  - `name`, `title`, `bio`, `skills`, optional `resumeUrl`
- `ApplicantResponse` interface:
  - `{ applicant: Applicant }`
- `parseError(response)` helper:
  - Try parse JSON `{ message }`, fallback to `Request failed (<status>)`

Export functions:

1. `getApplicant(id: number): Promise<Applicant | null>`
   - GET `/api/applicant/${id}`
   - return `null` for 404
   - otherwise throw on non-OK and return `data.applicant`

2. `createApplicant(payload)`
   - POST `/api/applicant` JSON

3. `updateApplicant(id, payload)`
   - PATCH `/api/applicant/${id}` JSON

4. `uploadResume(id, file)`
   - POST `/api/applicant/${id}/resume` with `FormData` key `resume`

5. `deleteResume(id)`
   - DELETE `/api/applicant/${id}/resume`

All non-OK responses throw parsed error.

---

## 3) Frontend: Edit Profile Page

### File: `frontend/src/pages/EditProfile.tsx`
Create/maintain an `EditProfile` component with:

- state:
  - `applicantId` default `1`
  - `currentApplicant`
  - form state: `name`, `title`, `bio`, `skills` (comma-separated string)
  - `selectedFile`
  - `loading`, `saving`, `message`, `error`

- behavior:
  1. On mount, read `localStorage.getItem('applicantId')`; if positive integer, set `applicantId`.
  2. On `applicantId` change:
     - call `getApplicant(applicantId)`
     - if found: hydrate form
     - if not found: clear form/current applicant
  3. Save handler:
     - map form to payload (`skills` split by comma, trim/filter empty)
     - require at least one skill
     - if applicant exists: `updateApplicant`
     - else: `createApplicant`
     - if file selected: `uploadResume`
     - update local state, show success message
     - persist `localStorage applicantId`
  4. Remove resume handler:
     - call `deleteResume(currentApplicant.id)`
     - update state and success message

- UI:
  - heading/description for Edit Profile
  - fields for full name, title, description, skills
  - file picker for resume (`.pdf,.doc,.docx`)
  - current resume link + remove button if resume exists
  - save button with disabled logic and saving state
  - loading/error/success feedback

---

## 4) Frontend: Routing + Navigation

### File: `frontend/src/App.tsx`
- Add route:
  - `path="/profile/edit"` -> `<EditProfile />`

### File: `frontend/src/components/Layout.tsx`
- Add nav link:
  - text: `Edit Profile`
  - destination: `/profile/edit`

---

## 5) Frontend: Recruit Applicant Detail Modal

### File: `frontend/src/pages/Recruit.tsx`
Enhance recruiter page to support applicant detail viewing:

- Add selected applicant state.
- Make applicant cards clickable in both:
  - Top Candidates
  - All Applicants
- Open modal/dialog when clicked.
- Modal content must include:
  - name, initials/avatar, title
  - recommended badge (if recommended)
  - resume fit % + personality fit %
  - skills chips/list
  - optional bio section
  - optional resume link
- Close interactions:
  - close button
  - click backdrop
  - `Escape` key
- Maintain existing applicant list behavior.

---

## 6) Frontend Types + Styles

### File: `frontend/src/types/index.ts`
- Ensure `Applicant` typing supports all fields used by:
  - `EditProfile.tsx`
  - Recruit detail modal (`bio`, `resumeUrl`, fit fields, etc.)

### File: `frontend/src/index.css`
Add/keep profile page style classes:

- `.jh-profile-container`
- `.jh-profile-card`
- `.jh-profile-resume-row`

Use project styling tokens and existing spacing/visual conventions.

### File: `frontend/.env.example`
Ensure frontend env docs include:

- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_PUBLISHABLE_KEY=...`

---

## 7) Validation Checklist (must pass)

1. Frontend launches without white screen.
2. Visiting `/profile/edit` renders form.
3. Save creates applicant when missing.
4. Save updates applicant when existing.
5. Resume upload works after save.
6. Resume delete works.
7. Recruit page: click applicant opens modal.
8. Modal closes by button, backdrop, and Escape.
9. TypeScript build passes for frontend.
10. Backend serves `/api/applicant` routes without runtime errors.

---

## 8) Files Allowed To Change

- `backend/package-lock.json`
- `backend/package.json`
- `backend/src/index.ts`
- `backend/src/routes/applicant.ts`
- `backend/src/types/index.ts`
- `frontend/.env.example`
- `frontend/package-lock.json`
- `frontend/src/App.tsx`
- `frontend/src/components/Layout.tsx`
- `frontend/src/index.css`
- `frontend/src/lib/applicantApi.ts`
- `frontend/src/pages/EditProfile.tsx`
- `frontend/src/pages/Recruit.tsx`
- `frontend/src/types/index.ts`

Do not modify other files unless explicitly required by latest `main`.