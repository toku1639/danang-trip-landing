/** GitHub Pages 等のサブパス用。Vite の base（例: /danang-trip-landing/）を付与 */
export const ASSET_BASE = import.meta.env.BASE_URL;

export function publicImageSrc(fileName: string, preferImagesDir: boolean): string {
  const name = fileName.replace(/^\//, "");
  return preferImagesDir ? `${ASSET_BASE}images/${name}` : `${ASSET_BASE}${name}`;
}

/** 表示用: 画像ファイル名の `vip-` を出さない */
export function displayPhotoFileName(fileName: string): string {
  return fileName.replace(/^vip-/i, "");
}
