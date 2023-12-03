import React, { useMemo } from 'react';

import { GalleryCard } from '../GalleryCard';

import { Object3D } from '@/types';

interface GalleryWaterfallProps {
  /**
   * A list of 3D objects to display.
   */
  object3DList: Object3D[];
  /**
   * The string to filter the 3D objects by.
   */
  filterValue: string;
}

/**
 * A waterfall style grid to display all 3D objects in `object3DList`. Filters the list
 * by `filterValue` if not empty.
 * @param props See `GalleryWaterfallProps`
 * @returns A GallleryWaterfall component
 */
export function GalleryWaterfall({
  object3DList,
  filterValue,
}: GalleryWaterfallProps) {
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
