import React from 'react';
import { FileImage, FileBox, Download, Files } from 'lucide-react';

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
}

const handleLocalDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
};

export function ExportDropdownMenu({ pngURL, objURL, mtlURL, texURL }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-testid="dropdown-menu" className="w-48">
        <DropdownMenuItem
          onClick={() =>
            handleLocalDownload(pngURL, Strings.DropdownMenu.Export.pngFileName)
          }
        >
          <FileImage className="mr-2 h-4 w-4" />
          <span>{Strings.DropdownMenu.Export.exportThumbnail}</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileBox className="mr-2 h-4 w-4" />
            <span>{Strings.DropdownMenu.Export.exportObject}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  handleLocalDownload(
                    objURL,
                    Strings.DropdownMenu.Export.objFileName,
                  )
                }
              >
                <span>{Strings.DropdownMenu.Export.exportModel}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleLocalDownload(
                    mtlURL,
                    Strings.DropdownMenu.Export.mtlFileName,
                  )
                }
              >
                <span>{Strings.DropdownMenu.Export.exportMaterial}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleLocalDownload(
                    texURL,
                    Strings.DropdownMenu.Export.texFileName,
                  )
                }
              >
                <span>{Strings.DropdownMenu.Export.exportTexture}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
          <DropdownMenuItem
            onClick={() => {
              handleLocalDownload(
                pngURL,
                Strings.DropdownMenu.Export.pngFileName,
              );
              handleLocalDownload(
                objURL,
                Strings.DropdownMenu.Export.objFileName,
              );
              handleLocalDownload(
                mtlURL,
                Strings.DropdownMenu.Export.mtlFileName,
              );
              handleLocalDownload(
                texURL,
                Strings.DropdownMenu.Export.texFileName,
              );
            }}
          >
            <Files className="mr-2 h-4 w-4" />
            <span>{Strings.DropdownMenu.Export.exportAll}</span>
          </DropdownMenuItem>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
