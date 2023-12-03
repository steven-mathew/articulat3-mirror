import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/cn';
import { useTheme } from '@/components/ThemeProvider';
import Strings from '@/locales/en.json';

interface ToggleThemeProps {
  className?: string;
  /**
   * The label indicating the current theme of the web application.
   * Can be either `Strings.Global.lightMode` or `Strings.Global.darkMode`.
   */
  label?: string;
  /**
   * The toggled state of the switch. Must be used in conjunction with `setToggled`.
   */
  toggled: boolean;
  /**
   * Event handler called when the state of the switch changes.
   */
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Displays a control that allows the user to toggle between light and dark mode.
 * @param props See `ToggleThemeProps`
 * @returns A ToggleTheme component
 */
export function ToggleTheme({
  className,
  label,
  toggled,
  setToggled,
}: ToggleThemeProps) {
  const { setTheme } = useTheme();
  const isLightMode = label === Strings.Global.lightMode;
  const [isLightIcon, setIcon] = useState(isLightMode);

  return (
    <div data-testid="toggle-theme" className={cn('', className)}>
      {isLightIcon ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
