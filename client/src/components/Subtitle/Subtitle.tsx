import React from 'react';

import { cn } from '@/lib/cn';

interface SubtitleProps {
  /** Subtitle text. */
  text: string;
  className?: string;
}

/**
 * Displays subtitle text.
 * @param props See `SubtitleProps`
 * @returns A Subtitle component
 */
export function Subtitle({ text, className }: SubtitleProps) {
  return (
    <h3 data-testid="subtitle" className={cn('', className)}>
      {text}
    </h3>
  );
}
