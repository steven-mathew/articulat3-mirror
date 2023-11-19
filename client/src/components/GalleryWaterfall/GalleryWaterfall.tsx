import React, { useMemo } from 'react';

import { GalleryCard } from '../GalleryCard';

import { Object3D } from '@/types';

interface Props {
  object3DList: Object3D[];
  filterValue: string;
}

export function GalleryWaterfall({ object3DList, filterValue }: Props) {
  const filteredObject3DList = useMemo(() => {
    return object3DList.filter((object3D) =>
      object3D.prompt.includes(filterValue),
    );
  }, [object3DList, filterValue]);

  return (
    <div
      data-testid="gallery-waterfall"
      className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto scrollbar-hide"
    >
      {filteredObject3DList.map((object3D, i) => (
        <GalleryCard key={i} object3D={object3D} />
      ))}
    </div>
  );
}
