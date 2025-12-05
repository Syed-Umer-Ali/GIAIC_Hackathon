import React, { useState } from "react";
import Layout from "@theme/Layout";
import { authClient } from "../lib/auth-client";
import { useHistory } from "@docusaurus/router";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          flexDirection: "column",
        }}
      >
        <h1>Login</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px" }}
          />
          <button onClick={handleLogin} style={{ padding: "10px", cursor: "pointer" }}>
            Login
          </button>
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
