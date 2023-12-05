import React, { useMemo } from 'react';

import { GalleryCard } from '../GalleryCard';

import { PromptIntent } from '@/types/api';

interface GalleryWaterfallProps {
  /**
   * A list of completed prompts corresponding to the 3D objects to display.
   */
  promptsList: PromptIntent[];
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
  promptsList,
  filterValue,
}: GalleryWaterfallProps) {
  const filteredPromptsList = useMemo(() => {
    return promptsList.filter(
      (prompt) =>
        prompt.status === 'Completed' && prompt.prompt.includes(filterValue),
    );
  }, [promptsList, filterValue]);

  return (
    <div
      data-testid="gallery-waterfall"
      className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto scrollbar-hide"
    >
      {filteredPromptsList.map((prompt, i) => (
        <GalleryCard key={i} prompt={prompt} />
      ))}
    </div>
  );
}
