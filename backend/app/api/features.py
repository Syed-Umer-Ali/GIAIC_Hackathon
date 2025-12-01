from fastapi import APIRouter, HTTPException, Query
from app.services import openai, content
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Pydantic Models (matching data-model.md)
class LessonSummary(BaseModel):
    summary: str
    key_takeaways: List[str]

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

class LessonTranslation(BaseModel):
    translated_markdown: str
    language: str

@router.get("/summary", response_model=LessonSummary)
async def get_summary(slug: str):
    try:
        # TODO: Implement DB Caching here properly
        # For now, we will use a simple check if we had a DB session
        # db_session = db.get_session()
        # cached = db_session.query(LessonCache).filter(...).first()
        
        # 1. Read content
        text = content.get_markdown_content(slug)
        
        # 2. Generate summary
        result = await openai.generate_summary(text)
        
        return result
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Lesson not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/translate", response_model=LessonTranslation)
async def get_translation(slug: str, target_language: str):
    try:
        # TODO: Implement DB Caching here properly
        # if cached := check_cache(slug, "translation", {"language": target_language}):
        #     return cached
        
        text = content.get_markdown_content(slug)
        translated_text = await openai.translate_content(text, target_language)
        
        return {"translated_markdown": translated_text, "language": target_language}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Lesson not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/quiz", response_model=LessonQuiz)
async def get_quiz(slug: str):
    try:
        # TODO: Implement DB Caching here properly
        # if cached := check_cache(slug, "quiz"):
        #     return cached
        
        text = content.get_markdown_content(slug)
        result = await openai.generate_quiz(text)
        
        return result
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Lesson not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
