import React, { useState } from 'react';

import { Title } from '@/components/Title';
import { SearchBar } from '@/components/SearchBar';
import { GalleryWaterfall } from '@/components/GalleryWaterfall';
import { CTAButton } from '@/components/CTAButton';
import Strings from '@/locales/en.json';

/**
 * The Gallery page where users can view and filter through previously generated 3D
 * objects.
 * @returns A Gallery page view
 */
export function Gallery() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // TODO: replace with json mock data file
  const mockBurgerObject = {
    prompt: 'a juicy burger',
    imgSRC: '/sampleModel/ham_model.png',
    objURL: '/sampleModel/ham_model.obj',
    mtlURL: '/sampleModel/ham_model.mtl',
    texURL: '/sampleModel/ham_model.jpg',
  };
  const mockCowObject = {
    prompt: 'a cow',
    imgSRC: '/sampleModel/cow_model.png',
    objURL: '/sampleModel/cow_model.obj',
    mtlURL: '/sampleModel/cow_model.mtl',
    texURL: '/sampleModel/cow_model.jpg',
  };
  const mockDuckObject = {
    prompt: 'a duck',
    imgSRC: '/sampleModel/duck_model.png',
    objURL: '/sampleModel/duck_model.obj',
    mtlURL: '/sampleModel/duck_model.mtl',
    texURL: '/sampleModel/duck_model.jpg',
  };
  const mockBoyObject = {
    prompt: 'young boy running',
    imgSRC: '/sampleModel/boy_model.png',
    objURL: '/sampleModel/boy_model.obj',
    mtlURL: '/sampleModel/boy_model.mtl',
    texURL: '/sampleModel/boy_model.jpg',
  };
  const mockAstronautObject = {
    prompt: 'an astronaut',
    imgSRC: '/sampleModel/astronaut_model.png',
    objURL: '/sampleModel/astronaut_model.obj',
    mtlURL: '/sampleModel/astronaut_model.mtl',
    texURL: '/sampleModel/astronaut_model.jpg',
  };
  const mockObjectList = [
    mockBurgerObject,
    mockCowObject,
    mockBoyObject,
    mockDuckObject,
    mockAstronautObject,
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
