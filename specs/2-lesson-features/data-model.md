# Data Model: Lesson Features

**Feature**: Lesson Tabs (Summary, Multi-Language, Assessment)

## Database Schema (Postgres)

### Table: `lesson_cache`

Stores generated content to avoid repeated API calls to OpenAI.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | Primary Key | Unique identifier |
| `slug` | VARCHAR(255) | NOT NULL, Index | Path/ID of the lesson (e.g., `01-ros2/fundamentals`) |
| `feature_type` | VARCHAR(50) | NOT NULL | `summary`, `translation`, `quiz` |
| `params` | JSONB | NULL | Extra params (e.g., `{"language": "roman_urdu"}`) |
| `content` | TEXT | NOT NULL | The generated JSON or Markdown content |
| `created_at` | TIMESTAMP | DEFAULT NOW() | When this was generated |
| `source_hash` | VARCHAR(64) | NULL | Hash of original markdown file (for invalidation) |

## Domain Entities (Pydantic Models)

### 1. Summary Response

```python
class LessonSummary(BaseModel):
    summary: str = Field(..., description="A concise paragraph summarizing the lesson")
    key_takeaways: List[str] = Field(..., description="List of 3-5 key bullet points")
```

### 2. Quiz Response

```python
class QuizOption(BaseModel):
    id: str
    text: str

class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[QuizOption]
    correct_option_id: str
    explanation: str

class LessonQuiz(BaseModel):
    questions: List[QuizQuestion]
```

### 3. Translation Response

```python
class LessonTranslation(BaseModel):
    translated_markdown: str = Field(..., description="Full markdown content in target language")
    language: str
```

### 4. API Requests

```python
class TranslationRequest(BaseModel):
    slug: str
    target_language: str = Field(..., description="One of: roman_urdu, urdu, hindi, spanish, etc.")

class FeatureRequest(BaseModel):
    slug: str
```
