import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ToggleTheme } from '../ToggleTheme';

import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/Logo';
import LogoSVG from '@/assets/logo.svg';
import Strings from '@/locales/en.json';
import { useTheme } from '@/components/ThemeProvider';

/**
 * Displays the navigation bar on the top of the screen. The navigation bar includes
 * the logo on the left, the Create and Gallery links in the center, and the Light/Dark
 * mode toggle on the right.
 * @returns A Header component
 */
export function Header() {
  const { theme } = useTheme();
  const [isLightMode, setIsLightMode] = useState(theme === 'light');

  return (
    <header className="container h-20 px-5 m-auto sm:px-6 md:px-20 max-w-screen-xl">
      <nav
        className="flex justify-between items-center h-full mt-auto text-sm space-x-6 sm:space-x-0 md:justify-between"
        aria-label="Main Navigation"
      >
        <Logo
          className="flex-none w-32"
          src={LogoSVG}
          link="https://github.com/csc301-2023-fall/project-44-toronto-intelligence-m"
        />
        <div className="md:space-x-8 sm:space-x-2">
          <Link data-testid="header-link-create" to="/">
            <Badge>{Strings.Global.create}</Badge>
          </Link>
          <Link data-testid="header-link-gallery" to="/gallery">
            <Badge>{Strings.Global.gallery}</Badge>
          </Link>
        </div>
        <ToggleTheme
          toggled={isLightMode}
          setToggled={setIsLightMode}
          label={
            isLightMode ? Strings.Global.lightMode : Strings.Global.darkMode
          }
          className="flex items-center justify-end w-32 space-x-2 md:space-x-4"
        />
      </nav>
    </header>
  );
}
