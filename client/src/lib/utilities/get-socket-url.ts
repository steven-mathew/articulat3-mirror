// Derived from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/react-dev-overlay/internal/helpers/get-socket-url.ts#L12
import { API_URL } from '@/lib/constants';


function getSocketProtocol(assetPrefix: string): string {
  let protocol = window.location.protocol

  try {
    // assetPrefix is a url
    protocol = new URL(assetPrefix).protocol
  } catch {}

  return protocol === 'http:' ? 'ws' : 'wss'
}

export function getSocketUrl(assetPrefix: string): string {
  const { hostname, port } = API_URL ? new URL(API_URL) : window.location

  const protocol = getSocketProtocol(assetPrefix)
  const normalizedAssetPrefix = assetPrefix.replace(/^\/+/, '')

  let url = `${protocol}://${hostname}:${port}${
    normalizedAssetPrefix ? `/${normalizedAssetPrefix}` : ''
  }`

  if (normalizedAssetPrefix.startsWith('http')) {
    url = `${protocol}://${normalizedAssetPrefix.split('://', 2)[1]}`
  }

  return url
}
