import React from 'react';
import { useAuth } from '../../components/Auth/AuthProvider';
import Link from '@docusaurus/Link';

export default function AuthNavbarItem(props) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="navbar__item">Loading...</div>;
  }

  if (session?.user) {
    return (
      <Link to="/profile" className="navbar__item navbar__link">
        Profile
      </Link>
    );
  }

  return (
    <>
      <Link to="/login" className="navbar__item navbar__link">
        Login
      </Link>
      <Link to="/signup" className="navbar__item navbar__link">
        Sign Up
      </Link>
    </>
  );
}
