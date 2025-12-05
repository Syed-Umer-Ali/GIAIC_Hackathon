import React from "react";
import { useAuth } from "./AuthProvider";
import { useHistory } from "@docusaurus/router";

export default function OnboardingModal() {
  const { session, loading } = useAuth();
  const history = useHistory();

  if (loading) return null;

  // If logged in but no proficiency set, show modal
  // @ts-ignore
  const isProfileIncomplete = session?.user && !session.user.proficiency;

  if (!isProfileIncomplete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        <p className="mb-6">Help us personalize your learning experience by answering a few quick questions.</p>
        <button
          onClick={() => history.push("/profile")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Go to Profile Settings
        </button>
      </div>
    </div>
  );
}
