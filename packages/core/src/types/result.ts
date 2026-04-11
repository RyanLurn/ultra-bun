import type { BaseError } from "@/error/classes/base";

export type Result<TData, TError extends BaseError> =
  | Failure<TError>
  | Success<TData>;

export type Failure<TError extends BaseError> = {
  success: false;
  error: TError;
};

export type Success<TData> = { success: true; data: TData };
