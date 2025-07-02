import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: unknown;
}

export const apiResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null
): Response<ApiResponse<T>> =>
  res.status(statusCode).json({
    success,
    message,
    data,
  });

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: unknown
): Response<ErrorResponse> =>
  res.status(statusCode).json({ success: false, message, error });
