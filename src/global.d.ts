import { Request as ExpressRequest } from "express";

declare global {
  interface ApiError {
    code: ApiErrorCode;
    title?: string;
    message: string;
  }

  interface ApiResponseBody<T = unknown> {
    success: boolean;
    payload: T | null;
    error: ApiError | null;
  }

  type ApiErrorCode = "API_ERROR" | "INTERNAL_SERVER_ERROR";
}
