import { EnrichedPost, RenderOptions } from './types';

export function renderCard<T extends Record<string, unknown>>({ post, options = {} }: { post: EnrichedPost<T>, options?: RenderOptions<T> }): string {
  const {
    renderDate = (post: EnrichedPost<T>) => new Date(post.createdAt).toLocaleDateString(),
    renderTitle = (post: EnrichedPost<T>) => post.title,
    renderTags = (tags: string[]) => tags,
  } = options;

  const { imageUrl, tags } = post;

  // Create card container
  const card = document.createElement("div");
  card.style.cssText = "background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); overflow: hidden; display: flex; flex-direction: column;";

  // Create figure element with link if image exists
  const figure = document.createElement("figure");
  figure.style.cssText = "width: 100%; height: 224px; overflow: hidden; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 0;";

  if (imageUrl) {
    const figureLink = document.createElement("a");
    figureLink.href = post.path;
    figureLink.style.cssText = "display: block; width: 100%; height: 100%; text-decoration: none;";

    const img = document.createElement("img");
    img.src = imageUrl;
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

  card.appendChild(figure);

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.style.cssText = "padding: 20px; flex: 1; display: flex; flex-direction: column;";

  // Create title link
  const titleLink = document.createElement("a");
  titleLink.href = post.path;
  titleLink.style.cssText = "text-decoration: none; color: inherit; cursor: pointer;";

  const title = document.createElement("h2");
  title.style.cssText = "margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #000;";
  title.textContent = renderTitle(post);
  titleLink.appendChild(title);
  cardBody.appendChild(titleLink);

  // Create tags container
  const tagsContainer = document.createElement("div");
  tagsContainer.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0;";
  renderTags(tags).forEach((tag: string) => {
    const tagLink = document.createElement("a");
    tagLink.href = "/t/" + tag;
    tagLink.style.cssText = "display: inline-block; padding: 4px 8px; font-size: 12px; color: #666; border: 1px solid #d1d5db; border-radius: 4px; background: #f9fafb; text-decoration: none; cursor: pointer; transition: background 0.2s;";
    tagLink.textContent = tag;
    tagLink.addEventListener('mouseover', () => { tagLink.style.background = "#e5e7eb"; });
    tagLink.addEventListener('mouseout', () => { tagLink.style.background = "#f9fafb"; });
    tagsContainer.appendChild(tagLink);
  });
  cardBody.appendChild(tagsContainer);

  // Create card footer with timestamp
  const cardFooter = document.createElement("div");
  cardFooter.style.cssText = "margin-top: auto;";

  // Create timestamp
  const timestamp = document.createElement("span");
  timestamp.style.cssText = "font-size: 12px; color: #999;";
  timestamp.textContent = renderDate(post);
  cardFooter.appendChild(timestamp);

  cardBody.appendChild(cardFooter);
  card.appendChild(cardBody);

  return card.outerHTML;
}
