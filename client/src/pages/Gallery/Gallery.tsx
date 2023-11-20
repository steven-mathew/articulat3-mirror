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
    prompt: 'a white dog with a blue collar',
    imgSRC: DogPNG,
    objURL: '/sampleModel/ham_model.obj',
    mtlURL: '/sampleModel/ham_model.mtl',
    texURL: '/sampleModel/ham_model.jpg',
  };
  const mockBoyObject = {
    prompt: 'a boy',
    imgSRC: BoyPNG,
    objURL: '/sampleModel/ham_model.obj',
    mtlURL: '/sampleModel/ham_model.mtl',
    texURL: '/sampleModel/ham_model.jpg',
  };
  const mockBurgerObject = {
    prompt: 'a burger',
    imgSRC: BurgerPNG,
    objURL: '/sampleModel/ham_model.obj',
    mtlURL: '/sampleModel/ham_model.mtl',
    texURL: '/sampleModel/ham_model.jpg',
  };
  const mockPancakeObject = {
    prompt: 'a bunny on pancakes',
    imgSRC: PancakePNG,
    objURL: '/sampleModel/ham_model.obj',
    mtlURL: '/sampleModel/ham_model.mtl',
    texURL: '/sampleModel/ham_model.jpg',
  };
  const mockObjectList = [
    mockBurgerObject,
    mockDogObject,
    mockBoyObject,
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
