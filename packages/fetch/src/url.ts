export function createUrlObject({ base, url }: { base?: string; url: string }) {
  const urlObject = new URL(url, base);
  return urlObject;
}
