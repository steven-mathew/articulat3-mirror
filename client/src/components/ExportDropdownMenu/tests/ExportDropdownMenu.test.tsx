import React from 'react';
import { screen, render } from '@testing-library/react';

import { ExportDropdownMenu } from '../ExportDropdownMenu';

// import Strings from '@/locales/en.json';

describe('ExportDropdownMenu', () => {
  test('ExportDropdownMenu displays correct options', () => {
    const exportDropdownMenu = <ExportDropdownMenu />;
    render(exportDropdownMenu);
    const dropdownMenu = screen.queryByTestId('dropdown-menu');
    expect(dropdownMenu).toBeDefined();

    // TODO: check for text in the dropdown menu
    // expect(dropdownMenu).toHaveTextContent(
    //   Strings.DropdownMenu.Export.exportAsImage,
    // );
    // expect(dropdownMenu).toHaveTextContent(Strings.DropdownMenu.Export.png);
    // expect(dropdownMenu).toHaveTextContent(Strings.DropdownMenu.Export.jpg);
    // expect(dropdownMenu).toHaveTextContent(Strings.DropdownMenu.Export.svg);
    // expect(dropdownMenu).toHaveTextContent(
    //   Strings.DropdownMenu.Export.exportAsMesh,
    // );
  });
});
