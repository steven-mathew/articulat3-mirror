import * as React from 'react';

import { cn } from '@/lib/cn';

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md bg-card border-input px-6 py-2 text-sm text-card-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-card-foreground placeholder:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Search.displayName = 'Search';

export { Search };
