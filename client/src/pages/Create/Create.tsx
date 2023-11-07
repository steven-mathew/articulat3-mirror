import React, { useCallback, useMemo, useState } from 'react';

// eslint-disable-next-line import/extensions
import SampleGIF from '@/assets/sample.gif';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { InputBar } from '@/components/InputBar';
import Strings from '@/locales/en.json';
import { interpolate } from '@/lib/string-utils';
import { IconButton, IconButtonType } from '@/components/IconButton';
import { Button } from '@/components/ui/button';
import { AlertDialog } from '@/components/AlertDialog/AlertDialog';

export function Create() {
  const [inputValue, setInputValue] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false); // Create btn has been clicked before
  const [isGenerating, setIsGenerating] = useState(false); // currently generating an object
  const [hasGenerated, setHasGenerated] = useState(false); // object generation is complete
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Temp function to simulate generation
  const generate = useCallback(() => {
    setTimeout(() => {
      // Once generation is done
      setIsGenerating(false);
      setHasGenerated(true);
    }, 5000);
  }, []);

  // User clicks Create or presses Enter to submit prompt
  const onSubmitPrompt = useCallback(
    (confirmed: boolean = false) => {
      if (!hasSubmittedPrompt) {
        // First time user clicks Create
        setHasSubmittedPrompt(true);
        setSubmittedPrompt(inputValue);
        setInputValue('');
        setIsGenerating(true);
        setHasGenerated(false);
        generate();
        return;
      }

      if (!confirmed) {
        // User wants to create again, needs to confirm first
        setOpenDialog(true);
        return;
      }

      // User confirmed they want to create again
      setSubmittedPrompt(inputValue);
      setInputValue('');
      setIsGenerating(true);
      setHasGenerated(false);
      generate();
    },
    [hasSubmittedPrompt, inputValue, generate],
  );

  const alertDialogDescription = useMemo(() => {
    if (isGenerating) return Strings.Dialog.Message.discardProgress;
    if (hasGenerated) return Strings.Dialog.Message.discardCurrentObject;
    return '';
  }, [isGenerating, hasGenerated]);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-4">
        {!hasSubmittedPrompt ? (
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
          {/* TODO: temporary, will be moved to object card later */}
          {isGenerating && (
            <div className="inline-flex items-center gap-x-4">
              <h3 className="text-center">
                {interpolate(
                  Strings.Create.creationMessageLoading,
                  submittedPrompt,
                )}
              </h3>
            </div>
          )}

          {/* TODO: temporary, for showing when object is complete */}
          {hasGenerated && (
            <div className="inline-flex items-center gap-x-4">
              <h3 className="text-center">
                {interpolate(
                  Strings.Create.objectGeneratedMessage,
                  submittedPrompt,
                )}
              </h3>
            </div>
          )}

          <div className="w-full inline-flex items-center gap-x-4">
            <InputBar
              value={inputValue}
              onChange={handleInputChange}
              enterOnChange={() => onSubmitPrompt(false)}
              placeholder={Strings.Create.inputPlaceholder}
            />
          </div>
          <div className="inline-flex items-center gap-x-4">
            <Button onClick={() => onSubmitPrompt(false)}>
              {Strings.Global.create}
            </Button>
            <AlertDialog
              open={openDialog}
              onOpenChange={setOpenDialog}
              title={Strings.Dialog.Title.continueCreating}
              description={alertDialogDescription}
              primaryButtonText={Strings.Global.continue}
              primaryAction={() => onSubmitPrompt(true)}
              secondaryButtonText={Strings.Global.goBack}
            ></AlertDialog>

            <IconButton onClick={() => {}} buttonType={IconButtonType.Info} />
            <IconButton
              onClick={() => {}}
              buttonType={IconButtonType.Download}
            />
          </div>
        </div>
        {(isGenerating || hasGenerated) && (
          <div className="inline-flex items-center gap-x-4 py-4">
            <img src={SampleGIF} alt="Sample GIF" />
          </div>
        )}
      </div>
    </main>
  );
}
