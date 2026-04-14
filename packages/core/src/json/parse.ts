import type { JsonParseReviver } from "@/error/classes/validation/invalid-json";

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
