---
description: "Task list for Personalized Auth & Adaptive Learning"
---

# Tasks: Personalized Auth & Adaptive Learning

**Input**: Design documents from `specs/3-personalized-auth/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md

**Tests**: Tests are included where applicable for backend logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: [US1] Intelligent Onboarding, [US2] Adaptive Content, [US3] Profile Management

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `auth-service` directory and initialize Node.js/TypeScript project in `auth-service/package.json`
- [x] T002 Install Better Auth and dependencies in `auth-service` (better-auth, express/hono, pg, dotenv) in `auth-service/package.json`
- [x] T003 Configure shared Postgres connection in `auth-service/.env` and `backend/.env`
- [x] T004 Install `better-auth` client and `asyncpg` in `physical-ai-book` and `backend` respectively

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Define Better Auth schema with "Twist" fields (proficiency, background, language) in `auth-service/src/auth.ts`
- [x] T006 Create database migration/setup script to initialize User and Session tables in `auth-service/src/db/schema.ts`
- [x] T007 Implement basic Express/Hono server to mount Better Auth routes in `auth-service/src/server.ts`
- [x] T008 [P] Configure Docusaurus to use a custom Auth Provider/Context in `physical-ai-book/src/components/Auth/AuthProvider.tsx`
- [x] T009 [P] Create SQLAlchemy/Pydantic models for User reading in `backend/app/models/user.py`

**Checkpoint**: Auth service runs, DB has schema, Frontend has Auth Context context, Backend can map DB tables.

---

## Phase 3: User Story 1 - Intelligent Onboarding (Priority: P1) 🎯 MVP

**Goal**: Users sign up and provide their learning profile (The Twist).

**Independent Test**: Verify a new user is created in DB with `proficiency` set to 'beginner'.

### Implementation for User Story 1

- [x] T010 [P] [US1] Implement "The Twist" Signup Form component in `physical-ai-book/src/components/Auth/TwistSignup.tsx`
- [x] T011 [US1] Integrate Better Auth Client `signUp.email` with `additionalFields` in `physical-ai-book/src/lib/auth-client.ts`
- [x] T012 [US1] Create Onboarding Modal that triggers if user profile is incomplete in `physical-ai-book/src/components/Auth/OnboardingModal.tsx`
- [x] T013 [US1] Add logic to check profile completeness on login in `physical-ai-book/src/components/Auth/AuthProvider.tsx`

**Checkpoint**: User can sign up, enter details, and data is persisted in Postgres.

---

## Phase 4: User Story 2 - Adaptive Content View (Priority: P2)

**Goal**: Users can toggle a "Personalized" view that rewrites content using AI.

**Independent Test**: Toggling the view calls the API and streams text back.

### Implementation for User Story 2

- [x] T014 [P] [US2] Create Personalization Service logic (OpenAI streaming) in `backend/app/services/personalization.py`
- [x] T015 [US2] Implement `/api/personalize` endpoint in `backend/app/api/endpoints/personalization.py`
- [x] T016 [US2] Add Session Verification logic (read DB cookie) in `backend/app/core/auth_utils.py`
- [x] T017 [P] [US2] Create `PersonalizationToggle` UI component in `physical-ai-book/src/components/PersonalizationToggle/index.tsx`
- [x] T018 [US2] Create `PersonalizedContent` component that fetches stream and renders markdown in `physical-ai-book/src/components/PersonalizedContent/index.tsx`
- [x] T019 [US2] Swizzle or Wrap Docusaurus `DocItem` to conditionally render `PersonalizedContent` in `physical-ai-book/src/theme/DocItem/index.js` (or similar)

**Checkpoint**: Backend streams AI text based on user profile; Frontend renders it over original content.

---

## Phase 5: User Story 3 - Profile Management (Priority: P3)

**Goal**: Users can update their proficiency/settings.

**Independent Test**: Updating settings via UI reflects in DB and changes next personalization result.

### Implementation for User Story 3

- [x] T020 [P] [US3] Create Profile Settings Page in `physical-ai-book/src/pages/profile.tsx`
- [x] T021 [US3] Connect Profile Form to Better Auth `updateUser` client method in `physical-ai-book/src/pages/profile.tsx`
- [x] T022 [US3] Add toast notifications for success/failure in `physical-ai-book/src/pages/profile.tsx`

**Checkpoint**: Full loop: Signup -> Personalize -> Update Profile -> Re-personalize.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T023 [P] Add Loading Skeletons for personalized content in `physical-ai-book/src/components/PersonalizedContent/Skeleton.tsx`
- [x] T024 Improve Error Handling (Quota exceeded, Service Down) in `physical-ai-book/src/components/PersonalizedContent/index.tsx`
- [x] T025 Verify mobile responsiveness of the Toggle and Twist Form
- [x] T026 Run verification steps from `specs/3-personalized-auth/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001-T004.
- **User Story 1 (P1)**: Depends on T005-T009.
- **User Story 2 (P2)**: Depends on US1 (needs user profile data in DB).
- **User Story 3 (P3)**: Depends on US1 (needs user existence).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement US1 (Signup + Twist).
3. Verify DB has correct data.
4. **Stop**.

### Full Feature

1. Complete MVP.
2. Implement US2 (The AI Reader).
3. Implement US3 (Settings).
4. Polish.
