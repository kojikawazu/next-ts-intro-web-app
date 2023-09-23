import React, { Suspense } from 'react';
import ErrorBoundary from '@/app/components/common/error/ErrorBoundary';
import '@/app/globals.css';


/**
 * Introレイアウトコンポーネント
 * @returns JSX
 */
export default function IntroLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>ローディング中...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
