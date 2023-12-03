import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { Page } from '@/components/Page';
import { Create } from '@/pages/Create';
import { Gallery } from '@/pages/Gallery';
import Strings from '@/locales/en.json';
import glassPNG from '@/assets/glass.png';
import { Object3D } from '@/types';
import { Toaster } from '@/components/ui/toaster';
import { useRootQueryClient } from '@/data/query-client';

export function App() {
  const queryClient = useRootQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Create />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * The 404 page that will be displayed when the URL doesn't correspond to an existing route.
 * @returns A NoMatch page view
 */
function NoMatch() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-y-4">
      <img src={glassPNG} alt="Magnifying glass PNG" className="h-40" />
      <h2>{Strings.NoMatch.placeholder}</h2>
      <p>
        {Strings.NoMatch.placeholderSubtitle}
        <Link to="/" className="hover:opacity-50">
          {Strings.NoMatch.callToAction}
        </Link>
      </p>
    </div>
  );
}

window.addEventListener('beforeunload', (ev) => {
  const object3DString = window.sessionStorage.getItem('object3D') ?? '';
  if ((JSON.parse(object3DString) as Object3D).imgSRC) {
    ev.preventDefault();
  }
  return (ev.returnValue = '.');
});
