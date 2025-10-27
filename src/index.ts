import { WikiJSPage, GridOptions, GraphQLPayload, GraphQLResponse, EnrichedPage } from './types';
import { renderGrid } from './renderer';

const DEFAULT_MAX_POSTS = 16;

const GRAPHQL_PAYLOAD: GraphQLPayload = {
    operationName: null,
    variables: {},
    extensions: {},
    query: "{\n  pages {\n    list {\n      id\n      locale\n      path\n      title\n      description\n      createdAt\n      tags\n      }\n      }\n}",
};

async function fetchPosts(): Promise<WikiJSPage[]> {
    const rawResponse = await fetch("/graphql", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(GRAPHQL_PAYLOAD),
    });

    const content: GraphQLResponse = await rawResponse.json();
    return content.data.pages.list.map(page => ({
        ...page,
        tags: page.tags || []
    }));
}

export async function showGrid<T extends Record<string, unknown> = Record<string, unknown>>(options: GridOptions<T> = {} as GridOptions<T>): Promise<void> {
    const {
        maxPosts = DEFAULT_MAX_POSTS,
        enrichPost = (_post: WikiJSPage) => ({} as T),
        filterPost = (_page: EnrichedPage<T>) => true,
        sortPost,
        formatDate = (date: Date) => new Date(date).toLocaleDateString()
    } = options;

    try {
        const posts = await fetchPosts();

        let processedPosts = posts
            .map(post => ({ ...post, ...enrichPost(post) }))
            .filter(filterPost);

        if (sortPost) {
            processedPosts = processedPosts.sort(sortPost);
        }

        processedPosts = processedPosts.slice(0, maxPosts);

        renderGrid(processedPosts, formatDate);
    } catch (error) {
        console.error('Error loading WikiJS posts:', error);
    }
}

// Export additional utilities for advanced usage
export { WikiJSPage, EnrichedPage, GridOptions } from './types';
export { enrichPage, extractImageUrl } from './utils';
export { showProjectGrid } from './projects';

// Default export for UMD build
export default { showGrid };
