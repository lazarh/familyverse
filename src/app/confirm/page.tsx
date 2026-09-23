import React, { Suspense } from 'react';
import ConfirmClient from './ConfirmClient';
import { BrandMark } from '@/app/components/auth/AuthCard';

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <BrandMark className="mb-[34px]" />
        <div className="w-full max-w-[416px] rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-[26px] text-center shadow-[var(--shadow-lift)]">
          <p className="text-[13.5px] text-[var(--muted)]">Confirming...</p>
        </div>
      </div>
    }>
      <ConfirmClient />
    </Suspense>
  );
}
