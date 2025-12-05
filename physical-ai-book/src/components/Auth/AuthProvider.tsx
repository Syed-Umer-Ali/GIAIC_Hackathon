import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";
import OnboardingModal from "./OnboardingModal";

interface Session {
    user: {
        id: string;
        email: string;
        name: string;
        image?: string | null;
        proficiency?: string; // Twist field
        tech_background?: string; // Twist field
        preferred_language?: string; // Twist field
    };
    session: {
        id: string;
        expiresAt: Date;
        ipAddress?: string | null;
        userAgent?: string | null;
        userId: string;
    };
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: false, // Default to false so UI doesn't freeze if Provider is missing
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        console.log("Checking auth session...");
        
        // Race between the actual request and a timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Auth request timed out")), 5000)
        );

        const { data, error } = await Promise.race([
            authClient.getSession(),
            timeoutPromise
        ]) as any;

        if (error) {
            console.error("Auth session error:", error);
        }
        // @ts-ignore
        setSession(data as Session | null);
      } catch (err) {
        console.error("Auth Check Failed (Network/Server):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
      <OnboardingModal />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);