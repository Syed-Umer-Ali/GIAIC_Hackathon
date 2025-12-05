import React from 'react';
import { useAuth } from '../../components/Auth/AuthProvider';
import Link from '@docusaurus/Link';
import '../../css/auth-buttons.css';
import '../../css/profile-page.css';

export default function AuthNavbarItem(props) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="navbar__item">Loading...</div>;
  }

  if (session?.user) {
    return (
      <Link to="/profile" className="auth-btn-profile">
        👤 Profile
      </Link>
    );
  }

  return (
    <div className="auth-buttons-container">
      <Link to="/login" className="auth-btn-login">
        Login
      </Link>
      <Link to="/signup" className="auth-btn-signup">
        Sign Up
      </Link>
    </div>
  );
}
