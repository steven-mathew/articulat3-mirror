import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { ObjectCard } from '@/components/ObjectCard';

interface Props {
  // When integrating with backend, we should pass in an Object containing these parameters
  prompt: string;
  img: string;
}

export function GalleryCard({ prompt, img }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={img}
          alt={prompt}
          className="md:w-56 w-36 rounded-sm cursor-pointer border"
        />
      </DialogTrigger>
      <DialogContent className="p-0 md:w-[380px] w-[240px]">
        <ObjectCard isGenerating={false} prompt={prompt} img={img} />
      </DialogContent>
    </Dialog>
  );
}
