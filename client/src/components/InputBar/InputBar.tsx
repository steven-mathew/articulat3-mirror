import React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';

interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  enterOnChange: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function InputBar({
  className,
  value,
  onChange,
  enterOnChange,
  placeholder,
  disabled,
}: Props) {
  return (
    <Input
      data-testid="input-bar"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // stops event from being registered twice
          enterOnChange();
        }
      }}
      placeholder={placeholder}
      className={cn('', className)}
      disabled={disabled}
    />
  );
}
