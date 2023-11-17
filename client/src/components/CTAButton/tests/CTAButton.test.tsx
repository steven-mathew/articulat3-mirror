import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CTAButton } from '../CTAButton';

describe('CTAButton', () => {
  test('CTAButton is displayed', () => {
    const mockText = 'Call to action';
    const mockLink = '/';
    const button = (
      <BrowserRouter>
        <CTAButton buttonText={mockText} linkDestination={mockLink} />
      </BrowserRouter>
    );
    render(button);
    const CTAButtonText = screen.queryByTestId('cta-button');
    expect(CTAButtonText).toBeDefined();
    expect(CTAButtonText).toHaveTextContent(mockText);
  });
});
