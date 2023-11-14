import React, { useState } from 'react';

import { Title } from '@/components/Title';
import { SearchBar } from '@/components/SearchBar';
import { GalleryWaterfall } from '@/components/GalleryWaterfall';
import { CTAButton } from '@/components/CTAButton';
import DogPNG from '@/assets/dog.png';
import BoyPNG from '@/assets/boy.png';
import BurgerPNG from '@/assets/burger.png';
import PancakePNG from '@/assets/pancake.png';
import Strings from '@/locales/en.json';

export function Gallery() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // TODO: replace with json mock data file
  const mockDogObject = {
    prompt:
      'a dog who is being chased by an invisible creature on a sunny day in March',
    imgSRC: DogPNG,
  };
  const mockBoyObject = { prompt: 'a boy', imgSRC: BoyPNG };
  const mockBurgerObject = { prompt: 'a burger', imgSRC: BurgerPNG };
  const mockPancakeObject = {
    prompt: 'a bunny on pancakes',
    imgSRC: PancakePNG,
  };
  const mockObjectList = [
    mockDogObject,
    mockBoyObject,
    mockBurgerObject,
    mockPancakeObject,
  ];

  return (
    <div className="my-8 flex flex-col items-center gap-y-8">
      <Title
        className="text-center"
        prefix={Strings.Gallery.titlePrefix}
        gradientText={Strings.Gallery.titleGradient}
        suffix={Strings.Gallery.titleSuffix}
      />
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        enterOnChange={() => {}}
        placeholder={Strings.Gallery.search}
      />
      <GalleryWaterfall
        object3DList={mockObjectList}
        filterValue={searchValue}
      />
      <CTAButton
        buttonText={Strings.Gallery.createYourOwn}
        linkDestination="/"
        className="fixed my-8 mr-4 lg:mr-8 bottom-0 right-0"
      />
    </div>
  );
}
