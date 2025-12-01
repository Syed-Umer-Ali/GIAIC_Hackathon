# Feature Specification: Lesson Tabs (Summary, Multi-Language, Assessment)

**Feature Branch**: `2-lesson-features`  
**Created**: 2025-12-01  
**Status**: Draft  
**Input**: User description: "Implement Lesson Tabs: Summary, Multi-Language, Assessment"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Lesson Summary Generation (Priority: P1)

As a student, I want to see a concise summary and key takeaways of the current lesson so that I can quickly grasp the main concepts before or after reading.

**Why this priority**: This provides immediate value and establishes the core pattern for the tabbed interface and AI integration.

**Independent Test**: Can be fully tested by navigating to a lesson page, clicking the "Summary" tab, and verifying that a relevant summary and key takeaways appear.

**Acceptance Scenarios**:

1. **Given** a user is on a lesson page, **When** they click the "Summary" tab, **Then** the tab content loads with a spinner.
2. **Given** the summary is loading, **When** the backend returns the data, **Then** the spinner is replaced by a text summary and a bulleted list of key takeaways.
3. **Given** a summary has been generated previously, **When** the user returns to the tab, **Then** the cached summary is displayed instantly.

---

### User Story 2 - Multi-Language Translation (Priority: P2)

As a student fluent in other languages (especially Roman Urdu), I want to read the lesson content in my preferred language so that I can understand complex topics more easily.

**Why this priority**: This addresses a key accessibility and localization requirement (Constitution Principle V) and significantly expands the potential user base.

**Independent Test**: Can be tested by selecting a language from the dropdown and verifying the text changes to the target language while preserving formatting.

**Acceptance Scenarios**:

1. **Given** the "Language" tab is active, **When** the user clicks the language dropdown, **Then** a list of 10 supported languages (Roman Urdu at top) is displayed.
2. **Given** a language is selected (e.g., Roman Urdu), **When** the translation is requested, **Then** the page content is replaced by the translated text, maintaining code blocks and images.
3. **Given** a translation request fails, **When** the error occurs, **Then** a user-friendly error message is displayed with a "Retry" button.

---

### User Story 3 - Interactive Assessment (Priority: P3)

As a student, I want to take a short quiz based on the lesson content so that I can self-assess my understanding.

**Why this priority**: This transforms passive reading into active learning, reinforcing the material.

**Independent Test**: Can be tested by clicking "Assessment", completing the generated quiz, and seeing the score/feedback.

**Acceptance Scenarios**:

1. **Given** the "Assessment" tab is active, **When** the tab loads, **Then** a 5-question MCQ quiz is generated and displayed.
2. **Given** the user answers a question, **When** they select an option, **Then** they receive immediate feedback (Correct/Incorrect) with an explanation.
3. **Given** the quiz is complete, **When** all questions are answered, **Then** a final score is displayed.

---

### Edge Cases

- What happens when the AI service is down? (Graceful degradation with error messages)
- What happens if the lesson content is empty or too short for summary/quiz? (Display appropriate message)
- How does the system handle large markdown files that exceed token limits? (Chunking or truncation strategy needed in backend)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a 3-tab interface on every lesson page: Summary, Language, Assessment.
- **FR-002**: The "Summary" tab MUST display an AI-generated summary and key takeaways for the current lesson.
- **FR-003**: The "Language" tab MUST provide a dropdown with 10 specific languages: Roman Urdu (default/top), Urdu, Hindi, Spanish, French, German, Arabic, Chinese, Japanese, Russian.
- **FR-004**: Selecting a language MUST translate the markdown content of the lesson while preserving code blocks, images, and structural formatting.
- **FR-005**: The "Assessment" tab MUST generate a 5-question Multiple Choice Quiz (MCQ) based on the lesson content.
- **FR-006**: The Assessment interface MUST provide immediate feedback (correct/incorrect) and a final score.
- **FR-007**: Generated content (Summary, Quiz, Translations) SHOULD be cached to improve performance and reduce API costs.
- **FR-008**: The UI MUST indicate loading states during AI generation processes.

### Key Entities

- **LessonContent**: Represents the original markdown content of a lesson.
- **LessonSummary**: Stores the generated summary and key points, linked to a specific lesson version.
- **LessonTranslation**: Stores the translated markdown content for a specific lesson and language.
- **LessonQuiz**: Represents a generated set of questions and answers for a lesson.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can access a lesson summary within 5 seconds (cached) or 15 seconds (first generation).
- **SC-002**: Translation requests preserve 100% of code blocks and image links in the output.
- **SC-003**: 90% of generated quizzes contain 5 valid questions with one correct answer each.
- **SC-004**: User engagement (time on page) increases by 15% with the interactive tabs (simulated/estimated).
