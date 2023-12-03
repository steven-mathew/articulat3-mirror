import React from 'react';

import { Search } from '@/components/ui/search';
import { cn } from '@/lib/cn';

interface SearchBarProps {
  className?: string;
  /**
   * The current value of the input bar.
   */
  value: string;
  /**
   * Event handler called when input bar value changes.
   */
  onChange: React.FormEventHandler<HTMLInputElement>;
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
 * Displays a form input field as a search bar so users can filter through the `GalleryWaterfall`.
 * @param props See 'SearchBarProps'
 * @returns An SearchBar component
 */
export function SearchBar({
  className,
  value,
  onChange,
  enterOnChange,
  placeholder,
  disabled,
}: SearchBarProps) {
  return (
    <Search
      data-testid="search-bar"
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
