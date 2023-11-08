import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import { Page } from '@/components/Page';
import { Create } from '@/pages/Create';
import { Gallery } from '@/pages/Gallery';
import Strings from '@/locales/en.json';
import glassPNG from '@/assets/glass.png';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Create />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

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
