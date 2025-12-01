import os
from pathlib import Path

# Assuming the docs directory is at the root level relative to the backend
# Adjust this path based on actual deployment structure
# backend/app/services/content.py -> backend/app/services -> backend/app -> backend -> root -> physical-ai-book/docs
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
DOCS_DIR = BASE_DIR / "physical-ai-book" / "docs"

def get_markdown_content(slug: str) -> str:
    """
    Reads the markdown content for a given slug.
    The slug should correspond to the file path relative to the docs directory.
    Example: '01-ros2-robot-operating-system/1-ros2-fundamentals'
    """
    # Security check to prevent directory traversal
    if ".." in slug or slug.startswith("/"):
        raise ValueError("Invalid slug")

    # Try adding .md extension if missing
    file_path = DOCS_DIR / f"{slug}.md"
    
    if not file_path.exists():
        # Try looking for index.md if it's a directory (Docusaurus convention)
        file_path = DOCS_DIR / slug / "index.md"
        
    if not file_path.exists():
         # Try finding the file without matching the exact filename if docusaurus generates slugs differently
         # For now, assume direct mapping or exact path provided
         raise FileNotFoundError(f"Lesson content not found for slug: {slug}")

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()
