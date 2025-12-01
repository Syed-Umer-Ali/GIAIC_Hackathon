# Research: Lesson Tabs Feature

**Feature**: Lesson Tabs (Summary, Multi-Language, Assessment)
**Status**: Research Complete

## 1. Docusaurus Swizzling Strategy

**Decision**: Swizzle `DocItem` component using `--wrap` or manual component replacement in `src/theme/DocItem`.
**Rationale**: We need to inject UI (Tabs) *above* the main content but *below* the title/metadata, or simply wrap the entire content area. The safest and most standard way in Docusaurus v2+ is to swizzle the `DocItem/Layout` or creating a wrapper around `DocItem`.
**Implementation Detail**:
- We will create `src/theme/DocItem/index.tsx` (or `layout.tsx` depending on exact swizzle target).
- This component will maintain the original `DocItem` behavior but insert our `<LessonTabs />` component at the top.
- This ensures we don't break the existing TOC, sidebar, or metadata handling.

## 2. Backend Content Retrieval

**Decision**: Read Markdown files directly from the filesystem (`physical-ai-book/docs`) on demand using the slug.
**Rationale**:
- The project uses file-based content as the source of truth.
- We don't want to duplicate full lesson content into the database; we only cache the *generated* artifacts (summaries, translations).
- The `ingest.py` script already demonstrates how to parse these files. We will extract a shared utility `get_markdown_content(slug: str) -> str` to be used by both the ingestion script and the new API endpoints.

## 3. Caching Strategy

**Decision**: Use Neon Serverless Postgres for caching generated content.
**Rationale**:
- **Constitution Principle VI** mandates using Neon Postgres.
- AI generation is slow and costly; caching is critical (Requirement FR-007).
- Schema: `lesson_cache` table with `slug`, `feature_type`, `params` (e.g., target_language), `content`, `created_at`.
- **Expiration**: We can implement simple "never expire" for now, or expire if the markdown file's modification time is newer than `created_at` (advanced optimization, for now manual invalidation or simple time-based is fine).

## 4. AI Service Integration

**Decision**: Extend `app/services/openai.py` to add specific methods for this feature.
**Rationale**:
- Reusing the existing OpenAI client setup ensures consistency.
- Methods needed:
    - `generate_summary(text)`
    - `generate_quiz(text)`
    - `translate_content(text, target_lang)` (Must use specific system prompt to preserve Markdown syntax).

## 5. Frontend-Backend Communication

**Decision**: Fetch on Tab Activation (Lazy Loading).
**Rationale**:
- **Performance**: We shouldn't generate summary/quiz/translation for *every* lesson on page load. Only when the user clicks the tab.
- **UX**: Show a loading spinner inside the tab content area.
- **State**: Use React Query (or simple `useEffect` + `useState`) to manage the async data fetching and local caching state.
