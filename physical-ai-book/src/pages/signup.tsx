import React from "react";
import Layout from "@theme/Layout";
import TwistSignup from "../components/Auth/TwistSignup";
import "../css/auth-pages.css";

export default function Signup() {
  return (
    <Layout title="Sign Up" description="Sign Up for Physical AI Book">
      <div className="auth-page-container">
        <div className="auth-glass-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">Create Account</h1>
            <p className="auth-card-subtitle">Join Physical AI & Humanoid Robotics</p>
          </div>
          <TwistSignup />
          <p className="auth-footer-text">
            Already have an account? <a href="/login" className="auth-footer-link">Login</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
