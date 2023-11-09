import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import React from 'react';

const TOAST_DURATION = 5000; // milliseconds

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="up">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} duration={TOAST_DURATION}>
            <div className="gap-2 flex items-center">
              {props.variant && props.variant == 'default' && (
                <CheckCircle2 className="h-7 w-7" />
              )}
              {props.variant && props.variant == 'destructive' && (
                <AlertTriangle className="h-7 w-7" />
              )}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
