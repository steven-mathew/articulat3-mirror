import React from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ExportDropdownMenu } from '../ExportDropdownMenu';

import loadingGIF from '@/assets/loading.gif';
import { cn } from '@/lib/cn';

interface Props {
  isGenerating: boolean;
  // When integrating with backend, we should pass in an Object containing these parameters
  prompt: string;
  img: string;
  className?: string;
}

export function ObjectCard({
  isGenerating,
  prompt,
  img,
  className,
  ...props
}: Props) {
  return (
    <Card className={cn('md:w-[380px] w-[240px] ', className)} {...props}>
      <CardHeader>
        <CardTitle>{prompt}</CardTitle>
        {!isGenerating && <ExportDropdownMenu />}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {isGenerating ? (
            <div className="md:h-[380px] h-[240px] flex items-center justify-center">
              <img src={loadingGIF} className="h-12 w-12" alt="Loading" />
            </div>
          ) : (
            <img src={img} alt="Sample dog PNG" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
