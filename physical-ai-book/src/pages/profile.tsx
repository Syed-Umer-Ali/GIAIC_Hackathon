import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { authClient } from "../lib/auth-client";
import { useAuth } from "../components/Auth/AuthProvider";
import { Redirect, useHistory } from "@docusaurus/router"; // Added useHistory

export default function Profile() {
  const { session, loading } = useAuth();
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("beginner");
  const [techBackground, setTechBackground] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      // @ts-ignore
      setProficiency(session.user.proficiency || "beginner");
      // @ts-ignore
      setTechBackground(session.user.tech_background || "");
      // @ts-ignore
      setPreferredLanguage(session.user.preferred_language || "");
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
        // Redirect to the intro docs page after update
        history.push("/docs/intro"); 
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setIsSaving(false);
      }
    });
  };

  const handleLogout = async () => {
    await authClient.signOut({
      onSuccess: () => {
        // Force full reload to clear client-side session state
        window.location.href = "/";
      },
      onError: (ctx) => {
        alert(`Logout failed: ${ctx.error.message}`);
      }
    });
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (!session) return <Redirect to="/" />;

  return (
    <Layout title="Your Profile" description="Manage your learning preferences">
      <div className="container margin-vert--lg">
        <h1>Your Profile</h1>
        <div className="row">
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>Personal Details</h3>
              </div>
              <div className="card__body">
                <div className="margin-bottom--md">
                  <label>Name</label>
                  <input 
                    className="button button--block button--outline button--secondary" 
                    style={{textAlign: 'left', cursor: 'text'}}
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="margin-bottom--md">
                    <label>Email</label>
                    <input 
                        className="button button--block button--outline button--secondary" 
                        value={session.user.email} 
                        disabled 
                    />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>Learning Preferences (The Twist)</h3>
              </div>
              <div className="card__body">
                <div className="margin-bottom--md">
                  <label>Proficiency Level</label>
                  <select 
                    className="button button--block button--outline button--secondary"
                    value={proficiency} 
                    onChange={(e) => setProficiency(e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="learner">Learner</option>
                    <option value="pro">Pro</option>
                  </select>
                </div>
                <div className="margin-bottom--md">
                  <label>Technical Background</label>
                  <input 
                    className="button button--block button--outline button--secondary"
                    style={{textAlign: 'left', cursor: 'text'}}
                    value={techBackground} 
                    onChange={(e) => setTechBackground(e.target.value)} 
                  />
                </div>
                <div className="margin-bottom--md">
                  <label>Preferred Language</label>
                  <input 
                    className="button button--block button--outline button--secondary"
                    style={{textAlign: 'left', cursor: 'text'}}
                    value={preferredLanguage} 
                    onChange={(e) => setPreferredLanguage(e.target.value)} 
                  />
                </div>
              </div>
              <div className="card__footer">
                <button 
                    className={`button button--primary button--block ${isSaving ? 'button--loading' : ''}`}
                    onClick={handleUpdate}
                >
                    Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row margin-top--lg"> {/* New row for logout button */}
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h3>Account Actions</h3>
              </div>
              <div className="card__body">
                <button
                  className="button button--danger button--block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
