import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';

interface Props {
  object3D: Object3D;
}

export function GalleryCard({ object3D }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={object3D.imgSRC}
          alt={object3D.prompt}
          className="md:w-56 w-36 rounded-sm cursor-pointer border"
        />
      </DialogTrigger>
      <DialogContent className="p-0 md:w-[380px] w-[240px]">
        <ObjectCard isGenerating={false} object3D={object3D} />
      </DialogContent>
    </Dialog>
  );
}
