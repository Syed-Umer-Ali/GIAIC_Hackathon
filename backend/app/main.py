from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, features
from app.api.endpoints import personalization

app = FastAPI(title="Physical AI Textbook RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://physical-ai-robotics-textbook.vercel.app", # Your specified name
        "https://physical-ai-book.vercel.app", # Fallback name
        "https://physical-ai-book-black.vercel.app", # Latest Vercel Deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(features.router, prefix="/api/features", tags=["features"])
app.include_router(personalization.router, prefix="/api", tags=["personalization"])

@app.get("/")
async def root():
    return {"message": "RAG Chatbot API is running"}
