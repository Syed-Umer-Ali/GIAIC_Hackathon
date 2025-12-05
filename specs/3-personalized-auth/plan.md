# Implementation Plan: Personalized Auth & Adaptive Learning

**Branch**: `3-personalized-auth` | **Date**: 2025-12-02 | **Spec**: [specs/3-personalized-auth/spec.md](../spec.md)
**Input**: Feature specification from `specs/3-personalized-auth/spec.md`

## Summary

Implement a personalized learning experience by adding a specialized signup flow ("the twist") and an AI-driven content adaptation engine.

**Core Components:**
1.  **Auth Service (Node.js)**: Utilizes **Better Auth** to handle user registration and capture custom profile data (Proficiency, Background, Language).
2.  **Personalization Engine (FastAPI)**: An AI service that accepts original chapter content and rewrites it based on the authenticated user's profile stored in the shared database.
3.  **Frontend (Docusaurus)**: Adds a "Personalized View" toggle to documentation pages, fetching adapted content on-demand.

## Technical Context

**Language/Version**:  
- **Frontend**: TypeScript 5.x (Docusaurus)
- **Auth Service**: Node.js 18+ / TypeScript (Better Auth)
- **Backend**: Python 3.10+ (FastAPI)

**Primary Dependencies**:  
- **Auth**: `better-auth` (Node.js), `better-auth/react` (Frontend)
- **Backend**: `fastapi`, `openai` (or equivalent LLM SDK), `asyncpg`/`sqlalchemy` (DB Access)
- **DB**: Neon Serverless Postgres (Shared between Auth and Backend)

**Storage**:  
- **PostgreSQL**: Stores User accounts, Sessions, and Personalization Attributes.

**Testing**:  
- **Frontend**: Jest / React Testing Library
- **Backend**: Pytest
- **Auth**: Vitest (if needed for custom plugins)

**Target Platform**:  
- **Web**: Vercel (Frontend/Auth) / Render (Backend) - Hybrid deployment.

## Constitution Check

*GATE: Passed*

- **I. AI/SDD**: Plan leverages AI for the core feature (personalization engine).
- **II. Docusaurus-First**: Feature is integrated directly into the Docusaurus UI.
- **III. Context-Aware RAG**: Complementary to RAG; shares the "context-aware" philosophy.
- **VI. Robust Tech Stack**: Explicitly uses Better Auth, FastAPI, and Neon as mandated in v0.4.0.
- **VII. Personalized & Adaptive**: This plan implements this principle directly.

## Project Structure

### Documentation (this feature)

```text
specs/3-personalized-auth/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
physical-ai-book/ (Frontend)
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   └── PersonalizationToggle/
│   └── lib/
│       └── auth-client.ts

backend/ (Personalization Engine)
├── app/
│   ├── models/
│   ├── services/
│   └── api/
│       └── endpoints/
│           └── personalization.py

auth-service/ (NEW - Node.js Auth)
├── src/
│   ├── auth.ts (Better Auth Config)
│   └── server.ts (Express/Hono adapter)
├── package.json
└── tsconfig.json
```

**Structure Decision**: A micro-service approach is chosen. `auth-service` handles authentication logic (TypeScript), `backend` handles AI logic (Python), and `physical-ai-book` serves the UI. They share the Postgres database for user context.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 3rd Service (Auth) | Better Auth is TypeScript-only for the server, while our AI backend is Python. | Re-writing Auth in Python (no Better Auth) violates Constitution. Using Next.js for everything replaces Docusaurus (violates Constitution). |
