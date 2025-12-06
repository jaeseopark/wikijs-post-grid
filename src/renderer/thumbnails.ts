import { EnrichedPost } from "../types";

export const createThumbnailContainer = <T>(post: EnrichedPost<T>) => {
  const figure = document.createElement("figure");
  figure.style.cssText = "width: 100%; height: 224px; overflow: hidden; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0;";

  if (post.imageUrl) {
    // Create figure element with link if image exists
    const figureLink = document.createElement("a");
    figureLink.href = `/${post.path}`;
    figureLink.style.cssText = "display: block; width: 100%; height: 100%; text-decoration: none;";

    const img = document.createElement("img");
    img.src = post.imageUrl;
    img.alt = post.title;
    img.style.cssText = "width: 100%; height: 100%; object-fit: cover; cursor: pointer;";
    figureLink.appendChild(img);
    figure.appendChild(figureLink);
  } else {
    // Create CSS-only placeholder with circle and line
    const placeholder = document.createElement("div");
    placeholder.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
        height: 100%;
      `;

    const circle = document.createElement("div");
    circle.style.cssText = `
        position: relative;
        width: 64px;
        height: 64px;
        border: 2px solid #d1d5db;
        border-radius: 50%;
      `;

    // Line across the circle
    const line = document.createElement("div");
    line.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 2px;
        background: #d1d5db;
        transform: translate(-50%, -50%) rotate(-45deg);
      `;
    circle.appendChild(line);

    // No image text
    const text = document.createElement("span");
    text.style.cssText = `
        font-size: 12px;
        color: #9ca3af;
        font-weight: 500;
      `;
    text.textContent = "No image";

    placeholder.appendChild(circle);
    placeholder.appendChild(text);
    figure.appendChild(placeholder);
  }

  return figure;
};
