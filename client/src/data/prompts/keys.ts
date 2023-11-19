export const promptIntentKeys = {
  list: () => ['prompt_intents'] as const,
  detail: (id: string | undefined) => ['prompt_intents', id, 'detail'] as const,
};
