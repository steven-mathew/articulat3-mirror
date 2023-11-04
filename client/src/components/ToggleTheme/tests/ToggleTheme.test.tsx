import React from 'react';
import { screen, render } from '@testing-library/react';
import Strings from '@/locales/en.json';

import { ToggleTheme } from '../ToggleTheme';

describe('ToggleTheme', () => {
  test('toggle theme is displayed', () => {
    const label = Strings.Global.lightMode;
    const toggleTheme = (
      <ToggleTheme toggled={true} label={label} setToggled={() => {}} />
    );
    render(toggleTheme);
    const toggleThemeItem = screen.queryByTestId('toggle-theme');
    expect(toggleThemeItem).toBeDefined();
    const toggleThemeButton = toggleThemeItem?.querySelector('button');
    expect(toggleThemeButton).toHaveValue('on');
  });
});
