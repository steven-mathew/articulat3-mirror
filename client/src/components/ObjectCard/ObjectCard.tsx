import React from 'react';

import { ThreeComponent } from '@/components/ThreeComponent';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ExportDropdownMenu } from '../ExportDropdownMenu';

import loadingGIF from '@/assets/loading.gif';
import BurgerPNG from '@/assets/burger.png';
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
    <Card
      data-testid="object-card"
      className={cn('md:w-[380px] w-[240px] ', className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>{object3D.prompt}</CardTitle>
        {!isGenerating && (
          <ExportDropdownMenu
            // TODO: replace with db fetch
            pngURL={BurgerPNG}
            objURL="/sampleModel/ham_model.obj"
            mtlURL="/sampleModel/ham_model.mtl"
            texURL="/sampleModel/ham_model.jpg"
            zipURL="/sampleModel/ham_model.zip"
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {isGenerating ? (
            <div className="md:h-[380px] h-[240px] flex items-center justify-center">
              <img src={loadingGIF} className="h-12 w-12" alt="Loading" />
            </div>
          ) : (
            object3D.objURL && (
              <ThreeComponent
                objURL={object3D.objURL}
                mtlURL={object3D.mtlURL}
                texURL={object3D.texURL}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
