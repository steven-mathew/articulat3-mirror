import { ResponseError } from '@/types/api';
import { blobKeys } from './keys';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { get } from '../fetchers';

export type BlobVariables = {
  id?: string;
};

export type BlobResponse = string

export async function getBlob({ id }: BlobVariables, signal?: AbortSignal) {
  if (!id) {
    throw new Error('id is required');
  }

  const { data, error } = await get(`/v1/blobs/{id}`, {
    params: { path: { id: id } },
    signal,
  });

  if (error) {
    throw error;
  }

  // FIXME: 'BlobResponse' returns just a signed URL for now
  // D4/5 extension
  return (data as unknown) as BlobResponse;
}

export type BlobData = Awaited<ReturnType<typeof getBlob>>;
export type BlobError = ResponseError;

export const useBlobQuery = <TData = BlobData>(
  { id }: BlobVariables,
  {
    enabled = true,
    ...options
  }: UseQueryOptions<BlobData, BlobError, TData> = {},
) =>
  useQuery<BlobData, BlobError, TData>(
    blobKeys.detail(id),
    ({ signal }) => getBlob({ id }, signal),
    {
      enabled: enabled && typeof id !== 'undefined',
      ...options,
    },
  );
