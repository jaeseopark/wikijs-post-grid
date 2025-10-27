export function extractImageUrl(description: string): string | undefined {
  // Look for image URLs in the description (jpg, jpeg, or webp)
  // Match text at start of string or after whitespace that ends with image extension
  const imageRegex = /(?:^|\s)(\S+\.(jpg|jpeg|webp))/i;
  const match = description.match(imageRegex);
  return match ? match[1] : undefined;
}
