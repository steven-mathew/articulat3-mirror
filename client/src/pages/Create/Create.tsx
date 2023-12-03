import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

// eslint-disable-next-line import/extensions
import { Title } from '@/components/Title';
import { InputBar } from '@/components/InputBar';
import Strings from '@/locales/en.json';
import { Button } from '@/components/ui/button';
import { AlertDialog } from '@/components/AlertDialog/AlertDialog';
import { useToast } from '@/components/ui/use-toast';
import { ObjectCard } from '@/components/ObjectCard';
import { Object3D } from '@/types';
import { usePromptIntentCreateMutation } from '@/data/prompts/prompt-create-mutation';
import { usePromptQuery } from '@/data/prompts/prompt-query';
import { useBlobQuery } from '@/data/blobs/blob-query';
import { isDefined } from '@/lib/utilities/is-defined';

/**
 * The Create page where users will enter prompts to start the 3D generation process.
 * @returns A Create page view
 */
export function Create() {
  // Store objects in session storage
  const [inputValue, setInputValue] = useSessionStorage('inputValue', '');
  const [promptId, setPromptId] = useSessionStorage<string | undefined>(
    'promptId',
    undefined,
  );
  const [object3DString, setObject3DString] = useSessionStorage(
    'object3D',
    JSON.stringify({
      prompt: '',
      imgSRC: '',
      objURL: '',
      mtlURL: '',
      texURL: '',
    } as Object3D),
  );

  // Currently generating an object
  const [isGenerating, setIsGenerating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const object3D = useMemo(() => {
    return JSON.parse(object3DString) as Object3D;
  }, [object3DString]);

  const isInputEmpty = useMemo(() => {
    return inputValue.trim().length === 0;
  }, [inputValue]);

  // Defining the blob IDs for the different files
  const blobThumbnailId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_thumbnail.png`;
  }, [promptId]);
  const blobObjectId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_model.obj`;
  }, [promptId]);
  const blobTextureId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_texture_kd.jpg`;
  }, [promptId]);
  const blobMaterialId = useMemo(() => {
    if (!isDefined(promptId)) {
      return undefined;
    }
    return `${promptId}_model.mtl`;
  }, [promptId]);

  // Hook for posting a prompt
  const { mutate: createPromptIntent } = usePromptIntentCreateMutation({
    onSuccess: (res) => {
      // TODO
      setPromptId(res.prompt_intent?.id);
    },
  });

  // Hook for getting the prompt ID
  const { data } = usePromptQuery({ id: promptId }, { refetchInterval: 5000 });

  // Hook to get thumbnail
  const { data: blobThumbnailURL } = useBlobQuery({ id: blobThumbnailId });

  // Hook to get object
  const { data: blobObjectURL } = useBlobQuery({ id: blobObjectId });

  // Hook to get texture
  const { data: blobTextureURL } = useBlobQuery({ id: blobTextureId });

  // Hook to get material
  const { data: blobMaterialURL } = useBlobQuery({ id: blobMaterialId });

  useEffect(() => {
    if (data?.status === 'Completed') {
      // Once generation is done
      setIsGenerating(false);
      // Mimick fetch response
      setObject3DString(
        JSON.stringify({
          prompt: data.prompt,
          imgSRC: blobThumbnailURL,
          objURL: blobObjectURL,
          mtlURL: blobMaterialURL,
          texURL: blobTextureURL,
        } as Object3D),
      );
      toast({
        title: Strings.Toast.objectGenerateSuccess,
        variant: 'default',
        // variant: 'destructive', // used for error messages
      });
    }

    // Mock data version
    //   if (object3D.prompt) {
    //     setTimeout(() => {
    //       // Once generation is done
    //       setIsGenerating(false);
    //       // Mimick fetch response
    //       setObject3DString(
    //         JSON.stringify({
    //           prompt: object3D.prompt,
    //           imgSRC: Dog,
    //           objURL: '/sampleModel/ham_model.obj',
    //           mtlURL: '/sampleModel/ham_model.mtl',
    //           texURL: '/sampleModel/ham_model.jpg',
    //         } as Object3D),
    //       );
    //       toast({
    //         title: Strings.Toast.objectGenerateSuccess,
    //         variant: 'default',
    //         // variant: 'destructive', // used for error messages
    //       });
    //     }, 3000);
    //   }
    // }, [object3D.prompt]);
  }, [
    data?.status,
    blobObjectURL,
    blobMaterialURL,
    blobThumbnailURL,
    blobTextureURL,
  ]);

  // User clicks Create or presses Enter to submit prompt
  const onSubmitPrompt = useCallback(
    (confirmed = false) => {
      if (!object3D.prompt) {
        // First time user clicks Create

        // This call will post the prompt with the specified model to the db
        createPromptIntent({
          prompt: inputValue,
          model: 'mvdream-sd21',
        });

        // Update session storage with prompt, mimick query call
        setObject3DString(
          JSON.stringify({
            prompt: inputValue,
            imgSRC: '',
            objURL: '',
            mtlURL: '',
            texURL: '',
          } as Object3D),
        );
        setInputValue('');
        setIsGenerating(true);
        return;
      }

      if (!confirmed) {
        // User wants to create again, needs to confirm first
        setOpenDialog(true);
        return;
      }

      // This call will post the prompt with the specified model to the db
      createPromptIntent({
        prompt: inputValue,
        model: 'mvdream-sd21',
      });

      // User confirmed they want to create again
      // Update session storage with prompt, mimick query call
      setObject3DString(
        JSON.stringify({
          prompt: inputValue,
          imgSRC: '',
          objURL: '',
          mtlURL: '',
          texURL: '',
        } as Object3D),
      );
      setInputValue('');
      setIsGenerating(true);
    },
    [inputValue],
  );

  const alertDialogDescription = useMemo(() => {
    if (isGenerating) return Strings.Dialog.Message.discardProgress;
    if (object3D.imgSRC) return Strings.Dialog.Message.discardCurrentObject;
    return '';
  }, [isGenerating, object3D]);

  return (
    <main className="h-full flex flex-col">
      <div
        className={
          object3D.prompt
            ? 'mt-4 flex flex-col items-center justify-center gap-y-8'
            : 'mt-20 flex flex-col items-center justify-center gap-y-8'
        }
      >
        {!object3D.prompt && (
          <div className="mt-24 flex flex-col items-center justify-center gap-y-4">
            <div className="inline-flex items-center">
              <Title
                className="text-center"
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
            enterOnChange={() => {
              isInputEmpty ? null : onSubmitPrompt(false);
            }}
            placeholder={Strings.Create.inputPlaceholder}
          />

          <div className={isInputEmpty ? 'cursor-not-allowed' : ''}>
            {/* div is a workaround to allow cursor-not-allowed and pointer-no-events in button */}
            <Button
              onClick={() => onSubmitPrompt(false)}
              disabled={isInputEmpty}
            >
              {Strings.Global.create}
            </Button>
          </div>
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
        {object3D.prompt && (
          <div className="inline-flex items-center gap-x-4 py-4">
            <ObjectCard isGenerating={isGenerating} object3D={object3D} />
          </div>
        )}
      </div>
    </main>
  );
}
