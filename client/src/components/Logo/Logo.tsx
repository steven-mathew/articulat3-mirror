import React from 'react';

interface LogoProps {
  className?: string;
  /**
   * The image source.
   */
  src: string;
  /**
   * The link to be redirected to when the logo is clicked.
   */
  link?: string;
}

/**
 * Displays the logo that will redirect to `link` when clicked.
 * @param props See `LogoProps`
 * @returns A Logo component
 */
export function Logo({ className, src, link }: LogoProps) {
  return (
    <div data-testid="logo">
      <a href={link} target="_blank">
        <img src={src} alt="logo" className={className} />
      </a>
    </div>
  );
}
