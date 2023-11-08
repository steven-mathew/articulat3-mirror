import React from 'react';

import { GalleryCard } from '../GalleryCard';

import { Object3D } from '@/types';

interface Props {
  object3DList: Object3D[];
}

export function GalleryWaterfall({ object3DList }: Props) {
  return (
    <div className="my-4 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {object3DList.map((object3D, i) => (
        <GalleryCard key={i} object3D={object3D} />
      ))}
    </div>
  );
}
