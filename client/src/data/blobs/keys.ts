export const blobKeys = {
  list: () => ['blobs'] as const,
  detail: (id: string | undefined) => ['blobs', id, 'detail'] as const,
};
