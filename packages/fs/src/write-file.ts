import type { PathLike, BlobPart, BunFile, Archive, S3File } from "bun";

export async function writeFile({
  destination,
  input,
}: {
  input:
    | NodeJS.TypedArray<ArrayBufferLike>
    | ArrayBufferLike
    | BlobPart[]
    | Archive
    | string
    | Blob;
  destination: PathLike | BunFile | S3File;
}) {
  const bytes = await Bun.write(destination, input);
  return bytes;
}
