import React from 'react';
import { screen, render } from '@testing-library/react';

import { Subtitle } from '../Subtitle';

describe('Subtitle', () => {
  test('subtitle is displayed', () => {
    const mockText = 'mock text';
    const subtitle = <Subtitle text={mockText} />;
    render(subtitle);
    const subtitleText = screen.queryByTestId('subtitle');
    expect(subtitleText).toBeDefined();
    expect(subtitleText).toHaveTextContent(mockText);
  });
});
