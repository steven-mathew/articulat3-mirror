import React from 'react';
import { screen, render } from '@testing-library/react';

import { InputBar } from '../InputBar';

describe('InputBar', () => {
  test('input bar is displayed', () => {
    const mockInput = 'mock input';
    const inputBar = (
      <InputBar
        value={mockInput}
        onChange={() => {}}
        enterOnChange={() => {}}
      />
    );
    render(inputBar);
    const input = screen.queryByTestId('input-bar');
    expect(input).toBeDefined();
    expect(input).toHaveValue(mockInput);
  });
});
