import React from 'react';
import { screen, render } from '@testing-library/react';

import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  test('Header links are displayed', () => {
    const header = (
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    render(header);

    const linkGallery = screen.queryByTestId('header-link-gallery');
    const linkCreate = screen.queryByTestId('header-link-create');

    expect(linkGallery).toBeDefined();
    expect(linkCreate).toBeDefined();

    expect(linkGallery).toHaveTextContent('Gallery');
    expect(linkCreate).toHaveTextContent('Create');
  });

  test('Header links point to correct pages', () => {
    const header = (
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    render(header);

    const linkGalleryHref = screen
      .queryByTestId('header-link-gallery')
      ?.getAttribute('href');
    const linkCreateHref = screen
      .queryByTestId('header-link-create')
      ?.getAttribute('href');

    expect(linkGalleryHref).toBe('/gallery');
    expect(linkCreateHref).toBe('/');
  });
});
