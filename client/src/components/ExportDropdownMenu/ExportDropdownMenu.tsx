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

export function ExportDropdownMenu() {
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
              <DropdownMenuItem>
                <span>{Strings.DropdownMenu.Export.png}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>{Strings.DropdownMenu.Export.jpg}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>{Strings.DropdownMenu.Export.svg}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <FileBox className="mr-2 h-4 w-4" />
          <span>{Strings.DropdownMenu.Export.exportAsMesh}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
