export function jsonParse({ text }: { text: string }) {
  const value = JSON.parse(text) as unknown;
  return value;
}
