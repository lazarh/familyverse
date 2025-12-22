'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ConfirmClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No token provided');
      return;
    }

    async function confirm() {
      setStatus('loading');
      try {
        const res = await fetch('/api/register/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus('error');
          setMessage(data.error || 'Confirmation failed');
        } else {
          setStatus('success');
          setMessage(data.message || 'Email confirmed. You can now log in.');
          setTimeout(() => router.push('/login'), 2000);
        }
      } catch (err) {
        console.error('Confirm fetch error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    }

    confirm();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md text-center">
        {status === 'loading' && <p className="text-gray-600">Confirming...</p>}
        {status === 'error' && <p className="text-red-500">{message}</p>}
        {status === 'success' && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
