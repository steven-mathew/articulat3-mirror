import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { ResponseError } from '@/types/api';
import { promptKeys } from './keys';
import { post } from '../fetchers';

export type PromptCreateVariables = {
  prompt: string;
  // TODO: change this to the actual models we'll be using
  model: 'dreamfusion_stable-diffusion' | 'dreamfusion_deepfloyd-if';
};

export async function createPrompt({ prompt, model }: PromptCreateVariables) {
  const { data, error } = await post(`/v1/prompts`, {
    body: {
      prompt: {
        // TODO(sm): this is required field in the request, but it shouldn't be
        // remove from openapi spec
        id: 'TODO',
        prompt,
        model,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

type PromptCreateData = Awaited<ReturnType<typeof createPrompt>>;

export const usePromptCreateMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<PromptCreateData, ResponseError, PromptCreateVariables>,
  'mutationFn'
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<PromptCreateData, ResponseError, PromptCreateVariables>(
    (vars: any) => createPrompt(vars),
    {
      async onSuccess(data: any, variables: any, context: any) {
        await queryClient.invalidateQueries(
          promptKeys.list() as InvalidateQueryFilters,
        ),
          await onSuccess?.(data, variables, context);
      },
      async onError(data: any, variables: any, context: any) {
        if (onError !== undefined) {
          onError(data, variables, context);
        }
      },
      ...options,
    },
  );
};
