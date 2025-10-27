import { WikiJSPage, EnrichedPage } from './types';

export function isFinishedProject(page: WikiJSPage): boolean {
  const tags = page.tags || [];
  return !tags.includes("wip") && (tags.includes("big project") || tags.includes("small project"));
}

export function enrichPage<T extends Record<string, unknown> = {}>(page: WikiJSPage): EnrichedPage<T> {
  // For basic usage, just return the page as-is
  return page as EnrichedPage<T>;
}

export function extractSummary(description: string): string {
  // Remove the end: date pattern and return first 150 characters
  const cleanDesc = (description || "").replace(/end:\d\d\d\d-\d\d-\d\d/g, "").trim();
  return cleanDesc.substring(0, 150) + (cleanDesc.length > 150 ? "..." : "");
}

export function extractImageUrl(description: string): string | null {
  // Look for image URLs in the description (jpg, jpeg, or webp)
  // Match text at start of string or after whitespace that ends with image extension
  const imageRegex = /(?:^|\s)(\S+\.(jpg|jpeg|webp))/i;
  const match = description.match(imageRegex);
  return match ? match[1] : null;
}