# Quickstart: Personalized Auth Feature

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL (Neon connection string)
- OpenAI API Key

## 1. Environment Setup

Create a `.env` file in the root (or shared by scripts):

```env
# Database
DATABASE_URL="postgres://user:pass@host/db"

# Auth (Better Auth)
BETTER_AUTH_SECRET="your-random-secret"
BETTER_AUTH_URL="http://localhost:3001" # Auth runs on 3001

# Backend
OPENAI_API_KEY="sk-..."
BACKEND_URL="http://localhost:8000" # Backend runs on 8000
```

## 2. Start Auth Service

```bash
cd auth-service
npm install
npm run dev
# Server starts on http://localhost:3001
```

## 3. Start Backend Service

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Server starts on http://localhost:8000
```

## 4. Start Docusaurus Frontend

```bash
cd physical-ai-book
npm install
npm run start
# Server starts on http://localhost:3000
```

## 5. Verification

1. Go to `http://localhost:3000`.
2. Click "Login" (should redirect/use `http://localhost:3001`).
3. Sign up as a new user.
4. Fill in the "Twist" form (Proficiency, etc.).
5. Go to a Documentation page.
6. Toggle "Personalized View".
7. Verify content streams in.
