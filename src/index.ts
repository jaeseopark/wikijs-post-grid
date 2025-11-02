import { WikiJsPost, GridOptions } from './types';
import { renderCard } from './renderer';
import { fetchPosts } from './network';

const DEFAULT_MAX_POSTS = 16;

export async function showGrid<T>(options: GridOptions<T>): Promise<void> {
    const {
        gridContainerId = 'wikijs-post-grid',
        maxPosts = DEFAULT_MAX_POSTS,
        enrichPost = (_post: WikiJsPost) => ({} as T),
        filterPost,
        sortPost,
        renderOptions,
        fetchedPosts = []
    } = options;

    const grid = document.getElementById(gridContainerId);

    if (!grid) {
        console.info(`Element with id "${gridContainerId}" not found`);
        return;
    }

    let posts: WikiJsPost[] = [...fetchedPosts];
    if (posts.length === 0) {
        try {
            posts = await fetchPosts();
        } catch (error) {
            console.error('Error loading WikiJS posts:', error);
        }
    }

    let processedPosts = posts
        .map(post => ({ ...post, ...enrichPost(post) }))

    if (filterPost) {
        processedPosts = processedPosts.filter(filterPost);
    }

    if (sortPost) {
        processedPosts = processedPosts.sort(sortPost);
    }

    processedPosts = processedPosts.slice(0, maxPosts);

    grid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px;";
    grid.innerHTML = processedPosts.map(post => renderCard<T>({ post, options: renderOptions })).join('');
}

// Export additional types and project grid preset for advanced usage
export { WikiJsPost, EnrichedPost, GridOptions } from './types';
export { showProjectGrid } from './curated/projects';
export { fetchPosts } from './network';

// Default export for UMD build
export default { showGrid };
