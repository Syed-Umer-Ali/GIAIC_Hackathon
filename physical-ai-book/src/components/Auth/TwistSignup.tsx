import React, { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { useHistory } from "@docusaurus/router";
import "../../css/auth-pages.css";

export default function TwistSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Twist Fields
  const [proficiency, setProficiency] = useState("beginner");
  const [techBackground, setTechBackground] = useState("student");
  const [preferredLanguage, setPreferredLanguage] = useState("python");

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
    <div className="auth-form">
      <input
        className="auth-input"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="auth-input"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <h3 className="auth-section-heading">Customize Your Learning</h3>

      <select
        className="auth-select"
        onChange={(e) => setProficiency(e.target.value)}
        value={proficiency}
      >
        <option value="beginner">🌱 Beginner - Just Starting Out</option>
        <option value="learner">📚 Learner - Building Knowledge</option>
        <option value="pro">🚀 Pro - Advanced Level</option>
      </select>

      <select
        className="auth-select"
        onChange={(e) => setTechBackground(e.target.value)}
        value={techBackground}
      >
        <option value="">Select Technical Background</option>
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

      <select
        className="auth-select"
        onChange={(e) => setPreferredLanguage(e.target.value)}
        value={preferredLanguage}
      >
        <option value="">Select Preferred Language</option>
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

      <button
        className="auth-submit-btn"
        onClick={handleSignup}
      >
        Create Account
      </button>
    </div>
  );
}
