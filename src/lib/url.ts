// src/lib/url.ts
export function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`;
}

export function ensureNoDoubleSegments(url: string): string {
  // Fix accidental repeats like /api/v1/api/v1
  return url.replace(/(\/api\/v1)(\/api\/v1)+/g, "$1");
}
