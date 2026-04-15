import type { NonExistentPathError } from "@/error/classes/non-existent-path";
import type { InvalidJsonError } from "@/error/classes/invalid-json";
import type { FallBackError } from "@/error/create-fallback";
import type { Result } from "@/types/result";

import { type JsonParseReviver, jsonParse } from "@/json/parse";
import { readTextFromFile } from "@/fs/read-text-from-file";

export async function readJsonFile({
  path,
  reviver,
}: {
  path: string;
  reviver?: JsonParseReviver;
}): Promise<
  Result<unknown, NonExistentPathError | InvalidJsonError | FallBackError>
> {
  // Read the file to get its text content
  const readFileResult = await readTextFromFile({ path });

  if (readFileResult.success === false) {
    return readFileResult;
  }

  const text = readFileResult.data;

  // Parse the text to get its json value
  const jsonParseResult = jsonParse({ text, reviver });

  // Return the result directly
  return jsonParseResult;
}
