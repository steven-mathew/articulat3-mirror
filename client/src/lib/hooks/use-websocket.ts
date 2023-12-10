import { useCallback, useEffect, useRef } from 'react'
import { getSocketUrl } from '@/lib/utilities/get-socket-url'

export function useWebsocket(assetPrefix: string) {
  const webSocketRef = useRef<WebSocket>()

  useEffect(() => {
    if (webSocketRef.current) {
      return
    }

    const url = getSocketUrl(assetPrefix)

    webSocketRef.current = new window.WebSocket(`${url}`)
    webSocketRef.current.binaryType = 'arraybuffer'
  }, [assetPrefix])

  return webSocketRef
}

export function useSendMessage(webSocketRef: ReturnType<typeof useWebsocket>) {
  const sendMessage = useCallback(
    (data: string) => {
      const socket = webSocketRef.current
      if (!socket || socket.readyState !== socket.OPEN) {
        return
      }
      return socket.send(data)
    },
    [webSocketRef]
  )
  return sendMessage
}

export function useWebsocketPing(
  websocketRef: ReturnType<typeof useWebsocket>
) {
  const sendMessage = useSendMessage(websocketRef)

  useEffect(() => {
    // Taken from on-demand-entries-client.js
    const interval = setInterval(() => {
      sendMessage(
        JSON.stringify({
          event: 'ping',
        })
      )
    }, 2500)
    return () => clearInterval(interval)
  }, [sendMessage])
}
