import React, { useCallback, useMemo, useState } from 'react';

// eslint-disable-next-line import/extensions
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { InputBar } from '@/components/InputBar';
import Strings from '@/locales/en.json';
import { Button } from '@/components/ui/button';
import { AlertDialog } from '@/components/AlertDialog/AlertDialog';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';
import Dog from '@/assets/dog.png';

export function Create() {
  const [inputValue, setInputValue] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  // Create btn has been clicked before
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false);
  // currently generating an object
  const [isGenerating, setIsGenerating] = useState(false);
  // object generation is complete
  const [hasGenerated, setHasGenerated] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Temp function to simulate generation
  const generate = useCallback(() => {
    setTimeout(() => {
      // Once generation is done
      setIsGenerating(false);
      setHasGenerated(true);
      toast({
        title: Strings.Toast.objectGenerateSuccess,
        variant: 'default',
        // variant: 'destructive', // used for error messages
      });
    }, 3000);
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
    <main className="h-full flex flex-col">
      <div
        className={
          hasSubmittedPrompt
            ? 'mt-4 flex flex-col items-center justify-center gap-y-8'
            : 'mt-20 flex flex-col items-center justify-center gap-y-8'
        }
      >
        {!hasSubmittedPrompt && (
          <div className="mt-24 flex flex-col items-center justify-center gap-y-4">
            <div className="inline-flex items-center">
              <Title
                className="text-center"
                // prefix={Strings.Create.titlePrefix}
                prefix={Strings.Create.titlePrefix}
                gradientText={Strings.Create.titleGradient}
                suffix={Strings.Create.titleSuffix}
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-center gap-x-4 w-full">
          <InputBar
            value={inputValue}
            onChange={handleInputChange}
            enterOnChange={() => onSubmitPrompt(false)}
            placeholder={Strings.Create.inputPlaceholder}
          />
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
          />
        </div>
        {hasSubmittedPrompt && (
          <div className="inline-flex items-center gap-x-4 py-4">
            <ObjectCard
              isGenerating={isGenerating}
              // TO-DO: replace with actual object3D from database
              object3D={{
                prompt: submittedPrompt,
                imgSRC: Dog,
              }}
            />
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
}
