export const createTagsContainer = (tags: string[]): HTMLElement => {
    const tagsContainer = document.createElement("div");
    tagsContainer.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0;";
    tags.forEach((tag: string) => {
        const tagLink = document.createElement("a");
        tagLink.href = "/t/" + tag;
        tagLink.style.cssText = "display: inline-block; padding: 4px 8px; font-size: 12px; color: #666; border: 1px solid #d1d5db; border-radius: 4px; background: #f9fafb; text-decoration: none; cursor: pointer; transition: background 0.2s;";
        tagLink.textContent = tag;
        tagLink.addEventListener('mouseover', () => { tagLink.style.background = "#e5e7eb"; });
        tagLink.addEventListener('mouseout', () => { tagLink.style.background = "#f9fafb"; });
        tagsContainer.appendChild(tagLink);
    });
    return tagsContainer;
};