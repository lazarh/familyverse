'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BrandMark } from '@/app/components/auth/AuthCard';
import { Button, Field, Input } from '@/app/components/ui';

// #20 D2: an expired/invalid token used to be a dead end. The error state now
// carries a human sentence plus a resend form that POSTs
// /api/register/resend for the address that registered — the same token +
// mailer code path as registration. The status machine, confirm fetch,
// success message and the 2-second success redirect are otherwise untouched.

export default function ConfirmClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');
  // Resend sub-state: the confirm machine stays as it was (#20 D2 adds this).
  const [email, setEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('This confirmation link has no token. Enter your email below to get a fresh confirmation email.');
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
          // #20 D2: token problems get a clear human sentence (the resend
          // form below is the way out); other failures keep the server text.
          setMessage(
            res.status === 400 || res.status === 410
              ? 'This confirmation link is invalid or has expired. Enter your email below and we will send a fresh one.'
              : data.error || 'Confirmation failed',
          );
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

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResendStatus('sending');
    setResendMessage('');
    try {
      const res = await fetch('/api/register/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResendStatus('error');
        setResendMessage(data.error || 'Could not resend the email. Please try again.');
      } else {
        setResendStatus('sent');
        setResendMessage(data.message || 'Confirmation email sent again. Check your inbox.');
      }
    } catch (err) {
      console.error('Resend fetch error:', err);
      setResendStatus('error');
      setResendMessage('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <BrandMark className="mb-[34px]" />
      <div className="w-full max-w-[416px] rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-[26px] text-center shadow-[var(--shadow-lift)]">
        {status === 'loading' && (
          <p className="text-[13.5px] text-[var(--muted)]">Confirming...</p>
        )}
        {status === 'error' && (
          <>
            <p role="alert" className="text-[13.5px] text-[var(--brick)]">{message}</p>
            {/* #20 D2: the escape hatch — re-trigger the confirmation email */}
            <form onSubmit={handleResend} className="mt-[16px] text-left">
              <Field label="Email" htmlFor="resend-email" className="mb-[12px]">
                <Input
                  type="email"
                  id="resend-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@family.example"
                  autoComplete="email"
                />
              </Field>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={resendStatus === 'sending'}
              >
                {resendStatus === 'sending' ? 'Sending…' : 'Resend confirmation email'}
              </Button>
            </form>
            {resendStatus === 'sent' && (
              <p role="status" className="mt-[12px] text-[13.5px] text-[var(--sage)]">{resendMessage}</p>
            )}
            {resendStatus === 'error' && (
              <p role="alert" className="mt-[12px] text-[13.5px] text-[var(--brick)]">{resendMessage}</p>
            )}
          </>
        )}
        {status === 'success' && (
          <p role="status" className="text-[13.5px] text-[var(--sage)]">{message}</p>
        )}
      </div>
    </div>
  );
}
