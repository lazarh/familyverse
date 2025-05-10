'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  // If not loading and no redirect has happened, show the form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Family</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-1">
            Family Name
          </label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 text-black"
            placeholder="e.g., The Simpsons Family"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Family'}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already part of a family? You might be redirected shortly. If not, check your
          <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            {' '}home page
          </Link>.
        </p>
      </form>
    </div>
  );
}
