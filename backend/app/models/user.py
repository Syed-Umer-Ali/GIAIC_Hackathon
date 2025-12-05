from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    emailVerified = Column(Boolean, nullable=False)
    image = Column(String, nullable=True)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)
    
    # The Twist Fields
    proficiency = Column(String, nullable=True)
    tech_background = Column(String, nullable=True)
    preferred_language = Column(String, nullable=True)

class Session(Base):
    __tablename__ = "session"
    
    id = Column(String, primary_key=True)
    token = Column(String, nullable=False, unique=True)
    userId = Column(String, nullable=False)
    expiresAt = Column(DateTime, nullable=False)
