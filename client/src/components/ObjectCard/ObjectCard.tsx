import React from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ExportDropdownMenu } from '../ExportDropdownMenu';

import loadingGIF from '@/assets/loading.gif';
import { cn } from '@/lib/cn';
import { Object3D } from '@/types';

interface Props {
  isGenerating: boolean;
  object3D: Object3D;
  className?: string;
}

export function ObjectCard({
  isGenerating,
  object3D,
  className,
  ...props
}: Props) {
  return (
    <Card className={cn('md:w-[380px] w-[240px] ', className)} {...props}>
      <CardHeader>
        <CardTitle>{object3D.prompt}</CardTitle>
        {!isGenerating && <ExportDropdownMenu />}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {isGenerating ? (
            <div className="md:h-[380px] h-[240px] flex items-center justify-center">
              <img src={loadingGIF} className="h-12 w-12" alt="Loading" />
            </div>
          ) : (
            <img src={object3D.imgSRC} alt={object3D.prompt} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
