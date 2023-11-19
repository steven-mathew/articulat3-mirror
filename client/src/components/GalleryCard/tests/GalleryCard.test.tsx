import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'vitest-canvas-mock';

import { GalleryCard } from '../GalleryCard';
import { Object3D } from '@/types';
import Dog from '@/assets/dog.png';

describe('GalleryCard', () => {
  test('GalleryCard is displayed', () => {
    const mockPrompt = 'mockPrompt';
    const object3D = {
      prompt: mockPrompt,
      imgSRC: Dog,
      objURL: '/sampleModel/ham_model.obj',
      mtlURL: '/sampleModel/ham_model.mtl',
      texURL: '/sampleModel/ham_model.jpg',
    } as Object3D;

    const galleryCard = (
      <BrowserRouter>
        <GalleryCard object3D={object3D} />
      </BrowserRouter>
    );
    render(galleryCard);
    const galleryCardRender = screen.queryByTestId('gallery-card');
    expect(galleryCardRender).toBeDefined();
  });
});
