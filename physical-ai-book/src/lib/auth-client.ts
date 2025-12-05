import { createAuthClient } from "better-auth/react";

// Safe environment variable access for Docusaurus/Client-side
const getAuthUrl = () => {
  try {
    // @ts-ignore
    if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_AUTH_URL) {
      // @ts-ignore
      return process.env.NEXT_PUBLIC_AUTH_URL;
    }
  } catch (e) {
    // Ignore reference errors
  }
  return "http://localhost:3001";
};

export const authClient = createAuthClient({
  baseURL: getAuthUrl(), 
});