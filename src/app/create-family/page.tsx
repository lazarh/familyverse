'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BrandMark } from '@/app/components/auth/AuthCard';
import { Button, Field, Input } from '@/app/components/ui';

interface Family {
  id: string;
  name: string;
  // Add other family properties as needed
}

export default function CreateFamilyPage() {
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Start with loading true to check existing families
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user already belongs to a family
    const fetchUserFamilies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/families'); // Assuming GET /api/families returns families for the current user
        if (!response.ok) {
          if (response.status === 401) {
            // User not authenticated, redirect to login
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch families');
        }
        const families: Family[] = await response.json();
        if (families.length > 0) {
          // User already has a family, redirect to the main family visualization page
          router.push('/');
        } else {
          // No families found, allow creation
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred while checking families.');
        setIsLoading(false); // Stop loading even on error, so user can see the error/form
      }
    };

    fetchUserFamilies();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!familyName.trim()) {
      setError('Family name cannot be empty.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/families', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: familyName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create family');
      }

      // const newFamily = await response.json();
      // Family created successfully, redirect to the main family visualization page
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <BrandMark className="mb-[34px]" />
        <div className="w-full max-w-[416px] rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-[26px] text-center shadow-[var(--shadow-lift)]">
          <p className="text-[13.5px] text-[var(--muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  // If not loading and no redirect has happened, show the form
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <BrandMark className="mb-[34px]" />

      <div className="w-full max-w-[416px] rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-[26px] shadow-[var(--shadow-lift)]">
        <div className="mb-[22px] text-center">
          <h1 className="text-[26px] leading-[1.2] tracking-[-0.02em]">Create Your Family</h1>
        </div>

        {error && (
          <p role="alert" className="mb-[14px] text-center text-[13.5px] text-[var(--brick)]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Field label="Family Name" htmlFor="familyName" tag="req">
            <Input
              type="text"
              id="familyName"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
              placeholder="e.g., The Simpsons Family"
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Family'}
          </Button>
        </form>

        <p className="mt-[18px] border-t border-[var(--line)] pt-[16px] text-center text-[13.5px] text-[var(--muted)]">
          Already part of a family? You might be redirected shortly. If not, check your
          <Link href="/" className="font-650 text-[var(--clay)] hover:underline">
            {' '}home page
          </Link>.
        </p>
      </div>
    </div>
  );
}
