import React from 'react';

import { cn } from '@/lib/cn';

interface Props {
  prefix: string;
  gradientText: string;
  suffix: string;
  className?: string;
}

export function Title({ prefix, gradientText, suffix, className }: Props) {
  return (
    <h1 data-testid="title" className={cn('', className)}>
      {prefix}
      <span className="gradient-text">{gradientText}</span>
      {suffix}
    </h1>
  );
}
