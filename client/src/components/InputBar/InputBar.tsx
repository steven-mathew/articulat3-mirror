import React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';

interface InputBarProps {
  className?: string;
  /**
   * The current value of the input bar.
   */
  value: string;
  /**
   * Event handler called when input bar value changes.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The action called when user presses enter.
   */
  enterOnChange: () => void;
  /**
   * The placeholder text for an empty input bar.
   */
  placeholder?: string;
  /**
   * The disabled state of the input bar.
   */
  disabled?: boolean;
}

/**
 * Displays a form input field to register user's prompt to begin the 3D object
 * generation process.
 * @param props See 'InputBarProps'
 * @returns An InputBar component
 */
export function InputBar({
  className,
  value,
  onChange,
  enterOnChange,
  placeholder,
  disabled,
}: InputBarProps) {
  return (
    <Input
      data-testid="input-bar"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          // Stops event from being registered twice
          event.preventDefault();
          enterOnChange();
        }
      }}
      placeholder={placeholder}
      className={cn('', className)}
      disabled={disabled}
    />
  );
}
