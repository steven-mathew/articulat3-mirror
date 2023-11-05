import React, { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/cn';
import LightSVG from '@/assets/light.svg';
import DarkSVG from '@/assets/dark.svg';
import { useTheme } from '@/components/ThemeProvider';
import Strings from '@/locales/en.json';

interface Props {
  className?: string;
  label?: string;
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToggleTheme({ className, label, toggled, setToggled }: Props) {
  const { setTheme } = useTheme();
  const isLightMode = label === Strings.Global.lightMode;
  const [isLightIcon, setIcon] = useState(isLightMode);

  return (
    <div data-testid="toggle-theme" className={cn('', className)}>
      <img
        src={isLightIcon ? LightSVG : DarkSVG}
        alt="logo"
        className="h-5 w-5"
      />
      <Switch
        id="theme"
        checked={toggled}
        onCheckedChange={() => {
          setToggled(!toggled);
          setIcon(!isLightIcon);
          // Change theme to be the opposite of what theme the current icon reflects
          isLightIcon ? setTheme('dark') : setTheme('light');
        }}
      />
    </div>
  );
}
