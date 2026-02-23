# Product Requirements Document (PRD)

## Product
- Name: Planboard
- Type: Web application (Next.js App Router)
- Primary users: K-12 teachers
- Current status: Implemented MVP with Supabase-backed persistence for activities, saves, and ratings

## 1. Product Overview
Planboard helps teachers generate classroom-ready activities from lesson context.

Current implemented experience:
- Authentication with Supabase Auth (email/password)
- 3-step generation wizard
- Streaming AI generation (4 activities per run)
- Resource URL validation pass
- Activity persistence to Supabase
- Marketplace browsing of public activities
- Save/unsave to personal binder
- Ratings and review text per activity (upsert)
- Library management (own activities + saved activities)
- Delete own generated activities

## 2. Problem Statement
Teachers need fast, high-quality, context-aware activity plans. Manual planning is time-consuming and inconsistent across grade levels and subjects.

Planboard shortens planning time by producing structured, actionable activity blueprints aligned to teacher input.

## 3. Goals
- Reduce time required to create classroom activities.
- Produce age-appropriate and subject-relevant plans.
- Provide implementation-ready detail (materials, phases, evaluation, reflection).
- Enable discovery and reuse through a shared marketplace and personal binder.
- Capture rating feedback to surface quality signals.

## 4. Non-Goals (Current Scope)
- LMS integrations (Google Classroom, Canvas)
- Collaborative editing/workspaces
- Standards mapping and curriculum import
- Advanced analytics/admin dashboards
- Multi-language localization

## 5. Primary User Flows
### 5.1 Auth
1. User registers on `/register` (Supabase `signUp` with profile metadata name).
2. User signs in on `/login` (Supabase `signInWithPassword`).
3. Middleware redirects unauthenticated users from protected routes (`/wizard`, `/library`, `/rate`) to login.

### 5.2 Activity Generation
1. Step 1 (`/wizard/step-1`): choose grade level + subject.
2. Step 2 (`/wizard/step-2`): choose activity type + enter lesson info and learning objectives.
3. Step 3 (`/wizard/step-3`): auto-calls `/api/generate`.
4. Client reads text stream, extracts JSON, maps result to local `Activity[]`.
5. Client calls `/api/validate-urls` and removes invalid resource links from rendering.
6. Client calls `/api/activities/persist` to store generation request + activities.
7. If persistence succeeds, temporary generated IDs are replaced with DB UUIDs.
8. If persistence fails, generated activities still remain usable in session state.

### 5.3 Browse, Save, Rate, Manage
1. Marketplace (`/marketplace`) lists public activities with filters/sorting/search.
2. Detail (`/marketplace/[id]`) shows full activity content, aggregate ratings, and reviews.
3. Logged-in users can toggle save via `/api/activities/[id]/save`.
4. Logged-in users can submit/update rating via `/api/ratings`.
5. Library (`/library`) shows:
   - My Activities (created by user)
   - Saved (bookmarked marketplace activities)
6. User can delete owned activities via `DELETE /api/activities/[id]`.

## 6. Functional Requirements (Implemented)
### FR-1 Authentication and Access Control
- Email/password register and login via Supabase.
- Middleware session refresh on all routes.
- Protected route enforcement for wizard, library, and rating pages.
- Authenticated users are redirected away from `/login` and `/register` to `/wizard/step-1`.

### FR-2 Wizard Input Collection
- Step 1 requires grade level and subject.
- Step 2 requires activity type + both text fields with minimum 10 characters.
- Wizard state persists in browser session storage through Zustand `persist`.

### FR-3 AI Generation
- `POST /api/generate` validates request with Zod (`generateSchema`).
- Server streams model output from OpenAI (`gpt-4o`) using AI SDK.
- Prompt instructs exactly 4 activities and a strict JSON structure.

### FR-4 URL Validation
- `POST /api/validate-urls` performs HEAD checks with timeout.
- Invalid URLs are removed from displayed resources while preserving titles.

### FR-5 Persistence
- `POST /api/activities/persist` requires authenticated user.
- Stores one `generation_requests` row and many `activities` rows.
- Activities are stored as public (`is_public: true`) for marketplace discovery.

### FR-6 Marketplace and Library
- Marketplace supports filter by grade and subject, plus sort modes:
  - newest
  - highest_rated
  - most_rated
