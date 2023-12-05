export interface ResponseFailure {
  error: ResponseError;
}


export type PromptIntent = {
  id: string;
  model: string;
  prompt: string;
  obj?: {
    texture_blob_id?: string;
    material_definition_blob_id?: string;
    object_model_blob_id?: string;
    object_thumbnail_blob_id?: string;
  };
  status?: string;
};

export interface ResponseError {
  code: number;
  title?: string;
  detail?: string;
  error?: Record<string, string>;
  requestId: string;
}

export type ConsoleResponse<T> = T | ResponseFailure;

