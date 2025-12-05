import React from "react";
import Layout from "@theme/Layout";
import TwistSignup from "../components/Auth/TwistSignup";

export default function Signup() {
  return (
    <Layout title="Sign Up" description="Sign Up for Physical AI Book">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
          padding: "20px"
        }}
      >
        <h1>Create Account</h1>
        <div style={{ width: "100%", maxWidth: "400px" }}>
            <TwistSignup />
        </div>
        <p style={{ marginTop: "20px" }}>
            Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </Layout>
  );
}
