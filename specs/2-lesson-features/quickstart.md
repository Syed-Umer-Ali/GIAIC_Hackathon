# Quickstart: Lesson Features

How to verify and test the new Lesson Tabs (Summary, Language, Assessment).

## Prerequisites

1. **Backend Running**: Ensure FastAPI is running (`uvicorn app.main:app --reload`).
2. **Frontend Running**: Ensure Docusaurus is running (`npm start`).
3. **Env Vars**: `OPENAI_API_KEY` and `DATABASE_URL` must be set in `.env`.

## Testing the API (Backend)

You can test the endpoints via Swagger UI at `http://localhost:8000/docs`.

### 1. Generate Summary
- **Endpoint**: `GET /api/features/summary`
- **Params**: `slug=01-ros2/fundamentals` (or any valid doc path relative to `docs/`)
- **Expect**: JSON with `summary` and `key_takeaways`. First request takes ~5-10s, second request (cached) <1s.

### 2. Translate Content
- **Endpoint**: `GET /api/features/translate`
- **Params**: `slug=01-ros2/fundamentals`, `target_language=roman_urdu`
- **Expect**: JSON with `translated_markdown`.

### 3. Generate Quiz
- **Endpoint**: `GET /api/features/quiz`
- **Params**: `slug=01-ros2/fundamentals`
- **Expect**: JSON with 5 questions.

## Testing the UI (Frontend)

1. Open any lesson page (e.g., `http://localhost:3000/docs/intro`).
2. You should see 3 tabs below the title: **Summary**, **Language**, **Assessment**.
3. **Summary Tab**:
   - Click it.
   - Spinner appears.
   - Summary loads.
4. **Language Tab**:
   - Click it.
   - Select "Roman Urdu".
   - Page content should update to Roman Urdu text.
5. **Assessment Tab**:
   - Click it.
   - Quiz loads.
   - Select answers and verify feedback.
