// Sourced from https://github.com/supabase/supabase/blob/e11717493f8b4222e5acfe759a766f6f1c591566/apps/studio/data/query-client.ts

import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

let queryClient: QueryClient | undefined;

export function getQueryClient() {
  const _queryClient =
    queryClient ??
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: (failureCount, error) => {
            // Don't retry on 404s
            if (
              typeof error === 'object' &&
              error !== null &&
              'code' in error &&
              (error as any).code === 404
            ) {
              return false;
            }

            if (failureCount < 3) {
              return true;
            }

            return false;
          },
        },
      },
    });

  // For SSG and SSR always create a new queryClient
  if (typeof window === 'undefined') return _queryClient;
  // Create the queryClient once in the client
  if (!queryClient) queryClient = _queryClient;

  return queryClient;
}

export function useRootQueryClient() {
  const [_queryClient] = useState(() => getQueryClient());

  return _queryClient;
}
