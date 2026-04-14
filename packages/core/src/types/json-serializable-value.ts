export type JsonSerializableValue =
  | { [key: string]: JsonSerializableValue }
  | JsonSerializableValue[]
  | boolean
  | string
  | number
  | null;
