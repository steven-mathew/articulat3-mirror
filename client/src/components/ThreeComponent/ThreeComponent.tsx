import React, { useMemo, Suspense } from 'react';
import { Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
// import { DDSLoader } from 'three-stdlib';

import { cn } from '@/lib/cn';

interface ThreeComponentProps {
  className?: string;
  /**
   * Model (.obj) file to be displayed.
   */
  objURL: string;
  /**
   * Material (.mtl) file to be displayed.
   */
  mtlURL: string;
  /**
   * Texture (.jpg) file to be displayed.
   */
  texURL: string;
}

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

/**
 * Displays the 3D object using the URLs in `ThreeComponentProps`. Allows the user to interact with
 * the 3D object by dragging, zooming in/out, and rotating.
 * @param props See `ThreeComponentProps`
 * @returns A ThreeComponent component
 */
export function ThreeComponent({
  className,
  objURL,
  mtlURL,
  texURL,
}: ThreeComponentProps) {
  const Scene = () => {
    const materials = useLoader(MTLLoader, mtlURL);
    const obj = useLoader(OBJLoader, objURL, (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    const texture = useTexture(texURL);
    // Snippet of texture usage from Stack Overflow: https://stackoverflow.com/questions/68725185/react-three-fiber-add-texture-to-obj-model
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
        <ambientLight intensity={0.9} />
        <directionalLight intensity={0.75} />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };

  return (
    <div
      data-testid="three-component"
      className={cn('cursor-grab aspect-square', className)}
    >
      <Canvas camera={{ fov: 35, zoom: 1.3, near: 1, far: 1000 }}>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
