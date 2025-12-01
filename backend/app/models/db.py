from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

Base = declarative_base()

class ChatSession(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(String, nullable=True)
    
    messages = relationship("ChatMessage", back_populates="session")

class ChatMessage(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("sessions.id"))
    role = Column(String) # user or assistant
    content = Column(Text)
    context_page = Column(String, nullable=True)
    selected_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")

class LessonCache(Base):
    __tablename__ = "lesson_cache"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String, nullable=False, index=True)
    feature_type = Column(String, nullable=False)  # summary, translation, quiz
    params = Column(Text, nullable=True) # JSON string for extra params like language
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    source_hash = Column(String, nullable=True)
