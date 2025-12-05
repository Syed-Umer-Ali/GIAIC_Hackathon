import google.generativeai as genai
from app.models.user import User
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_personalized_content(original_content: str, user: User):
    """
    Streams personalized content based on user profile using Gemini.
    """
    
    proficiency = user.proficiency or "beginner"
    background = user.tech_background or "general"
    language = user.preferred_language or "python"
    
    prompt = f"""
    You are an expert technical tutor specializing in Physical AI.
    Rewrite the following content for a student with:
    - Proficiency: {proficiency}
    - Background: {background}
    - Preferred Language: {language}
    
    Keep the technical accuracy but adjust analogies, complexity, and code examples to match their profile.
    Use the student's preferred language for any code snippets if possible.
    Maintain the original structure (headings) where possible.

    ---
    Original Content:
    {original_content}
    """
    
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    # Gemini streaming
    response = model.generate_content(prompt, stream=True)
    
    for chunk in response:
        if chunk.text:
            yield chunk.text