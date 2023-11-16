export interface ResponseFailure {
    error: ResponseError
}

export interface ResponseError {
    code: number;
    title?: string;
    detail?: string;
    error?: Record<string, string>;
    requestId: string
}

export type ConsoleResponse<T> = T | ResponseFailure
