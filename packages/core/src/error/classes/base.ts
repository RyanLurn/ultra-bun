import type { JsonSerializableValue } from "@/types/json-serializable-value";

type BaseContext = Record<string, JsonSerializableValue>;

export class BaseError<
  TCode extends string,
  TContext extends BaseContext = BaseContext,
  TCause = unknown,
> extends Error {
  code: TCode;
  context: TContext;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    context,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    context: TContext;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
    this.context = context;
  }
}
