import React, { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import { Page } from '@/components/Page';
// import { CTAButton } from '@/components/CTAButton';
// import { SearchBar } from '@/components/SearchBar';
import { Create } from '@/pages/Create';
import Strings from '@/locales/en.json';
import { GalleryCard } from '@/components/GalleryCard';
import DogPNG from '@/assets/dog.png';

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

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.target.value);
  // };

  return (
    <div className="flex flex-col items-center gap-y-4">
      {/* <CTAButton
        buttonText={Strings.Gallery.createYourOwn}
        linkDestination="/"
      />
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        enterOnChange={() => {}}
        placeholder={Strings.Gallery.search}
      />  */}
      <GalleryCard prompt="a dog" img={DogPNG} />
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
