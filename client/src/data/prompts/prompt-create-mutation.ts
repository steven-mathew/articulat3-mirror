import {
  InvalidateQueryFilters,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { ResponseError } from '@/types/api';
import { promptIntentKeys } from './keys';
import { post } from '../fetchers';

export type PromptCreateVariables = {
  prompt: string;
  model: 'mvdream-sd21';
};

export async function createPromptIntent({ prompt, model }: PromptCreateVariables) {
  const { data, error } = await post(`/v1/prompt_intents`, {
    body: {
      prompt_intent: {
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

type PromptCreateData = Awaited<ReturnType<typeof createPromptIntent>>;

export const usePromptIntentCreateMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<PromptCreateData, ResponseError, PromptCreateVariables>,
  'mutationFn'
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<PromptCreateData, ResponseError, PromptCreateVariables>(
    (vars: any) => createPromptIntent(vars),
    {
      async onSuccess(data: any, variables: any, context: any) {
        await queryClient.invalidateQueries(
          promptIntentKeys.list() as InvalidateQueryFilters,
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
