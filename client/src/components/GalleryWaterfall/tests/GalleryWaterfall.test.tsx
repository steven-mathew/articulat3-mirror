import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'vitest-canvas-mock';

import { Object3D } from '@/types';
import Dog from '@/assets/dog.png';
import { GalleryWaterfall } from '../GalleryWaterfall';

describe('GalleryWaterfall', () => {
  test('GalleryWaterfall is displayed', () => {
    const mockPrompt = 'mockPrompt';
    const object3D = {
      prompt: mockPrompt,
      imgSRC: Dog,
      objURL: '/sampleModel/ham_model.obj',
      mtlURL: '/sampleModel/ham_model.mtl',
      texURL: '/sampleModel/ham_model.jpg',
    } as Object3D;

    const galleryWaterfall = (
      <BrowserRouter>
        <GalleryWaterfall object3DList={[object3D]} filterValue={''} />
      </BrowserRouter>
    );
    render(galleryWaterfall);
    const galleryWaterfallRender = screen.queryByTestId('gallery-waterfall');
    expect(galleryWaterfallRender).toBeDefined();
  });
});
