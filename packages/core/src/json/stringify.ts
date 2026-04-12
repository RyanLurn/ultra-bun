export function jsonStringify({ value }: { value: unknown }) {
  const jsonString = JSON.stringify(value);
  return jsonString;
}
