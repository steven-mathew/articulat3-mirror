import React, { useState } from 'react';

// eslint-disable-next-line import/extensions
import SampleGIF from '@/assets/sample.gif';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { InputBar } from '@/components/InputBar';
import { PrimaryButton } from '@/components/PrimaryButton';
import Strings from '@/locales/en.json';
import { interpolate } from '@/lib/string-utils';
import { IconButton, IconButtonType } from '@/components/IconButton';

export function Create() {
  const [inputValue, setInputValue] = useState('');
  const [displayInputValue, setDisplayInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const buttonOnClick = () => {
    if (!isGenerating) {
      setDisplayInputValue(inputValue);
    } else {
      setInputValue('');
    }
    setIsGenerating(!isGenerating);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-4">
        {!isGenerating ? (
          <>
            <div className="inline-flex items-center gap-x-4">
              <Title
                className="text-center"
                gradientText={Strings.Create.titleGradient}
                text={Strings.Create.titleNonGradient}
              />
            </div>
            <div className="inline-flex items-center gap-x-4">
              <Subtitle text={Strings.Create.subtitle} />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-col w-full items-center gap-y-8 py-8">
          {isGenerating ? (
            <div className="inline-flex items-center gap-x-4">
              <h3 className="text-center">
                {interpolate(
                  Strings.Create.creationMessageLoading,
                  displayInputValue,
                )}
              </h3>
            </div>
          ) : (
            <></>
          )}

          <div className="w-full inline-flex items-center gap-x-4">
            <InputBar
              value={inputValue}
              onChange={handleInputChange}
              enterOnChange={buttonOnClick}
              placeholder={Strings.Create.inputPlaceholder}
              disabled={isGenerating}
            />
          </div>
          <div className="inline-flex items-center gap-x-4">
            <PrimaryButton
              onClick={buttonOnClick}
              buttonText={
                isGenerating ? Strings.Global.cancel : Strings.Global.create
              }
            />
            <IconButton onClick={() => {}} buttonType={IconButtonType.Info} />
            <IconButton
              onClick={() => {}}
              buttonType={IconButtonType.Download}
            />
          </div>
        </div>
        {isGenerating ? (
          <>
            <div className="inline-flex items-center gap-x-4 py-4">
              <img src={SampleGIF} alt="Sample GIF" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
