'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BrandMark } from '@/app/components/auth/AuthCard';

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

  // Presentation only — the status machine, fetch, message strings and the
  // 2-second success redirect above are untouched.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <BrandMark className="mb-[34px]" />
      <div className="w-full max-w-[416px] rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-[26px] text-center shadow-[var(--shadow-lift)]">
        {status === 'loading' && (
          <p className="text-[13.5px] text-[var(--muted)]">Confirming...</p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-[13.5px] text-[var(--brick)]">{message}</p>
        )}
        {status === 'success' && (
          <p role="status" className="text-[13.5px] text-[var(--sage)]">{message}</p>
        )}
      </div>
    </div>
  );
}
