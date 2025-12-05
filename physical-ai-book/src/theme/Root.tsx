import React from 'react';
import Chatbot from '../components/Chatbot';
import { AuthProvider } from '../components/Auth/AuthProvider';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <AuthProvider>
      {children}
      <Chatbot />
    </AuthProvider>
  );
}
