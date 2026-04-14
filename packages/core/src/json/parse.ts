export type JsonParseReviver = (
  this: unknown,
  key: string,
  value: unknown
) => unknown;

export function jsonParse({
  text,
  reviver,
}: {
  text: string;
  reviver?: JsonParseReviver;
}) {
  const data = JSON.parse(text, reviver) as unknown;
  return data;
}
