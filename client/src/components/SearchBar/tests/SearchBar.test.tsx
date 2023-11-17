import React from 'react';
import { screen, render } from '@testing-library/react';

import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  test('SearchBar is displayed', () => {
    const mockInput = 'mock input';
    const searchBar = (
      <SearchBar
        value={mockInput}
        onChange={() => {}}
        enterOnChange={() => {}}
      />
    );
    render(searchBar);
    const input = screen.queryByTestId('search-bar');
    expect(input).toBeDefined();
    expect(input).toHaveValue(mockInput);
  });
});
