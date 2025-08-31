import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/core';

export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError extends AxiosError<ApiErrorResponse> {
  config: ApiRequestConfig;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface TokenRefreshSubscriber {
  (token: string): void;
}

export type ApiInterceptorRequest = (
  config: ApiRequestConfig
) => Promise<ApiRequestConfig>;

export type ApiInterceptorRequestError = (error: ApiError) => Promise<never>;

export type ApiInterceptorResponse = <T>(
  response: AxiosResponse<ApiResponse<T>>
) => AxiosResponse<ApiResponse<T>>;

export type ApiInterceptorResponseError = (
  error: ApiError
) => Promise<AxiosResponse<ApiResponse<any>> | never>;


