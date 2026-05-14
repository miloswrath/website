'use client';

import dynamic from 'next/dynamic';

const ResumeClient = dynamic(() => import('./ResumeClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center">
      <p className="text-secondary text-sm">Loading resume…</p>
    </div>
  )
});

export default function ResumeViewer() {
  return <ResumeClient />;
}
