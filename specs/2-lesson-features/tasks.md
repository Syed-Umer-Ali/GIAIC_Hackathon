---

description: "Task list for Lesson Tabs feature implementation"
---

# Tasks: Lesson Tabs (Summary, Multi-Language, Assessment)

**Input**: Design documents from `specs/2-lesson-features/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Branch**: `2-lesson-features`

**Tests**: No explicit TDD requested, but functional testing steps included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend feature directory structure (api, services) in backend/app/
- [X] T002 Install or verify OpenAI and Neon dependencies in backend/requirements.txt
- [X] T003 [P] Create React component structure in physical-ai-book/src/components/LessonTabs/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define LessonCache DB model in backend/app/db/models.py
- [X] T005 Create database migration for lesson_cache table
- [X] T006 [P] Implement content reading service (get_markdown_content) in backend/app/services/content.py
- [X] T007 [P] Extend OpenAI service with generation stubs in backend/app/services/openai.py
- [X] T008 Swizzle DocItem component in physical-ai-book/src/theme/DocItem/index.tsx
- [X] T009 Create base API router for features in backend/app/api/features.py

**Checkpoint**: Foundation ready - Database schema exists, API router mounted, Frontend component swizzled.

---

## Phase 3: User Story 1 - Lesson Summary Generation (Priority: P1) 🎯 MVP

**Goal**: Users see a concise summary and key takeaways for the current lesson.

**Independent Test**: Navigate to lesson page, click Summary tab, verify summary content loads.

### Backend Implementation

- [X] T010 [US1] Implement generate_summary method in backend/app/services/openai.py
- [X] T011 [US1] Implement GET /api/features/summary endpoint in backend/app/api/features.py
- [X] T012 [US1] Add caching logic to summary endpoint (check DB first, then generate)

### Frontend Implementation

- [X] T013 [P] [US1] Create SummaryTab component in physical-ai-book/src/components/LessonTabs/Summary.tsx
- [X] T014 [P] [US1] Implement API fetch logic for summary in frontend
- [X] T015 [US1] Integrate SummaryTab into swizzled DocItem component

**Checkpoint**: Summary feature fully functional.

---

## Phase 4: User Story 2 - Multi-Language Translation (Priority: P2)

**Goal**: Users can view lesson content in 10 different languages, preserving formatting.

**Independent Test**: Select language from dropdown, verify translated text replaces original content.

### Backend Implementation

- [X] T016 [US2] Implement translate_content method in backend/app/services/openai.py with strict system prompt
- [X] T017 [US2] Implement GET /api/features/translate endpoint in backend/app/api/features.py
- [X] T018 [US2] Add caching logic to translation endpoint

### Frontend Implementation

- [X] T019 [P] [US2] Create LanguageSelector component in physical-ai-book/src/components/LessonTabs/Translator.tsx
- [X] T020 [P] [US2] Implement language state management (React Context or local state)
- [X] T021 [US2] Render translated markdown content conditionally in DocItem

**Checkpoint**: Translation feature fully functional.

---

## Phase 5: User Story 3 - Interactive Assessment (Priority: P3)

**Goal**: Users can take a 5-question quiz based on the lesson.

**Independent Test**: Click Assessment tab, complete quiz, see score.

### Backend Implementation

- [X] T022 [US3] Implement generate_quiz method in backend/app/services/openai.py (JSON output)
- [X] T023 [US3] Implement GET /api/features/quiz endpoint in backend/app/api/features.py
- [X] T024 [US3] Add caching logic to quiz endpoint

### Frontend Implementation

- [X] T025 [P] [US3] Create Quiz component (Questions + Scoring UI) in physical-ai-book/src/components/LessonTabs/Quiz.tsx
- [X] T026 [US3] Implement quiz state logic (answer selection, scoring)
- [X] T027 [US3] Integrate Quiz component into DocItem tabs

**Checkpoint**: Assessment feature fully functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T028 Add loading spinners/skeletons for all async states
- [X] T029 Handle API error states gracefully (e.g. "Failed to generate summary")
- [X] T030 [P] Verify Roman Urdu translation quality and adjust system prompt if needed
- [X] T031 Run quickstart.md validation steps manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all stories.
- **User Stories (Phase 3+)**: All depend on Foundational.
  - Can be executed in parallel if resources allow, but sequential P1 -> P2 -> P3 is recommended for stability.

### User Story Dependencies

- **US1 (Summary)**: Independent.
- **US2 (Translate)**: Independent.
- **US3 (Assessment)**: Independent.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement Summary Backend & Frontend.
3. Verify Summary works.
4. Deploy/Merge.

### Incremental Delivery

1. Add Translation (US2).
2. Add Quiz (US3).
3. Polish UX.
