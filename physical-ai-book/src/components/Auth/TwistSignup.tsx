import React, { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { useHistory } from "@docusaurus/router";

export default function TwistSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Twist Fields
  const [proficiency, setProficiency] = useState("beginner");
  const [techBackground, setTechBackground] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");

  const history = useHistory();

  const handleSignup = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
      // @ts-ignore
      proficiency,
      tech_background: techBackground,
      preferred_language: preferredLanguage
    }, {
      onSuccess: () => {
        alert("Signup successful! Please login.");
        history.push("/login");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      }
    });
  };

  return (
    <div className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input 
        placeholder="Name" 
        onChange={(e) => setName(e.target.value)} 
        style={{ padding: '8px' }}
      />
      <input 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ padding: '8px' }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        style={{ padding: '8px' }}
      />
      
      <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>Customize Your Learning</h3>
      <select 
        onChange={(e) => setProficiency(e.target.value)} 
        value={proficiency}
        style={{ padding: '8px' }}
      >
        <option value="beginner">Beginner</option>
        <option value="learner">Learner</option>
        <option value="pro">Pro</option>
      </select>
      <input 
        placeholder="Technical Background (e.g. Student)" 
        onChange={(e) => setTechBackground(e.target.value)} 
        style={{ padding: '8px' }}
      />
      <input 
        placeholder="Preferred Language (e.g. Python)" 
        onChange={(e) => setPreferredLanguage(e.target.value)} 
        style={{ padding: '8px' }}
      />
      
      <button 
        onClick={handleSignup}
        style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: 'var(--ifm-color-primary)', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
        }}
      >
        Create Account
      </button>
    </div>
  );
}
