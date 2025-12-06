from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.auth_utils import get_current_user, get_optional_user
from app.services.personalization import generate_personalized_content
from app.services import content as content_service
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class PersonalizationRequest(BaseModel):
    content: str | None = None
    slug: str | None = None
    context_hint: str | None = None
    # Add manual context fields for cases where auth cookie fails (Cross-domain)
    tech_background: str | None = None
    preferred_language: str | None = None

@router.post("/personalize")
async def personalize_content(
    request: PersonalizationRequest,
    # Make user optional so we don't block request if cookie is missing
    user: User | None = Depends(get_optional_user)  
):
    # Construct a temporary user object or context if real user is missing
    # but frontend provided the details
    if not user:
        if request.tech_background or request.preferred_language:
            # Create a mock/temporary user for personalization logic
            user = User(
                id="guest", 
                email="guest@example.com",
                name="Guest",
                tech_background=request.tech_background or "General",
                preferred_language=request.preferred_language or "English"
            )
        else:
             raise HTTPException(status_code=401, detail="Unauthorized: Please login or provide context")
    
    text_to_personalize = request.content
    
    # If no content provided, try to fetch via slug
    if not text_to_personalize and request.slug:
        try:
            text_to_personalize = await content_service.get_markdown_content(request.slug)
        except FileNotFoundError:
             raise HTTPException(status_code=404, detail="Content not found for this slug")
    
    if not text_to_personalize:
        raise HTTPException(status_code=400, detail="Either 'content' or 'slug' must be provided")

    return StreamingResponse(
        generate_personalized_content(text_to_personalize, user),
        media_type="text/event-stream"
    )
