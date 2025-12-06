import { EnrichedPost, RenderOptions } from '../types';
import { createTagsContainer } from './tags';
import { createThumbnailContainer } from './thumbnails';

export function renderCard<T>({ post, options = {} }: { post: EnrichedPost<T>, options?: RenderOptions<T> }): string {
  const {
    renderDate = (post: EnrichedPost<T>) => new Date(post.createdAt).toLocaleDateString(),
    renderTitle = (post: EnrichedPost<T>) => post.title,
    renderTags = (tags: string[]) => tags,
    showThumbnail = true,
  } = options;

  // Create card container
  const card = document.createElement("div");
  card.style.cssText = "background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); overflow: hidden; display: flex; flex-direction: column;";

  if (showThumbnail) {
    const thumbnailContainer = createThumbnailContainer(post);
    card.appendChild(thumbnailContainer);
  }

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.style.cssText = "padding: 20px; flex: 1; display: flex; flex-direction: column;";

  // Create title link
  const titleLink = document.createElement("a");
  titleLink.href = `/${post.path}`;
  titleLink.style.cssText = "text-decoration: none; color: inherit; cursor: pointer;";

  const title = document.createElement("h2");
  title.style.cssText = "margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #000;";
  title.textContent = renderTitle(post);
  titleLink.appendChild(title);
  cardBody.appendChild(titleLink);

  // Create tags container
  const renderedTags = renderTags(post.tags);
  if (renderedTags.length > 0) {
    const tagsContainer = createTagsContainer(renderedTags);
    cardBody.appendChild(tagsContainer);
  }

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
