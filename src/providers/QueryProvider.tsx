'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import SessionInitializer from './SessionInitializer';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 Minutes
            gcTime: 0, // 30 Minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: {
            retry: 0
        }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionInitializer />
      {children}
    </QueryClientProvider>
  );
}
