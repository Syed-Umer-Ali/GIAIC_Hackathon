from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.auth_utils import get_current_user
from app.services.personalization import generate_personalized_content
from app.services import content as content_service
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class PersonalizationRequest(BaseModel):
    content: str | None = None
    slug: str | None = None
    context_hint: str | None = None

@router.post("/personalize")
async def personalize_content(
    request: PersonalizationRequest,
    user: User = Depends(get_current_user)
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
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
