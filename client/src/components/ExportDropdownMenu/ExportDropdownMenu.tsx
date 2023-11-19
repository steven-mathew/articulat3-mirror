import React from 'react';
import { FileImage, FileBox, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Strings from '@/locales/en.json';

interface Props {
  pngURL: string;
  objURL: string;
  mtlURL: string;
  texURL: string;
  zipURL: string;
}

const handleLocalDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
};

export function ExportDropdownMenu({
  pngURL,
  objURL,
  mtlURL,
  texURL,
  zipURL,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-testid="dropdown-menu" className="w-48">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileImage className="mr-2 h-4 w-4" />
            <span>{Strings.DropdownMenu.Export.exportAsImage}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  handleLocalDownload(
                    pngURL,
                    Strings.DropdownMenu.Export.fileName,
                  )
                }
              >
                <span>{Strings.DropdownMenu.Export.png}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileBox className="mr-2 h-4 w-4" />
            <span>{Strings.DropdownMenu.Export.exportAsMesh}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  handleLocalDownload(
                    zipURL,
                    Strings.DropdownMenu.Export.fileName,
                  )
                }
              >
                <span>{Strings.DropdownMenu.Export.meshFiles}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
