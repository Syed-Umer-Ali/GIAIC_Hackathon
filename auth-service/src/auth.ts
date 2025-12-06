import { betterAuth } from "better-auth";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  user: {
    additionalFields: {
      proficiency: {
        type: "string",
        required: false,
        input: true
      },
      tech_background: {
        type: "string",
        required: false,
        input: true
      },
      preferred_language: {
        type: "string",
        required: false,
        input: true
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3000", 
    "http://localhost:3001",
    "https://physical-ai-robotics-textbook.vercel.app",
    "https://physical-ai-book.vercel.app"
  ], 
});
