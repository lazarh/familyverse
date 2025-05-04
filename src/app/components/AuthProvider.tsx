'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // No need to pass session here, SessionProvider handles it
  return <SessionProvider>{children}</SessionProvider>;
}
