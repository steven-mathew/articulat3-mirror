import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  className?: string;
  /**
   * The text displayed inside the button.
   */
  buttonText: string;
  /**
   * The link that clicking this button will redirect to.
   */
  linkDestination: string;
}

/**
 * Displays a button meant to be used for bold call-to-actions. Clicking the button will lead to `linkDestination`.
 * @param props See `CTAButtonProps`
 * @returns A CTAButton component
 */
export function CTAButton({
  className,
  buttonText,
  linkDestination,
}: CTAButtonProps) {
  return (
    <Link to={linkDestination}>
      <Button data-testid="cta-button" size="cta" className={cn('', className)}>
        <PlusCircle className="h-5 w-5 mr-2" />
        {buttonText}
      </Button>
    </Link>
  );
}
