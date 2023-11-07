import React from 'react';

import { Search } from '@/components/ui/search';
import { cn } from '@/lib/cn';

interface Props {
  className?: string;
  value: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
  enterOnChange: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchBar({
  className,
  value,
  onChange,
  enterOnChange,
  placeholder,
  disabled,
}: Props) {
  return (
    <Search
      data-testid="searchbar"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') enterOnChange();
      }}
      placeholder={placeholder}
      className={cn('', className)}
      disabled={disabled}
    />
  );
}
