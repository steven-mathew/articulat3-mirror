import React from 'react';

import { cn } from '@/lib/cn';

interface Props {
  gradientText: string;
  text: string;
  className?: string;
}

export function Title({ gradientText, text, className }: Props) {
  return (
    <h1 data-testid="title" className={cn('', className)}>
      <span className="gradient-text">{gradientText}</span>
      {text}
    </h1>
  );
}
