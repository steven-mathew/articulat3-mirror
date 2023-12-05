import React, { useMemo } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';
import { PromptIntent } from '@/types/api';
import { useBlobQuery } from '@/data/blobs/blob-query';
import { isDefined } from '@/lib/utilities/is-defined';

interface GalleryCardProps {
  /**
   * The prompt object for the corresponding 3D object to be displayed.
   */
  prompt: PromptIntent;
}

/**
 * A card that displays the 3D object thumbnail and displays the prompt on hover.
 * Clicking on the card will open up the `ObjectCard` component.
 * @param props See `GalleryCardProps`
 * @returns A GalleryCard component
 */
export function GalleryCard({ prompt }: GalleryCardProps) {
  const promptId = prompt.id;

  // Defining the blob IDs for the different files
  const blobThumbnailId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_thumbnail.png`;
  }, [promptId]);
  const blobObjectId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_model.obj`;
  }, [promptId]);
  const blobTextureId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_texture_kd.jpg`;
  }, [promptId]);
  const blobMaterialId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_model.mtl`;
  }, [promptId]);

  // Hook to get thumbnail
  const { data: blobThumbnailURL } = useBlobQuery(
    { id: blobThumbnailId },
    { enabled: prompt.status === 'Completed' },
  );

  // Hook to get object
  const { data: blobObjectURL } = useBlobQuery(
    { id: blobObjectId },
    { enabled: prompt.status === 'Completed' },
  );

  // Hook to get texture
  const { data: blobTextureURL } = useBlobQuery(
    { id: blobTextureId },
    { enabled: prompt.status === 'Completed' },
  );

  // Hook to get material
  const { data: blobMaterialURL } = useBlobQuery(
    { id: blobMaterialId },
    { enabled: prompt.status === 'Completed' },
  );

  const object3D = useMemo(() => {
    return {
      imgSRC: blobThumbnailURL,
      prompt: prompt.prompt,
      objURL: blobObjectURL,
      mtlURL: blobMaterialURL,
      texURL: blobTextureURL,
    } as Object3D;
  }, [
    prompt.prompt,
    blobThumbnailURL,
    blobObjectURL,
    blobMaterialURL,
    blobTextureURL,
  ]);

  return (
    <Dialog data-testid="gallery-card">
      <DialogTrigger asChild>
        <div className="relative m-1 rounded-sm cursor-pointer border">
          <div className="absolute inset-0 flex items-center justify-center text-center z-10 hover:bg-card text-card-foreground opacity-0 hover:opacity-70">
            <p className="font-mono p-2">{object3D.prompt}</p>
          </div>
          <img
            src={object3D.imgSRC}
            alt={object3D.prompt}
            className="rounded-sm"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 md:w-[380px] w-[240px]">
        <ObjectCard isGenerating={false} object3D={object3D} />
      </DialogContent>
    </Dialog>
  );
}
