import React, { useState } from "react";
import Layout from "@theme/Layout";
import { authClient } from "../lib/auth-client";
import { useHistory } from "@docusaurus/router";
import "../css/auth-pages.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password
    }, {
      onSuccess: () => {
        // Force full reload to update session state in AuthProvider
        window.location.href = "/profile";
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      }
    });
  };

  return (
    <Layout title="Login" description="Login to Physical AI Book">
      <div className="auth-page-container">
        <div className="auth-glass-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">Welcome Back</h1>
            <p className="auth-card-subtitle">Login to continue your learning journey</p>
          </div>
          <div className="auth-form">
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
            <button className="auth-submit-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="auth-footer-text">
            Don't have an account? <a href="/signup" className="auth-footer-link">Sign up</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
