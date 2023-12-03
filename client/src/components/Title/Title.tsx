import React from 'react';

import { cn } from '@/lib/cn';

interface TitleProps {
  /**
   * Basic (non-gradient) text at the start of the title.
   */
  prefix: string;
  /**
   * Text with the gradient effect.
   */
  gradientText: string;
  /**
   * Basic (non-gradient) text at the end of the title.
   */
  suffix: string;
  className?: string;
}

/**
 * Displays title text with the option to apply the gradient effect on part of the title.
 * @param props See `TitleProps`
 * @returns A Title component
 */
export function Title({ prefix, gradientText, suffix, className }: TitleProps) {
  return (
    <h1 data-testid="title" className={cn('', className)}>
      {prefix}
      <span className="gradient-text">{gradientText}</span>
      {suffix}
    </h1>
  );
}
