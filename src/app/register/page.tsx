'use client';

import { useState } from 'react';
import { AuthCard } from '@/app/components/auth/AuthCard';
import { Button, Field, Input } from '@/app/components/ui';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Add state for honeypot


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, website_url: honeypot }), // Send honeypot
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setSuccess('Registration successful! Check your email for a confirmation link.');
        // Optionally clear form or redirect
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setHoneypot(''); // Clear honeypot field
        // Do not redirect automatically; wait for email confirmation
      }
    } catch (err) {
      console.error('Registration fetch error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <AuthCard mode="register" error={error} success={success}>
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

        <Field label="Password (min. 6 characters)" htmlFor="password">
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // Enforce minimum password length in HTML
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Field>

        <Field label="Confirm Password" htmlFor="confirmPassword">
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Field>

        {/* Honeypot field */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot} // Bind value
            onChange={(e) => setHoneypot(e.target.value)} // Update state
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full"
          disabled={!!success} // Disable button after successful registration
        >
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
