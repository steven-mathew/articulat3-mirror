import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  imgSrc?: string;
  buttonText: string;
  linkDestination: string;
}

export function CTAButton({
  className,
  imgSrc,
  buttonText,
  linkDestination,
}: Props) {
  return (
    <Link to={linkDestination}>
      <Button size="cta" className={cn('', className)}>
        <img src={imgSrc} alt="CTA logo" className="h-5 w-5 mr-2" />
        {buttonText}
      </Button>
    </Link>
  );
}
