# Research & Decisions: Personalized Auth

## 1. Auth Architecture with Python Backend

**Problem**: We need to use **Better Auth** (as per Constitution) which is a TypeScript library, but our main logic backend is **FastAPI (Python)**. Docusaurus is a static site (SPA navigation) which cannot host long-running Node processes easily without a "Server" component.

**Research**:
- Better Auth runs on Node.js/Bun/Cloudflare Workers.
- It manages the database schema (User, Session, Account, etc.) automatically.
- It provides a client library (`better-auth/react`) for the frontend.

**Decision**: **Shared Database Pattern**.
- Create a standalone `auth-service` (Node.js) that runs Better Auth.
- Both `auth-service` and `backend` (FastAPI) connect to the **same Neon Postgres database**.
- **Flow**:
    1. User logs in via Frontend -> talks to `auth-service`.
    2. `auth-service` creates a session in Postgres and sets a cookie.
    3. Frontend calls `backend` (`/api/personalize`) with the cookie.
    4. `backend` reads the Session ID from the cookie.
    5. `backend` queries the `session` and `user` tables in Postgres directly to verify the session and fetch user attributes (`proficiency`, etc.).

**Rationale**: This avoids complex token signing/sharing protocols. The database is the source of truth. Better Auth manages the write/schema, FastAPI just reads for verification.

**Alternatives Considered**:
- *JWT with Shared Secret*: Better Auth issues JWTs, FastAPI verifies them. (Viable, but Better Auth defaults to secure sessions. DB lookup is robust for checking revocation).

## 2. Personalization Latency

**Problem**: AI rewriting of a whole chapter can be slow (10s+).
**Decision**: **Streaming Response**.
- FastAPI endpoint will stream the personalized text as it's generated.
- Docusaurus Frontend will use a streaming reader to display text incrementally.

**Rationale**: Improves perceived performance (Time To First Token) significantly compared to waiting for the full chapter.

## 3. Handling "The Twist" (Custom Fields)

**Problem**: Standard Better Auth user schema is fixed.
**Decision**: **Better Auth `additionalFields`**.
- We will configure Better Auth to add `proficiency`, `background`, `language` to the `user` table schema.
- This ensures type safety in the TS service and automatic column creation in Postgres.

## 4. Frontend Integration

**Problem**: Docusaurus uses MDX. How to swap content?
**Decision**: **React Context + Swizzled Root**.
- We will create a `PersonalizationContext` that holds the user's "View Mode" (Original vs. Personalized).
- We will likely wrap the `DocItem` component or inject a component that can "hide" the original MDX content and show the fetched AI text when the toggle is active.
- *Fallback*: If complex Swizzling is risky, we will inject a "Floating Action Button" that opens a "Personalized Reader" overlay/modal. **Refined**: Let's try an "In-Page Replacement" first by mounting a React component at the top of the doc that can conditionally overlay the content.

**Selected Approach**: "Overlay/Replacement". The personalized view will be a React component that fetches data and renders it, effectively "covering" the static MDX when active.
