import { ResponseError } from '@/types/api';
import { promptIntentKeys } from './keys';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../fetchers';

export type PromptVariables = {
  id?: string;
};

export type PromptResponse = {
  id: string;
  model: string;
  prompt: string;
  obj?: {
    texture_blob_id?: string;
    material_definition_blob_id?: string;
    object_model_blob_id?: string;
    object_thumbnail_blob_id?: string;
  };
  status?: string;
};

export async function getPrompt({ id }: PromptVariables, signal?: AbortSignal) {
  if (!id) {
    throw new Error('id is required');
  }

  const { data, error } = await get(`/v1/prompt_intents/{id}`, {
    params: { path: { id: id } },
    signal,
  });

  if (error) {
    throw error;
  }

  return data.prompt_intent as PromptResponse;
}

export type PromptData = Awaited<ReturnType<typeof getPrompt>>;
export type PromptError = ResponseError;

export const usePromptQuery = <TData = PromptData>(
  { id }: PromptVariables,
  {
    enabled = true,
    ...options
  }: UseQueryOptions<PromptData, PromptError, TData> = {},
) =>
  useQuery<PromptData, PromptError, TData>(
    promptIntentKeys.detail(id),
    ({ signal }) => getPrompt({ id }, signal),
    {
      enabled: enabled && typeof id !== 'undefined',
      ...options,
    },
  );
