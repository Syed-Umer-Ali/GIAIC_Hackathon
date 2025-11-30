# Tasks: Book Chapter Content Organization

**Input**: Design documents from `/specs/1-book-chapter-content/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit test tasks requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths assume the Docusaurus project root is `physical-ai-book/` and content goes into `physical-ai-book/docs/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Minimal setup as Docusaurus project is assumed to be functional.

- [X] T001 Verify `physical-ai-book/` directory exists and contains a Docusaurus project.

- [X] T001.1 Create and populate `physical-ai-book/docs/preface.md` with book preface content.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Docusaurus content structure creation before populating specific content.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create directory `physical-ai-book/docs/01-ros2-robot-operating-system/`
- [X] T004 Create directory `physical-ai-book/docs/02-digital-twin-simulation/`
- [X] T005 Create directory `physical-ai-book/docs/03-nvidia-isaac-platform/`
- [X] T006 Create directory `physical-ai-book/docs/04-vision-language-action/`
- [X] T007 [P] Update `physical-ai-book/docs/intro.md` with Course Introduction content from `Hackathon_ Physical AI & Humanoid Robotics Textbook.md`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Instructor Course Overview (P1) 🎯 MVP

**Goal**: Enable instructors to view the overall course structure and module overviews.

**Independent Test**: Navigate the Docusaurus sidebar and content to confirm the presence and logical flow of all modules and their `index.md` overview pages.

### Implementation for User Story 1

- [X] T009 [P] [US1] Create and populate `physical-ai-book/docs/01-ros2-robot-operating-system/ros2-overview.md` with an overview for ROS 2 module.
- [X] T010 [P] [US1] Create and populate `physical-ai-book/docs/02-digital-twin-simulation/digital-twin-overview.md` with an overview for Digital Twin Simulation module.
- [X] T011 [P] [US1] Create and populate `physical-ai-book/docs/03-nvidia-isaac-platform/nvidia-isaac-overview.md` with an overview for NVIDIA Isaac Platform module.
- [X] T012 [P] [US1] Create and populate `physical-ai-book/docs/04-vision-language-action/vla-overview.md` with an overview for Vision-Language-Action module.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Student Learning Path (P1)

**Goal**: Enable students to navigate and learn through detailed lessons within each chapter.

**Independent Test**: Select any module, navigate through all its lessons, and verify that each lesson's content is present and comprehensive.

### Implementation for User Story 2

- [X] T011 [P] [US2] Create and populate `physical-ai-book/docs/01-ros2-robot-operating-system/1-ros2-fundamentals.md` with content from Week 3-5 of hackathon MD file.
- [X] T012 [P] [US2] Create and populate `physical-ai-book/docs/01-ros2-robot-operating-system/2-nodes-topics-services.md` with content from ROS 2 module focus.
- [X] T013 [P] [US2] Create and populate `physical-ai-book/docs/01-ros2-robot-operating-system/3-building-packages-python.md` with content from ROS 2 module focus.
- [X] T014 [P] [US2] Create and populate `physical-ai-book/docs/01-ros2-robot-operating-system/4-urdf-humanoids.md` with content from ROS 2 module focus.
- [X] T015 [P] [US2] Create and populate `physical-ai-book/docs/02-digital-twin-simulation/1-gazebo-setup.md` with content from Week 6-7.
- [X] T016 [P] [US2] Create and populate `physical-ai-book/docs/02-digital-twin-simulation/2-physics-simulation.md` with content from Module 2 focus.
- [X] T017 [P] [US2] Create and populate `physical-ai-book/docs/02-digital-twin-simulation/3-simulating-sensors.md` with content from Module 2 focus.
- [X] T018 [P] [US2] Create and populate `physical-ai-book/docs/03-nvidia-isaac-platform/1-isaac-sdk-sim.md` with content from Week 8-10.
- [X] T019 [P] [US2] Create and populate `physical-ai-book/docs/03-nvidia-isaac-platform/2-ai-perception-manipulation.md` with content from Week 8-10.
- [X] T020 [P] [US2] Create and populate `physical-ai-book/docs/03-nvidia-isaac-platform/3-isaac-ros-vslam-nav.md` with content from Module 3 focus.
- [X] T021 [P] [US2] Create and populate `physical-ai-book/docs/03-nvidia-isaac-platform/4-rl-sim-to-real.md` with content from Week 8-10.
- [X] T022 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/1-humanoid-kinematics.md` with content from Week 11-12.
- [X] T023 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/2-bipedal-locomotion.md` with content from Week 11-12.
- [X] T024 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/3-manipulation-grasping.md` with content from Week 11-12.
- [X] T025 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/4-human-robot-interaction.md` with content from Week 11-12.
- [X] T026 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/5-conversational-ai.md` with content from Week 13.
- [X] T027 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/6-speech-recognition-nlu.md` with content from Week 13.
- [X] T028 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/7-voice-to-action.md` with content from Module 4 focus.
- [X] T029 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/8-cognitive-planning.md` with content from Module 4 focus.
- [X] T030 [P] [US2] Create and populate `physical-ai-book/docs/04-vision-language-action/9-capstone-project.md` with content from Module 4 focus (Capstone Project).

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Quick Reference for Specific Information (P2)

