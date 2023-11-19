import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'vitest-canvas-mock';

import { Object3D } from '@/types';
import Dog from '@/assets/dog.png';
import { ThreeComponent } from '../ThreeComponent';

describe('ThreeComponent', () => {
  test('ThreeComponent is displayed', () => {
    const mockPrompt = 'mockPrompt';
    const object3D = {
      prompt: mockPrompt,
      imgSRC: Dog,
      objURL: '/sampleModel/ham_model.obj',
      mtlURL: '/sampleModel/ham_model.mtl',
      texURL: '/sampleModel/ham_model.jpg',
    } as Object3D;

    const threeComponent = (
      <BrowserRouter>
        <ThreeComponent
          objURL={object3D.objURL}
          mtlURL={object3D.mtlURL}
          texURL={object3D.texURL}
        />
      </BrowserRouter>
    );
    render(threeComponent);
    const threeComponentRender = screen.queryByTestId('three-component');
    expect(threeComponentRender).toBeDefined();
  });
});
