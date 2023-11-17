import React from 'react';
import { screen, render } from '@testing-library/react';

import { AlertDialog } from '../AlertDialog';

describe('AlertDialog', () => {
  test('AlertDialog is displayed', () => {
    const alertDialog = (
      <AlertDialog
        open={false}
        onOpenChange={() => {}}
        title="hi"
        description=""
        primaryButtonText=""
        primaryAction={() => {}}
        secondaryButtonText=""
      />
    );
    render(alertDialog);
    const dialog = screen.queryByTestId('alert-dialog');
    expect(dialog).toBeDefined();
    // TODO: check for text
  });
});
