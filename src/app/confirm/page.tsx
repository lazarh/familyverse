import React, { Suspense } from 'react';
import ConfirmClient from './ConfirmClient';

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded shadow-md w-full max-w-md text-center">Confirming...</div>
      </div>
    }>
      <ConfirmClient />
    </Suspense>
  );
}
