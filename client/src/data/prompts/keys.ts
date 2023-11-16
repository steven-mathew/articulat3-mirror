export const promptKeys = {
  list: () => ['prompts'] as const,
  detail: (id: string | undefined) => ['prompts', id, 'detail'] as const,
};
