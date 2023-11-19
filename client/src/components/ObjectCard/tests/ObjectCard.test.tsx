import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'vitest-canvas-mock';

import { ObjectCard } from '../ObjectCard';
import { Object3D } from '@/types';
import Dog from '@/assets/dog.png';

describe('ObjectCard', () => {
  test('ObjectCard is displayed', () => {
    const mockPrompt = 'mockPrompt';
    const object3D = {
      prompt: mockPrompt,
      imgSRC: Dog,
      objURL: '/sampleModel/ham_model.obj',
      mtlURL: '/sampleModel/ham_model.mtl',
      texURL: '/sampleModel/ham_model.jpg',
    } as Object3D;

    const objectCard = (
      <BrowserRouter>
        <ObjectCard isGenerating={false} object3D={object3D} />
      </BrowserRouter>
    );
    render(objectCard);
    const objectCardRender = screen.queryByTestId('object-card');
    expect(objectCardRender).toBeDefined();
    expect(objectCardRender).toHaveTextContent(mockPrompt);
  });
});
