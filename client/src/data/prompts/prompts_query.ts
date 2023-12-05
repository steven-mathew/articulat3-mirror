import {
  QueryClient,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

import { promptIntentKeys } from './keys';
import { get } from '../fetchers';
import { PromptIntent, ResponseError } from '@/types/api';

export async function getPromptIntents(signal?: AbortSignal) {
  const data = await get('/v1/prompt_intents', {
    // we are not using params for now
    params: { query: undefined },
    signal,
  });
  if (data.error) throw data.error;
  return data.data.prompt_intents as PromptIntent[];
}

export type PromptIntentsData = Awaited<ReturnType<typeof getPromptIntents>>;
export type PromptIntentsError = ResponseError;

export const usePromptIntentsQuery = <TData = PromptIntentsData>({
  enabled = true,
  ...options
}: UseQueryOptions<PromptIntentsData, PromptIntentsError, TData> = {}) =>
  useQuery<PromptIntentsData, PromptIntentsError, TData>(
    promptIntentKeys.list(),
    ({ signal }) => getPromptIntents(signal),
    { enabled: enabled, ...options },
  );

export function prefetchPromptIntents(client: QueryClient) {
  return client.prefetchQuery(promptIntentKeys.list(), ({ signal }) =>
    getPromptIntents(signal),
  );
}

export function usePromptIntentsPrefetch() {
  const client = useQueryClient();

  return useCallback(() => {
    prefetchPromptIntents(client);
  }, [client]);
}

export function useAutoProjectsPrefetch() {
  const prefetch = usePromptIntentsPrefetch();

  const called = useRef<boolean>(false);
  if (called.current === false) {
    called.current = true;
    prefetch();
  }
}

export function invalidateProjectsQuery(client: QueryClient) {
  return client.invalidateQueries(promptIntentKeys.list());
}
