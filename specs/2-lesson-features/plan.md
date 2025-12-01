# Implementation Plan: Lesson Tabs (Summary, Multi-Language, Assessment)

**Branch**: `2-lesson-features` | **Date**: 2025-12-01 | **Spec**: [specs/2-lesson-features/spec.md](specs/2-lesson-features/spec.md)
**Input**: Feature specification from `specs/2-lesson-features/spec.md`

## Summary

Implement a 3-tab interface (Summary, Language, Assessment) on every lesson page in the Docusaurus frontend. The "Summary" tab displays AI-generated key takeaways. The "Language" tab offers a dropdown to translate the lesson into 10 languages (prioritizing Roman Urdu) while preserving formatting. The "Assessment" tab generates a 5-question interactive quiz. All features are powered by new FastAPI endpoints backed by OpenAI and cached in Neon Postgres.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), TypeScript/React (Frontend)
**Primary Dependencies**: FastAPI, OpenAI SDK, Postgres (AsyncPG/SQLAlchemy), Docusaurus v2+
**Storage**: Neon Serverless Postgres (for Caching)
**Testing**: pytest (Backend)
**Target Platform**: Web (Docusaurus SPA + FastAPI REST API)
**Project Type**: Monorepo (Frontend + Backend)
**Performance Goals**: <5s for cached response, <15s for AI generation
**Constraints**: Free Tier limits (OpenAI, Neon, Render/Vercel)

## Constitution Check

*GATE: Passed*

- **Principle I (AI/SDD)**: Plan follows SDD artifacts (spec/plan/tasks) and uses AI for content generation.
- **Principle II (Docusaurus)**: Feature is implemented directly within Docusaurus theme (`DocItem`).
- **Principle III (RAG)**: While this isn't RAG *chat*, it uses context-aware generation (current lesson content).
- **Principle V (Interactive/Accessible)**: Directly implements the new requirements for interactivity and Roman Urdu support.
- **Principle VI (Tech Stack)**: Uses FastAPI, Neon, and OpenAI as mandated.

## Project Structure

### Documentation (this feature)

```text
specs/2-lesson-features/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code

```text
backend/
├── app/
│   ├── api/
│   │   └── features.py       # New endpoints
│   ├── core/
│   │   └── config.py         # Add cache settings
│   ├── db/
│   │   └── models.py         # Add LessonCache model
│   └── services/
│       ├── openai.py         # Add generation methods
│       └── content.py        # New service for file reading

physical-ai-book/
├── src/
│   ├── components/
│   │   ├── LessonTabs/       # New React Components
│   │   │   ├── index.tsx
│   │   │   ├── Summary.tsx
│   │   │   ├── Translator.tsx
│   │   │   └── Quiz.tsx
│   │   └── ...
│   └── theme/
│       └── DocItem/          # Swizzled Component
│           └── index.tsx
```

**Structure Decision**: Monorepo split. Backend logic in `backend/`, UI components in `physical-ai-book/src/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New Database Table | Caching AI responses | Re-generating on every request is too slow and expensive |
| Swizzling DocItem | Injecting UI into every lesson | Manually adding components to every MD file is unmaintainable |
