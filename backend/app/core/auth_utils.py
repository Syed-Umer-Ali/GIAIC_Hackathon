from fastapi import Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import Session as UserSession, User
from datetime import datetime

from fastapi import Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import Session as UserSession, User
from datetime import datetime
import urllib.parse

async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)):
    # Debug: Log all cookies received
    print(f"DEBUG: Cookies received: {request.cookies.keys()}")
    
    # Better Auth sets a cookie, usually named "better-auth.session_token"
    # Also check for generic "session_token" just in case
    token = request.cookies.get("better-auth.session_token") or request.cookies.get("session_token")
    
    if not token:
        print("DEBUG: No token found in cookies")
        raise HTTPException(status_code=401, detail="Not authenticated - No token")

    # FIX: Decode the token (it might be URL encoded like %2B instead of +)
    token = urllib.parse.unquote(token)
    
    # FIX: Better Auth might sign the cookie (e.g., token.signature).
    # If the token in DB is shorter than the cookie, we likely need to split it.
    if "." in token:
        print(f"DEBUG: Token has signature/extra data. Splitting. Original: {token[:15]}...")
        token = token.split(".")[0]
        print(f"DEBUG: Extracted token: {token}")

    # Verify session in DB using Async SQLAlchemy 2.0 syntax
    print(f"DEBUG: Verifying token: {token[:10]}...")
    result = await db.execute(select(UserSession).filter(UserSession.token == token))
    session_record = result.scalars().first()
    
    if not session_record:
        print("DEBUG: Session record not found in DB")
        raise HTTPException(status_code=401, detail="Invalid session")
        
    if session_record.expiresAt < datetime.now():
        print("DEBUG: Session expired")
        raise HTTPException(status_code=401, detail="Session expired")
    
    user_result = await db.execute(select(User).filter(User.id == session_record.userId))
    user = user_result.scalars().first()
    
    if not user:
        print("DEBUG: User not found for session")
        raise HTTPException(status_code=401, detail="User not found")
        
    return user
