import React from 'react';
import { screen, render } from '@testing-library/react';

import { PrimaryButton } from '../PrimaryButton';

describe('PrimaryButton', () => {
  test('button text is displayed', () => {
    const btnText = 'label';
    const btn = <PrimaryButton buttonText={btnText} onClick={() => {}} />;
    render(btn);
    const submitButton = screen.queryByTestId('primary-btn');
    expect(submitButton).toBeDefined();
    expect(submitButton).toHaveTextContent(btnText);
  });
});
