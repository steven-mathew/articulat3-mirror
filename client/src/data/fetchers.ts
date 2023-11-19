// Derived from https://github.com/supabase/supabase/blob/master/apps/studio/data/fetchers.ts

import { API_URL } from '@/lib/constants';
import { uuidv4 } from '@/lib/utilities/uuidv4';
import createClient from 'openapi-fetch';
import { paths } from './api'; // generated from openapi-typescript

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const {
  get: _get,
  post: _post,
  put: _put,
  patch: _patch,
  del: _del,
  head: _head,
  trace: _trace,
  options: _options,
} = createClient<paths>({
  baseUrl: API_URL,
  referrerPolicy: 'no-referrer-when-downgrade',
  headers: DEFAULT_HEADERS,
});

export async function constructHeaders(headersInit?: HeadersInit | undefined) {
  const requestId = uuidv4();
  const headers = new Headers(headersInit);

  headers.set('X-Request-Id', requestId);

  return headers;
}

export const get: typeof _get = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  if (url.startsWith('/v1/blobs')) {
      // @ts-ignore
      url = "https://articulate.fly.dev/" + url
  }

  return await _get(url, {
    ...init,
    headers,
  });
};

export const post: typeof _post = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _post(url, {
    ...init,
    headers,
  });
};

export const put: typeof _put = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _put(url, {
    ...init,
    headers,
  });
};

export const patch: typeof _patch = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _patch(url, {
    ...init,
    headers,
  });
};

export const del: typeof _del = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _del(url, {
    ...init,
    headers,
  });
};

export const head: typeof _head = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _head(url, {
    ...init,
    headers,
  });
};

export const trace: typeof _trace = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _trace(url, {
    ...init,
    headers,
  });
};

export const options: typeof _options = async (url, init) => {
  const headers = await constructHeaders(init?.headers);

  return await _options(url, {
    ...init,
    headers,
  });
};
