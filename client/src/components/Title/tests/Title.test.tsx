import React from 'react';
import { screen, render } from '@testing-library/react';

import { Title } from '../Title';

describe('Title', () => {
  test('title is displayed', () => {
    const mockText = 'mock text';
    const title = <Title prefix="" gradientText="" suffix={mockText} />;
    render(title);
    const titleText = screen.queryByTestId('title');
    expect(titleText).toBeDefined();
    expect(titleText).toHaveTextContent(mockText);
  });
});
