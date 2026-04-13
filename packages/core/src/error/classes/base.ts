export class BaseError extends Error {
  code: string;
  context?: Record<string, unknown>;

  constructor(
    message: string,
    {
      code,
      context,
      cause,
    }: {
      code: string;
      context?: Record<string, unknown>;
      cause?: unknown;
    }
  ) {
    super(message, { cause });
    this.context = context;
    this.code = code;
  }
}
