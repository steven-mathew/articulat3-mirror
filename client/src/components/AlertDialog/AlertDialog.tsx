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

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryAction: () => void;
  secondaryButtonText: string;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  primaryButtonText,
  primaryAction,
  secondaryButtonText,
}: Props) {
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
