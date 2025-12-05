import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Check DB Connection
if (process.env.DATABASE_URL) {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    pool.connect().then(client => {
        console.log("✅ Database connected successfully");
        client.release();
        pool.end();
    }).catch(err => {
        console.error("❌ Database connection failed:", err);
    });
} else {
    console.error("❌ DATABASE_URL is missing in environment variables");
}

app.use(cors({
    origin: [
        "http://localhost:3000", 
        "http://localhost:3001", 
        "http://localhost:8000",
        "https://physical-ai-robotics-textbook.vercel.app",
        "https://physical-ai-book.vercel.app"
    ],
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.path}`);
    next();
});

// Test route
app.get("/api/auth/test-route", (req, res) => {
    res.json({ message: "Routing is working", path: req.path });
});

// Test route
app.get("/api/auth/test-route", (req, res) => {
    res.json({ message: "Routing is working", path: req.path });
});

// Manual wildcard match for Better Auth
app.all(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api/auth")) {
        console.log("Better Auth incoming request:", {
            path: req.path,
            url: req.url,
            originalUrl: req.originalUrl
        });
        return toNodeHandler(auth)(req, res, next);
    }
    next();
});

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
