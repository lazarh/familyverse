'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/app/components/auth/AuthCard';
import { Button, Field, Input } from '@/app/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false, // Don't redirect automatically, handle it manually
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password'); // Or use result.error for more specific messages
    } else if (result?.ok) {
      // Fetch user's families
      try {
        const res = await fetch('/api/families');
        if (res.ok) {
          const families = await res.json();
          if (families && families.length > 0) {
            router.push('/'); // User has families, redirect to main page
          } else {
            router.push('/create-family'); // User has no families, redirect to create family page
          }
          router.refresh(); // Refresh server components
        } else {
          // Handle error fetching families, perhaps redirect to a generic error page or show a message
          setError('Could not fetch family details. Please try again.');
        }
      } catch (fetchError) {
        console.error("Failed to fetch families:", fetchError);
        setError('An error occurred while checking your family status.');
      }
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <AuthCard mode="login" error={error}>
      <form onSubmit={handleSubmit}>
        <Field label="Email" htmlFor="email">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@family.example"
            autoComplete="email"
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit" variant="primary" size="xl" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
