import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { authClient } from "../lib/auth-client";
import { useAuth } from "../components/Auth/AuthProvider";
import { Redirect, useHistory } from "@docusaurus/router";
import "../css/profile-page.css";
import "../css/auth-pages.css";

export default function Profile() {
  const { session, loading } = useAuth();
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("beginner");
  const [techBackground, setTechBackground] = useState("student");
  const [preferredLanguage, setPreferredLanguage] = useState("python");
  const [isSaving, setIsSaving] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      // @ts-ignore
      setProficiency(session.user.proficiency || "beginner");
      // @ts-ignore
      setTechBackground(session.user.tech_background || "student");
      // @ts-ignore
      setPreferredLanguage(session.user.preferred_language || "python");
    }
  }, [session]);

  const handleUpdate = async () => {
    setIsSaving(true);
    await authClient.updateUser({
      name,
      // @ts-ignore - Custom fields
      proficiency,
      tech_background: techBackground,
      preferred_language: preferredLanguage
    }, {
      onSuccess: () => {
        alert("Profile updated!");
        setIsSaving(false);
        history.push("/docs/intro");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setIsSaving(false);
      }
    });
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
        // Race condition: Wait max 2 seconds for server response
        await Promise.race([
            authClient.signOut(),
            new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
    } catch (e) {
        console.error("Logout error:", e);
    } finally {
        // Always redirect, even if server is slow/down
        window.location.href = "/";
    }
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (!session) return <Redirect to="/" />;

  return (
    <Layout title="Your Profile" description="Manage your learning preferences">
      <div className="profile-page-container">
        {isLoggingOut && (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: 'white', fontSize: '1.5rem'
            }}>
                Logging out...
            </div>
        )}
        <div className="profile-content-wrapper">
          <div className="profile-header">
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-subtitle">Manage your learning preferences and account settings</p>
          </div>

          <div className="profile-grid">
            {/* Personal Details Card */}
            <div className="profile-glass-card">
              <div className="profile-card-header">
                <h3 className="profile-card-title">👤 Personal Details</h3>
              </div>
              <div className="profile-form-group">
                <label className="profile-label">Name</label>
                <input
                  className="auth-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="profile-form-group">
                <label className="profile-label">Email</label>
                <input
                  className="auth-input"
                  type="email"
                  value={session.user.email}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>
            </div>

            {/* Learning Preferences Card */}
            <div className="profile-glass-card">
              <div className="profile-card-header">
                <h3 className="profile-card-title">📚 Learning Preferences</h3>
              </div>
              <div className="profile-form-group">
                <label className="profile-label">Proficiency Level</label>
                <select
                  className="auth-select"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                >
                  <option value="beginner">🌱 Beginner - Just Starting Out</option>
                  <option value="learner">📚 Learner - Building Knowledge</option>
                  <option value="pro">🚀 Pro - Advanced Level</option>
                </select>
              </div>
              <div className="profile-form-group">
                <label className="profile-label">Technical Background</label>
                <select
                  className="auth-select"
                  value={techBackground}
                  onChange={(e) => setTechBackground(e.target.value)}
                >
                  <option value="student">🎓 Student</option>
                  <option value="professional">💼 Working Professional</option>
                  <option value="researcher">🔬 Researcher</option>
                  <option value="engineer">⚙️ Engineer</option>
                  <option value="developer">💻 Software Developer</option>
                  <option value="data_scientist">📊 Data Scientist</option>
                  <option value="hobbyist">🎨 Hobbyist</option>
                  <option value="educator">👨‍🏫 Educator</option>
                  <option value="other">🌟 Other</option>
                </select>
              </div>
              <div className="profile-form-group">
                <label className="profile-label">Preferred Language</label>
                <select
                  className="auth-select"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                >
                  <option value="python">🐍 Python</option>
                  <option value="cpp">⚡ C++</option>
                  <option value="javascript">📜 JavaScript</option>
                  <option value="java">☕ Java</option>
                  <option value="csharp">🎯 C#</option>
                  <option value="rust">🦀 Rust</option>
                  <option value="go">🔷 Go</option>
                  <option value="matlab">📐 MATLAB</option>
                  <option value="r">📈 R</option>
                  <option value="julia">🔮 Julia</option>
                  <option value="other">🌐 Other</option>
                </select>
              </div>
              <button
                className="profile-save-btn"
                onClick={handleUpdate}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* Account Actions Card */}
            <div className="profile-glass-card profile-card-full">
              <div className="profile-card-header">
                <h3 className="profile-card-title">⚙️ Account Actions</h3>
              </div>
              <button
                className="profile-logout-btn"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
