import React, { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import ConstructionPNG from '@/assets/construction.png';
import { Page } from '@/components/Page';
import { CTAButton } from '@/components/CTAButton';
import { SearchBar } from '@/components/SearchBar';
import { Create } from '@/pages/Create';
import Strings from '@/locales/en.json';
import { ExportDropdownMenu } from '@/components/ExportDropdownMenu';

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

function Gallery() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <img className="h-60 w-60" src={ConstructionPNG} alt="Sample GIF" />
      {Strings.Gallery.placeholder}
      <CTAButton
        buttonText={Strings.Gallery.createYourOwn}
        linkDestination="/"
      />
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        enterOnChange={() => {}}
        placeholder={Strings.Gallery.search}
      />
      <ExportDropdownMenu />
    </div>
  );
}

function NoMatch() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <h2>{Strings.NoMatch.placeholder}</h2>
      <p>
        <Link to="/" className="hover:opacity-80">
          {Strings.NoMatch.callToAction}
        </Link>
      </p>
    </div>
  );
}
