import React from 'react';

import { cn } from '@/lib/cn';

interface Props {
  text: string;
  className?: string;
}

export function Subtitle({ text, className }: Props) {
  return (
    <h3 data-testid="subtitle" className={cn('', className)}>
      {text}
    </h3>
  );
}
