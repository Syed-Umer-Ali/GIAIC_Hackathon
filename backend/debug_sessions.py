import asyncio
from sqlalchemy import select
from app.db.session import AsyncSessionLocal
from app.models.user import Session
import sys

# Print generic encoding to handle potential unicode in terminal
sys.stdout.reconfigure(encoding='utf-8')

async def list_sessions():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Session))
        sessions = result.scalars().all()
        
        print("\n--- ACTIVE SESSIONS IN DB ---")
        if not sessions:
            print("NO SESSIONS FOUND IN DATABASE!")
        
        for s in sessions:
            print(f"Token: {s.token}")
            print(f"User: {s.userId}")
            print(f"Expires: {s.expiresAt}")
            print("-" * 30)

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(list_sessions())