**Goal**: Provide easily accessible supplementary information about the hackathon and course.

**Independent Test**: Navigate directly to each supplementary document and verify its content.

### Implementation for User Story 3

- [C] T031 [P] [US3] Create and populate `physical-ai-book/docs/requirements.md` with Hackathon Requirements. (Cancelled: File deleted as per user request)
- [C] T032 [P] [US3] Create and populate `physical-ai-book/docs/timeline.md` with Hackathon Timeline. (Cancelled: File deleted as per user request)
- [X] T033 [P] [US3] Create and populate `physical-ai-book/docs/assessments.md` with Course Assessments.
- [X] T034 [P] [US3] Create and populate `physical-ai-book/docs/hardware-requirements.md` with Hardware Requirements.
- [X] T035 [P] [US3] Create and populate `physical-ai-book/docs/why-physical-ai-matters.md` with "Why Physical AI Matters" section.
- [X] T036 [P] [US3] Create and populate `physical-ai-book/docs/learning-outcomes.md` with Learning Outcomes.

**Checkpoint**: All user stories should now be independently functional

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Final review and verification of the organized content.

- [X] T037 Review all created content files for correct Markdown formatting and Docusaurus front matter.
- [X] T038 Verify navigation in the Docusaurus site reflects the intended chapter and lesson structure.
- [X] T039 Ensure all external links within the content are functional.
- [ ] T040 Run Docusaurus build command (`npm run build` in `physical-ai-book/`) to check for any build errors or warnings.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User Story 1 (P1), User Story 2 (P1), User Story 3 (P2) can proceed in parallel (if staffed) after Foundational phase.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No explicit dependencies on US1, but builds upon the module structure.
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories.

### Within Each User Story

- Content creation tasks are largely independent and can be parallelized within a story (marked with [P]).
- Creation of directories must precede file creation within them.

### Parallel Opportunities

- All tasks in Phase 2 can be parallelized (creating directories can be parallel for different modules, updating intro.md).
- Once Foundational phase completes, User Story 1, 2, and 3 can be worked on in parallel by different team members.
- Within each User Story, tasks marked [P] can run in parallel (e.g., populating different lesson files).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently. (Verify module overviews are present and navigable)
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!).
3. Add User Story 2 → Test independently → Deploy/Demo.
4. Add User Story 3 → Test independently → Deploy/Demo.
5. Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (Module overviews)
   - Developer B: User Story 2 (Detailed lessons)
   - Developer C: User Story 3 (Supplementary docs)
3. Stories complete and integrate independently.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
