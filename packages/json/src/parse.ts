export function jsonParse({
  reviver,
  text,
}: {
  reviver?: (this: unknown, key: string, value: unknown) => unknown;
  text: string;
}) {
  const value = JSON.parse(text, reviver) as unknown;
  return value;
}
