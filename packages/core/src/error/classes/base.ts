export class BaseError extends Error {
  context?: Record<string, unknown>;
  code: string;

  constructor(
    message: string,
    {
      context,
      cause,
      code,
    }: {
      context?: Record<string, unknown>;
      cause?: unknown;
      code: string;
    }
  ) {
    super(message, { cause });
    this.context = context;
    this.code = code;
  }
}
