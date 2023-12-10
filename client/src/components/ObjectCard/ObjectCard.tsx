import React from 'react';
import { Loader2, XOctagon } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ExportDropdownMenu } from '../ExportDropdownMenu';

import { ThreeComponent } from '@/components/ThreeComponent';
import { cn } from '@/lib/cn';
import { Object3D } from '@/types';
import { GeneratingCard } from '../GeneratingCard';

interface ObjectCardProps {
  /**
   * If true, the loading icon will be displayed in place of the 3D object.
   */
  isGenerating: boolean;
  /**
   * The 3D object to be displayed.
   */
  object3D: Object3D;
  promptId?: string;
  className?: string;
}

/**
 * Displays a card with the object prompt as the header, an ExportDropdownMenu button,
 * and the 3D object model that is interactable.
 * @param props See `ObjectCardProps`
 * @returns An ObjectCard component
 */

export function ObjectCard({
  isGenerating,
  object3D,
  promptId,
  className,
  ...props
}: ObjectCardProps) {
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
            pngURL={object3D.imgSRC}
            objURL={object3D.objURL}
            mtlURL={object3D.mtlURL}
            texURL={object3D.texURL}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border md:h-[380px] h-[240px] bg-card">
          {isGenerating && promptId && (
            <div className="md:h-[380px] h-[240px] flex items-center justify-center">
              <GeneratingCard promptId={promptId} object3D={object3D} />
            </div>
          )}
          {isGenerating && !promptId && (
            <div className="md:h-[380px] h-[240px] flex items-center justify-center">
              <Loader2 className="mr-2 h-12 w-12 animate-spin" />
            </div>
          )}
          {!isGenerating && object3D.objURL && (
            <ThreeComponent
              objURL={object3D.objURL}
              mtlURL={object3D.mtlURL}
              texURL={object3D.texURL}
            />
          )}
          {!isGenerating && !object3D.objURL && (
            <div className="md:h-[380px] h-[240px] flex flex-col gap-y-4 items-center justify-center">
              <XOctagon className="mr-2 h-12 w-12" />
              <p className="text-center w-3/4">
                Something went wrong! Your object is currently unavailable.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
