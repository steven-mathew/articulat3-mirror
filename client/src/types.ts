import type React from 'react';

export interface Object3D {
  // The image SRC that corresponds to this 3D object
  imgSRC: string;
  // The user inputted prompt that generated this 3D object
  prompt: string;
}
