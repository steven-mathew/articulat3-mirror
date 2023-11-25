import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';

interface Props {
  object3D: Object3D;
}

export function GalleryCard({ object3D }: Props) {
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
