import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';

interface GalleryCardProps {
  /**
   * The 3D object to be displayed.
   */
  object3D: Object3D;
}

/**
 * A card that displays the `object3D` thumbnail and displays the prompt on hover.
 * Clicking on the card will open up the `ObjectCard` component.
 * @param props See `GalleryCardProps`
 * @returns A GalleryCard component
 */
export function GalleryCard({ object3D }: GalleryCardProps) {
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
