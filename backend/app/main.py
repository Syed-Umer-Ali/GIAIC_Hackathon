from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, features

app = FastAPI(title="Physical AI Textbook RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the Docusaurus URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(features.router, prefix="/api/features", tags=["features"])

@app.get("/")
async def root():
    return {"message": "RAG Chatbot API is running"}
