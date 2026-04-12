export function jsonStringify({
  value,
  // eslint-disable-next-line perfectionist/sort-objects
  space = 2,
}: {
  value: unknown;
  space?: number;
}) {
  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "function") {
    return value.toString();
  }

  const jsonString = JSON.stringify(value, null, space);
  return jsonString;
}
