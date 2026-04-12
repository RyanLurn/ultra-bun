export function jsonStringify({ value }: { value: unknown }) {
  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "function") {
    return value.toString();
  }

  const jsonString = JSON.stringify(value);
  return jsonString;
}
