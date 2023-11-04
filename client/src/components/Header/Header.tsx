import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ToggleTheme } from '../ToggleTheme';

import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/Logo';
import LogoSVG from '@/assets/logo.svg';
import Strings from '@/locales/en.json';
import { useTheme } from '@/components/ThemeProvider';

export function Header() {
  const { theme } = useTheme();
  const [isLightMode, setIsLightMode] = useState(theme === 'light');

  return (
    <header className="container h-24 px-5 m-auto sm:px-6 md:px-20 max-w-screen-xl">
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
          <Link data-testid="header-link-gallery" to="/gallery">
            <Badge>{Strings.Global.gallery}</Badge>
          </Link>
          <Link data-testid="header-link-create" to="/">
            <Badge>{Strings.Global.create}</Badge>
          </Link>
        </div>
        <div className="flex items-center w-32 justify-center space-x-2 md:space-x-4">
          <ToggleTheme
            toggled={isLightMode}
            setToggled={setIsLightMode}
            label={
              isLightMode ? Strings.Global.lightMode : Strings.Global.darkMode
            }
          />
        </div>
      </nav>
    </header>
  );
}
