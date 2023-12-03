import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';

import { Button } from '@/components/ui/button';

interface AlertDialogProps {
  /**
   * The controlled open state of the dialog. Must be used in conjunction with `onOpenChange`.
   * */
  open: boolean;
  /**
   * Event handler called when the open state of the dialog changes.
   */
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * The title displayed in the dialog content.
   */
  title: string;
  /**
   * The desscription displayed in the dialog content.
   */
  description: string;
  /**
   * The text displayed inside the primary button of the dialog.
   */
  primaryButtonText: string;
  /**
   * The action for `primaryButtonText`.
   */
  primaryAction: () => void;
  /**
   * The text displayed inside the secondary button of the dialog.
   */
  secondaryButtonText: string;
}

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 * @param props See `AlertDialogProps`
 * @returns An AlertDialog component
 */
export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  primaryButtonText,
  primaryAction,
  secondaryButtonText,
}: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="alert-dialog" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* By default secondary action closes the dialog */}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {secondaryButtonText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={primaryAction}>{primaryButtonText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
