import React from 'react';

interface Props {
  className?: string;
  src: string;
  link?: string;
}

export function Logo({ className, src, link }: Props) {
  return (
    <div data-testid="logo">
      <a href={link} target="_blank">
        <img src={src} alt="logo" className={className} />
      </a>
    </div>
  );
}
