from openai import AsyncOpenAI, OpenAI
from app.core.config import settings
from typing import AsyncGenerator

# Configure OpenAI clients to use Google Gemini via compatibility layer
aclient = AsyncOpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.OPENAI_BASE_URL
)

# Sync client for scripts
client = OpenAI(
    api_key=settings.GEMINI_API_KEY,
    base_url=settings.OPENAI_BASE_URL
)

# Gemini Embedding Model
EMBEDDING_MODEL = "text-embedding-004" 
# Gemini Chat Model (changed to models/gemini-2.5-flash as requested)
CHAT_MODEL = "models/gemini-2.5-flash"

async def get_embedding_async(text: str) -> list[float]:
    text = text.replace("\n", " ")
    response = await aclient.embeddings.create(
        input=[text],
        model=EMBEDDING_MODEL
    )
    return response.data[0].embedding

def get_embedding_sync(text: str) -> list[float]:
    text = text.replace("\n", " ")
    response = client.embeddings.create(
        input=[text],
        model=EMBEDDING_MODEL
    )
    return response.data[0].embedding

async def generate_response_stream(
    query: str, 
    context: str,
    model: str = CHAT_MODEL
) -> AsyncGenerator[str, None]:
    
    system_prompt = """You are a helpful teaching assistant for the 'Physical AI & Humanoid Robotics' textbook.
    
    Instructions:
    1. Answer the student's question using the provided TEXTBOOK CONTENT.
    2. If the user has selected text (SELECTED TEXT BY USER), prioritize explaining that specific text.
    3. If the answer is not explicitly in the context, try to answer generally based on your knowledge but mention it's not in the context.
    4. Keep answers concise, friendly, and educational.
    """

    user_prompt = f"""
    TEXTBOOK CONTENT:
    {context}
    
    STUDENT QUESTION: 
    {query}
    """

    # Print prompt for debugging (will show in server logs)
    print("--- LLM PROMPT ---")
    print(user_prompt[:500] + "...") 
    print("------------------")

    stream = await aclient.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        stream=True
    )

    async for chunk in stream:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content

async def generate_summary(text: str) -> dict:
    """
    Generates a summary and key takeaways for the given text.
    """
    system_prompt = """You are an expert educational summarizer. 
    Analyze the provided lesson content and return a JSON object with:
    1. 'summary': A concise paragraph summarizing the main concepts.
    2. 'key_takeaways': A list of 3-5 key bullet points.
    
    Keep it strictly based on the provided text.
    Return ONLY valid JSON.
    """
    
    response = await aclient.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"LESSON CONTENT:\n{text}"}
        ],
        response_format={"type": "json_object"}
    )
    
    import json
    return json.loads(response.choices[0].message.content)

async def generate_quiz(text: str) -> dict:
    """
    Generates a 5-question MCQ quiz for the given text.
    """
    system_prompt = """You are an assessment expert.
    Create a 5-question multiple choice quiz based on the provided lesson content.
    Return a JSON object with a 'questions' array.
    Each question object must have:
    - 'id': integer
    - 'question': string
    - 'options': array of objects {id: string, text: string}
    - 'correct_option_id': string
    - 'explanation': string (why the answer is correct)
    
    Return ONLY valid JSON.
    """
    
    response = await aclient.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"LESSON CONTENT:\n{text}"}
        ],
        response_format={"type": "json_object"}
    )
    
    import json
    return json.loads(response.choices[0].message.content)

async def translate_content(text: str, target_language: str) -> str:
    """
    Translates the markdown content to the target language, preserving code blocks and images.
    """
    system_prompt = f"""You are a technical translator expert in {target_language}.
    Translate the following Markdown content to {target_language}.
    
    CRITICAL RULES:
    1. DO NOT translate code blocks, variable names, file paths, or URLs.
    2. Preserve all Markdown formatting (headers, bold, lists, links).
    3. Preserve all image links and attributes exactly.
    4. If the target is 'Roman Urdu', write Urdu words using English characters (e.g., 'aap kaise hain?').
    5. Translate technical concepts clearly but keep standard terms (like 'ROS2', 'Node', 'Topic') in English/original if commonly used.
    
    Return ONLY the translated Markdown text.
    """
    
    response = await aclient.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ]
    )
    
    return response.choices[0].message.content

