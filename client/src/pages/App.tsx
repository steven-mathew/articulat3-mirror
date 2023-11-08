import React, { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import { Page } from '@/components/Page';
// import { CTAButton } from '@/components/CTAButton';
import { SearchBar } from '@/components/SearchBar';
import { GalleryWaterfall } from '@/components/GalleryWaterfall';
import { Create } from '@/pages/Create';
import Strings from '@/locales/en.json';
import DogPNG from '@/assets/dog.png';
import BoyPNG from '@/assets/boy.png';

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

  // TODO: replace with json mock data file
  const mockDogObject = { prompt: 'a dog', imgSRC: DogPNG };
  const mockBoyObject = { prompt: 'a boy', imgSRC: BoyPNG };
  const mockObjectList = [
    mockDogObject,
    mockBoyObject,
    mockBoyObject,
    mockDogObject,
    mockBoyObject,
    mockDogObject,
  ];

  return (
    <div className="flex flex-col items-center gap-y-4">
      {/* <CTAButton
        buttonText={Strings.Gallery.createYourOwn}
        linkDestination="/"
      />*/}
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        enterOnChange={() => {}}
        placeholder={Strings.Gallery.search}
      />
      <GalleryWaterfall object3DList={mockObjectList} />
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