- Marketplace pulls rating aggregates from `activity_stats` view.
- Library supports text search across title/summary/category and tabs for own vs saved.

### FR-7 Save/Unsave
- `POST /api/activities/[id]/save` toggles saved state in `saves` table for the current user.

### FR-8 Ratings
- `POST /api/ratings` validates with Zod and upserts by `(user_id, activity_id)`.
- `GET /api/ratings?activityId=...` returns current user’s existing rating when logged in.
- Required metrics: suitability, goalAchievement, recommendation (1-5).
- Optional: overallRating, reviewText, comment.

### FR-9 Activity Detail Usability
- Detail views render structured sections:
  - overview
  - research & preparation
  - format/materials
  - phased structure
  - evaluation/rubric
  - reflection questions
  - resources
  - differentiation
- Wizard detail page includes local teacher notes saved in `localStorage`.

### FR-10 Deletion
- `DELETE /api/activities/[id]` only allows owner deletion.
- API verifies ownership before delete and returns `403` if user is not owner.

## 7. Data Model (Current)
Core tables:
- `profiles` (user profile mirrored from `auth.users`)
- `generation_requests`
- `activities`
- `ratings`
- `saves`

Derived view:
- `activity_stats` (rating count + averaged rating metrics per activity)

Key constraints:
- Ratings unique per user/activity
- Saves unique per user/activity
- Foreign keys with cascade deletes from parent records

## 8. Security and Access
- Supabase row-level security policies are defined in initial migration.
- Public read access for public activities and ratings aggregate use cases.
- User-scoped write access for own requests, activities, ratings, and saves.
- Service-role client is used in `POST /api/activities/persist` for insertion workflow.

## 9. Non-Functional Requirements
### Performance
- Generation UX targets initial feedback quickly and completion around 10-20 seconds.
- Marketplace query capped to latest 50 matching public activities.

### Reliability
- Zod validation errors returned for invalid generate/rating payloads.
- Generation flow has retry path in wizard UI.
- Persistence failure does not block local session usage.

### Usability
- Linear wizard progression with guard redirects.
- Responsive UI across desktop/mobile.
- Explicit empty states for library and generation errors.

## 10. API Surface (Current)
- `POST /api/generate`
  - Input: generation context
  - Output: streamed text response from model
- `POST /api/validate-urls`
  - Input: `{ urls: string[] }`
  - Output: `{ valid: string[] }`
- `POST /api/activities/persist`
  - Auth required
  - Input: generation metadata + activities
  - Output: `{ generationRequestId, activities }`
- `POST /api/activities/[id]/save`
  - Auth required
  - Output: `{ saved: boolean }`
- `DELETE /api/activities/[id]`
  - Auth + ownership required
  - Output: `{ deleted: true }`
- `POST /api/ratings`
  - Auth required
  - Upserts rating
- `GET /api/ratings?activityId=<uuid>`
  - Returns current user rating (if present)

## 11. Current Product Surfaces
- `/` landing page
- `/login`, `/register`
- `/wizard/step-1`, `/wizard/step-2`, `/wizard/step-3`
- `/wizard/step-3/[activityId]`
- `/marketplace`
- `/marketplace/[id]`
- `/library`
- `/rate/[activityId]`
- `/dashboard` (redirects to `/library`)

## 12. Known Gaps and Risks
- `/api/generate` enforces input schema but does not server-validate AI output schema before client parse.
- Stream parsing on the client relies on extracting JSON text from model output.
- URL validation uses HEAD; some valid resources may reject HEAD requests.
- Marketplace currently assumes all persisted activities are public by default.
- No explicit rate limiting for generation or rating endpoints.

## 13. Success Metrics (Recommended Tracking)
- Wizard completion rate (step 1 to generated results)
- Generation success/failure rate
- Time-to-first-activity and full generation duration
- Persist success rate
- Save rate (per marketplace view)
- Rating completion rate
- Average overall rating and review volume per activity

## 14. Next Iteration Priorities
1. Add server-side schema validation/parsing for AI response before returning/accepting results.
2. Add optional visibility controls (`is_public`) during or after generation.
3. Add pagination and richer filters in marketplace/library.
4. Add endpoint rate limiting and observability instrumentation.
5. Add analytics event pipeline for funnel and quality metrics.
