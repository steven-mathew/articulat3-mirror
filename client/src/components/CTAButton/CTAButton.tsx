import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  buttonText: string;
  linkDestination: string;
}

export function CTAButton({ className, buttonText, linkDestination }: Props) {
  return (
    <Link to={linkDestination}>
      <Button size="cta" className={cn('', className)}>
        <PlusCircle className="h-5 w-5 mr-2" />
        {buttonText}
      </Button>
    </Link>
  );
}
