import React, { useEffect, useState } from 'react';
import { Object3D } from '@/types';
import { useSendMessage, useWebsocket, useWebsocketPing } from '@/lib/hooks/use-websocket';
import { Loader2 } from 'lucide-react';

interface ObjectCardProps {
    /**
     * The unique identifier for this object.
     */
     promptId: string;
     /**
     * The 3D object to be displayed.
     */
     object3D: Object3D;
}

/**
 * Displays a card that shows the progress of the generation.
 *
 * @param props See `ObjectCardProps`
 * @returns An ObjectCard component
 */
export function GeneratingCard({ promptId }: ObjectCardProps ) {
  const [blob, setBlob] = useState("");

  const webSocketRef = useWebsocket(`/events?client-id=${promptId}`)
  useWebsocketPing(webSocketRef)
  const sendMessage = useSendMessage(webSocketRef)

  useEffect(() => {
    const handler = (event: MessageEvent<any>) => {
      try {

        // FIXME: this is very hacky, we're just checking if there's a lot of data
        // to guess if there's an image or not.
        if (event.data.byteLength > 5000) {
            const blobData = new Blob([event.data])
            const srcBlob = URL.createObjectURL(blobData);

            setBlob(srcBlob);
        }
      } catch (err: any) {
        console.warn(
          'Invalid message: ' + event.data + '\n' + (err?.stack ?? '')
        )
      }
    }

    const websocket = webSocketRef.current
    if (websocket) {
      websocket.addEventListener('message', handler)
    }

    return () => websocket && websocket.removeEventListener('message', handler)
  }, [sendMessage, webSocketRef])


  return (
  <>
   {blob && <div>
    <img src={blob} alt="loading..."/>
    </div>}
    {!blob && <div className="md:h-[380px] h-[240px] flex items-center justify-center">
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />
     </div>}
  </>
  );
}
