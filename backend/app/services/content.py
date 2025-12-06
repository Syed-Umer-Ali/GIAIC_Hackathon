import os
import re
import httpx
import asyncio
from pathlib import Path

# Assuming the docs directory is at the root level relative to the backend
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
DOCS_DIR = BASE_DIR / "physical-ai-book" / "docs"

GITHUB_REPO = "Syed-Umer-Ali/GIAIC_Hackathon"
GITHUB_BRANCH = "main" # Default to main, can be made env var
TREE_CACHE = None

def find_file_fuzzy(base_path: Path, parts: list[str]) -> Path | None:
    """
    Recursively finds a path by matching parts, ignoring leading numbers (e.g., '01-').
    """
    if not parts:
        if base_path.is_file():
            return base_path
        if base_path.is_dir():
            index_md = base_path / "index.md"
            if index_md.exists():
                return index_md
        return None

    current_part = parts[0]
    remaining_parts = parts[1:]
    
    if not base_path.exists() or not base_path.is_dir():
        return None

    for item in base_path.iterdir():
        normalized_name = re.sub(r'^\d+[-_.]', '', item.name)
        
        if not remaining_parts:
            if item.is_file() and item.stem == current_part:
                 return item
            if item.is_file() and re.sub(r'^\d+[-_.]', '', item.stem) == current_part:
                 return item
        
        if item.is_dir():
            if normalized_name == current_part:
                result = find_file_fuzzy(item, remaining_parts)
                if result:
                    return result

    return None

def match_slug_to_path(slug_parts: list[str], repo_path: str) -> bool:
    """
    Matches a slug (list of parts) to a repository path string by normalizing
    both and comparing the result.
    """
    # Reconstruct the original slug string from its parts.
    slug_str = "/".join(slug_parts)
    
    # Normalize the repository path:
    # 1. Remove the '.md' file extension.
    repo_path_no_ext = repo_path.replace(".md", "")
    # 2. Split into parts.
    repo_path_parts = repo_path_no_ext.split("/")
    # 3. Remove numeric prefixes (e.g., '01-') from each part.
    normalized_repo_parts = [re.sub(r'^\d+[-_.]', '', p) for p in repo_path_parts]
    # 4. Join the normalized parts back into a string.
    normalized_repo_path = "/".join(normalized_repo_parts)
    
    # Compare the reconstructed slug string with the fully normalized repo path.
    # This correctly matches 'digital-twin-simulation/gazebo-setup' with
    # '02-digital-twin-simulation/1-gazebo-setup.md' after normalization.
    return slug_str.lower() == normalized_repo_path.lower()

async def fetch_from_github(slug: str) -> str:
    """
    Fetches markdown content directly from GitHub.
    """
    global TREE_CACHE
    
    async with httpx.AsyncClient() as client:
        # 1. Fetch Tree if not cached
        if not TREE_CACHE:
            print("Fetching GitHub Tree...")
            url = f"https://api.github.com/repos/{GITHUB_REPO}/git/trees/{GITHUB_BRANCH}?recursive=1"
            response = await client.get(url)
            if response.status_code == 200:
                TREE_CACHE = response.json().get("tree", [])
            else:
                print(f"GitHub API Error: {response.status_code} - {response.text}")
                # Fallback to empty if failed, will raise Not Found later
                TREE_CACHE = []

        # 2. Find the file in the tree
        slug_parts = [p for p in slug.strip("/").split("/") if p]
        target_path = None
        
        for item in TREE_CACHE:
            path = item["path"]
            # We look for files in physical-ai-book/docs/
            if not path.startswith("physical-ai-book/docs/") or item["type"] != "blob":
                continue
            
            # Remove prefix to get relative path inside docs
            rel_path = path.replace("physical-ai-book/docs/", "")
            
            print(f"DEBUG: Comparing slug='{slug}' with rel_path='{rel_path}'") # DEBUG PRINT
            
            if match_slug_to_path(slug_parts, rel_path):
                target_path = path
                print(f"DEBUG: Match FOUND! slug='{slug}', target_path='{target_path}'") # DEBUG PRINT
                break
        
        if not target_path:
             print(f"ERROR: No match found for slug='{slug}' in GitHub tree.") # DEBUG PRINT
             raise FileNotFoundError(f"Lesson content not found in GitHub for slug: {slug}")

        # 3. Fetch Content
        print(f"Fetching content from GitHub: {target_path}")
        raw_url = f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}/{target_path}"
        response = await client.get(raw_url)
        if response.status_code == 200:
            return response.text
        else:
            raise FileNotFoundError(f"Failed to fetch content from {raw_url}")

async def get_markdown_content(slug: str) -> str:
    """
    Reads the markdown content for a given slug.
    Tries local file system first, then falls back to GitHub.
    """
    # Security check
    if ".." in slug or slug.startswith("/"):
        raise ValueError("Invalid slug")

    # 1. Try direct match first (fastest)
    direct_path = DOCS_DIR / f"{slug}.md"
    if direct_path.exists():
        with open(direct_path, "r", encoding="utf-8") as f:
            return f.read()

    # 2. Try fuzzy match (walking the tree)
    slug_parts = slug.split('/')
    found_path = find_file_fuzzy(DOCS_DIR, slug_parts)
    
    if found_path and found_path.exists():
        with open(found_path, "r", encoding="utf-8") as f:
            return f.read()

    # 3. Fallback to GitHub
    print(f"Local file not found for {slug}, trying GitHub...")
    return await fetch_from_github(slug)
