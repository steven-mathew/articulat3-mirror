import React from 'react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import InfoSVG from '@/assets/info.svg';
import DownloadSVG from '@/assets/download.svg';
import InfoDarkSVG from '@/assets/info-dark.svg';
import DownloadDarkSVG from '@/assets/download-dark.svg';

interface Props {
  className?: string;
  buttonType: IconButtonType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export enum IconButtonType {
  Info = 'INFO',
  Download = 'DOWNLOAD',
}

export function IconButton({ className, buttonType, onClick }: Props) {
  const { theme } = useTheme();
  let icon = InfoSVG;

  if (theme === 'light') {
    icon = buttonType === IconButtonType.Info ? InfoSVG : DownloadSVG;
  } else {
    icon = buttonType === IconButtonType.Info ? InfoDarkSVG : DownloadDarkSVG;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={cn('', className)}
    >
      <img src={icon} alt="icon button" />
    </Button>
  );
}
