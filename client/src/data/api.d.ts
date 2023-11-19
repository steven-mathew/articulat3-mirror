/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/prompt_intents': {
    /**
     * Retrieve all PromptIntents
     * @description Returns a list of PromptIntents.
     */
    get: operations['getPromptIntents'];
    /**
     * Create a PromptIntent object.
     * @description Creates a new PromptIntent.
     */
    post: operations['createPromptIntent'];
  };
  '/v1/prompt_intents/{id}': {
    /**
     * Retrieve a PromptIntent
     * @description Retrieves the details of a PromptIntent that has been previously created.
     */
    get: operations['getPromptIntent'];
  };
  '/v1/blobs': {
    /**
     * Create a blob
     * @description Creates a blob by sending a request of type `binary`. Include the blob to upload in the request and the blob parameters that should be used for saving the blob.
     */
    post: operations['createBlob'];
  };
  '/v1/blobs/{id}': {
    /**
     * Retrieve a blob
     * @description Retrieves the details of an existing blob along with a presigned URL to download the blob. After supplying the unique blob ID, the blob is returned.
     */
    get: operations['getBlob'];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    PromptIntentRequest: {
      prompt_intent: components['schemas']['PromptIntent'];
    };
    PromptIntentsResponse: {
      prompt_intents?: components['schemas']['PromptIntent'][];
      request_id: components['schemas']['RequestID'];
    };
    PromptIntentResponse: {
      prompt_intent?: components['schemas']['PromptIntent'];
      request_id: components['schemas']['RequestID'];
    };
    ObjectFiles: {
      /**
       * @description Unique identifier for the texture blob.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      texture_blob_id?: string;
      /**
       * @description Unique identifier for the material definition blob.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      material_definition_blob_id?: string;
      /**
       * @description Unique identifier for the object model blob.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      object_model_blob_id?: string;
      /**
       * @description Unique identifier for the object thumbnail blob.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      object_thumbnail_blob_id?: string;
    };
    BlobRequest: {
      blob: components['schemas']['Blob'];
      /**
       * @description Path to the object in the sender's filesystem.
       * @example @/path/to/a/blob.obj
       */
      path: string;
    };
    BlobResponse: {
      blob?: components['schemas']['Blob'];
      /**
       * @description A presigned url to download the blob.
       * @example ttps://storage.googleapis.com/example-bucket/model.obj?...
       */
      url?: string;
      request_id: components['schemas']['RequestID'];
    };
    ErrorResponse: {
      error: components['schemas']['Error'];
      request_id: components['schemas']['RequestID'];
    };
    /**
     * @example {
     *   "id": "12710c42-9024-48d2-a942-880202cf6b37",
     *   "prompt": "a zoomed out DSLR photo of a baby bunny sitting on top of a stack of pancakes",
     *   "model": "mvdream-sd21",
     *   "status": "Completed",
     *   "blob_ids": [
     *     "..."
     *   ]
     * }
     */
    PromptIntent: {
      /**
       * @description Unique identifier for the PromptIntent.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      id?: string;
      /**
       * @description The human readable text of this prompt.
       * @example a zoomed out DSLR photo of a baby bunny sitting on top of a stack of pancakes
       */
      prompt: string;
      /**
       * @description The model used to generate the content.
       * @example mvdream-sd21
       * @enum {string}
       */
      model: 'mvdream-sd21';
      /** @description The status of this PromptIntent. */
      status?: string;
      blob_ids?: components['schemas']['ObjectFiles'];
      [key: string]: unknown;
    };
    /**
     * @example {
     *   "id": "12710c42-9024-48d2-a942-880202cf6b37",
     *   "created": 1697134565,
     *   "filename": "model.obj",
     *   "type": "obj",
     *   "purpose": "object_model"
     * }
     */
    Blob: {
      /**
       * @description Unique identifier for the blob.
       * @example 12710c42-9024-48d2-a942-880202cf6b37
       */
      id?: string;
      /**
       * @description Time at which the blob was created. Measured in seconds since the Unix epoch.
       * @example 1697134565
       */
      created: number;
      /**
       * @description The name for saving the blob to a filesystem.
       * @example model.obj
       */
      filename: string;
      /**
       * @description The extension of the blob (for example, obj, jpgg, mtl)
       * @example obj
       */
      type: string;
      /**
       * @description The purpose of the uploaded blob:
       *  * `material_definition` - A material definition that is to apply material to an object file.
       *  * `object_model` - An object file (usually `.stl` or `.obj`)
       *  * `object_texture` - A texture image that can be applied to an object model.
       *  * `object_thumbnail` - A thumbnail for an object file.
       *
       * @example object_model
       * @enum {string}
       */
      purpose:
        | 'material_definition'
        | 'object_model'
        | 'object_texture'
        | 'object_thumbnail';
    };
    /**
     * Format: uuid
     * @example 3f49426c-b914-4776-b029-8f912a5f2907
     */
    RequestID: string;
    Error: {
      /** @example this is an error message */
      message: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {
  /**
   * Retrieve all PromptIntents
   * @description Returns a list of PromptIntents.
   */
  getPromptIntents: {
    parameters: {
      query?: {
        /** @description A cursor for pagination across multiple pages. */
        page?: number;
        /** @description A limit on the number of objects returned. */
        limit?: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['PromptIntentsResponse'];
        };
      };
      /** @description Unexpected error */
      default: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Create a PromptIntent object.
   * @description Creates a new PromptIntent.
   */
  createPromptIntent: {
    /** @description PromptIntent to create */
    requestBody: {
      content: {
        'application/json': components['schemas']['PromptIntentRequest'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['PromptIntentResponse'];
        };
      };
      /** @description Unexpected error */
      default: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Retrieve a PromptIntent
   * @description Retrieves the details of a PromptIntent that has been previously created.
   */
  getPromptIntent: {
    parameters: {
      path: {
        /** @description Unique identifier for the PromptIntent. */
        id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['PromptIntentResponse'];
        };
      };
      /** @description Unexpected error */
      default: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Create a blob
   * @description Creates a blob by sending a request of type `binary`. Include the blob to upload in the request and the blob parameters that should be used for saving the blob.
   */
  createBlob: {
    /** @description A blob to create and parameters used for saving. */
    requestBody: {
      content: {
        'application/json': components['schemas']['BlobRequest'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['BlobResponse'];
        };
      };
      /** @description Unexpected error */
      default: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Retrieve a blob
   * @description Retrieves the details of an existing blob along with a presigned URL to download the blob. After supplying the unique blob ID, the blob is returned.
   */
  getBlob: {
    parameters: {
      path: {
        /** @description Unique identifier for the blob. */
        id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['BlobResponse'];
        };
      };
      /** @description Unexpected error */
      default: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
}