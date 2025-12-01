# Deployment Guide

Your project is a **Monorepo** containing two distinct parts:
1.  **Frontend:** `physical-ai-book` (React/Docusaurus)
2.  **Backend:** `backend` (Python/FastAPI)

**Why did Vercel fail?**
When you deploy the root of this repository to Vercel, it typically detects the Frontend (Docusaurus) and builds that, ignoring the Backend folder. To deploy both, you need to treat them as **separate projects** or use a specific monorepo configuration.

## Option 1: Deploy Backend to Render (Recommended)
Render is excellent for Python APIs and has a free tier.

1.  Push your latest code to GitHub.
2.  Create an account on [Render.com](https://render.com).
3.  Click **"New +"** -> **"Web Service"**.
4.  Connect your GitHub repository.
5.  **Configure the Service:**
    *   **Name:** `physical-ai-chatbot` (or similar)
    *   **Root Directory:** `backend` (Important!)
    *   **Runtime:** Python 3
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6.  **Environment Variables:**
    Scroll down to "Environment Variables" and add:
    *   `GEMINI_API_KEY`: (Your Key)
    *   `QDRANT_URL`: (Your URL)
    *   `QDRANT_API_KEY`: (Your Key)
    *   `DATABASE_URL`: (Your Neon/Postgres URL)
    *   `PYTHON_VERSION`: `3.10.0` (Optional, ensures compatibility)
7.  Click **"Create Web Service"**.
8.  Wait for the deploy to finish. Copy the **Service URL** (e.g., `https://physical-ai-chatbot.onrender.com`).

## Option 2: Deploy Backend to Vercel (Alternative)
You can also run the backend on Vercel as a separate project.

1.  Go to your Vercel Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the **same repository** again.
4.  **Configure Project:**
    *   **Project Name:** `physical-ai-backend`
    *   **Framework Preset:** Other (or leave default)
    *   **Root Directory:** Click "Edit" and select `backend`.
5.  **Environment Variables:**
    *   Add all the same variables as listed in the Render section above.
6.  Click **"Deploy"**.
7.  Copy the **Domain** (e.g., `https://physical-ai-backend.vercel.app`).

## Step 3: Connect Frontend to Backend

Now that your backend is live, tell the frontend where to find it.

1.  Go to your **Frontend Project** in Vercel (the one you already deployed).
2.  Go to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    *   **Key:** `API_URL`
    *   **Value:** The URL from Option 1 or 2 (e.g., `https://physical-ai-chatbot.onrender.com`).
        *   *Note: Do not add `/chat/message` to the end, just the base domain.*
4.  Go to the **Deployments** tab and **Redeploy** the latest commit (or push a new commit) to trigger a rebuild.

Your Docusaurus site will now talk to your live backend!
