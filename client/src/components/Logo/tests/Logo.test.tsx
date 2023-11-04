import React from 'react';
import { screen, render } from '@testing-library/react';

import { Logo } from '../Logo';

describe('Logo', () => {
  test('logo is displayed', () => {
    const logo = <Logo src="" />;
    render(logo);
    const logoImg = screen.queryByTestId('logo');
    expect(logoImg).toBeDefined();
  });
});
