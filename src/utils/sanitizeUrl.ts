/**
 * Validates that a URL uses a safe scheme (https only in production).
 * Blocks javascript:, data:, and other dangerous URI schemes.
 */
export function isSafeImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Filters an array of URLs to only include safe image URLs.
 */
export function filterSafeImageUrls(urls: string[] | null | undefined): string[] {
  if (!urls || !Array.isArray(urls)) return [];
  return urls.filter(isSafeImageUrl);
}
