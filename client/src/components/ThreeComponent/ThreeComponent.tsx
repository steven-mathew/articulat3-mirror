import React, { useMemo } from 'react';
import { cn } from '@/lib/cn';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { DDSLoader } from 'three-stdlib';
import { Canvas, useLoader } from '@react-three/fiber';

import { Environment, OrbitControls, useTexture } from '@react-three/drei';

import { Suspense } from 'react';

interface Props {
  className?: string;
  objURL: string;
  mtlURL: string;
  texURL: string;
}

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

export function ThreeComponent({ className, objURL, mtlURL, texURL }: Props) {
  const Scene = () => {
    const materials = useLoader(MTLLoader, mtlURL);
    const obj = useLoader(OBJLoader, objURL, (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    const texture = useTexture(texURL);
    // snippet of texture usage from Stack Overflow: https://stackoverflow.com/questions/68725185/react-three-fiber-add-texture-to-obj-model
    const geometry = useMemo(() => {
      let g;
      obj.traverse((c) => {
        if (c.type === 'Mesh') {
          const _c = c as Mesh;
          g = _c.geometry;
        }
      });
      return g;
    }, [obj]);

    return (
      <mesh geometry={geometry} scale={1}>
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };

  return (
    <div className={cn('cursor-grab aspect-square', className)}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset" background blur={0.09} />
        </Suspense>
      </Canvas>
    </div>
  );
}
