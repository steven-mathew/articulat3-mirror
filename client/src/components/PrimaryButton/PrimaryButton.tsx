import React from 'react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  buttonText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function PrimaryButton({ className, buttonText, onClick }: Props) {
  return (
    <Button
      data-testid="primary-btn"
      onClick={onClick}
      className={cn('', className)}
    >
      {buttonText}
    </Button>
  );
}
