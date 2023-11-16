import { ResponseError } from '@/types/api';
import { promptKeys } from './keys';

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
};

export async function getPrompt({ id }: PromptVariables, signal?: AbortSignal) {
  if (!id) {
    throw new Error('id is required');
  }

  const { data, error } = await get(`/v1/prompts/{id}`, {
    params: { path: { id: id } },
    signal,
  });

  if (error) {
    throw error;
  }

  return data.prompt as PromptResponse;
}

export type PromptData = Awaited<ReturnType<typeof getPrompt>>;
export type PromptError = ResponseError;

export const usePromptDetailQuery = <TData = PromptData>(
  { id }: PromptVariables,
  {
    enabled = true,
    ...options
  }: UseQueryOptions<PromptData, PromptError, TData> = {},
) =>
  useQuery<PromptData, PromptError, TData>(
    promptKeys.detail(id),
    ({ signal }) => getPrompt({ id }, signal),
    {
      enabled: enabled && typeof id !== 'undefined',
      ...options,
    },
  );
