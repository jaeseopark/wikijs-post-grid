export interface BaseWikiJsPost {
    id: string;
    path: string;
    title: string;
    description: string;
    createdAt: string;
}

export interface GraphQLResponseWikiJsPost extends BaseWikiJsPost {
    tags?: string[]; // tags may be undefined in the GraphQL response
}

export interface WikiJsPost extends BaseWikiJsPost {
    tags: string[]; // ensure tags is always defined
    imageUrl?: string; // optional imageUrl property; extracted from the description field.
}

export type EnrichedProperties<T extends Record<string, unknown>> = T;

export type EnrichedPost<T extends Record<string, unknown>> = WikiJsPost & EnrichedProperties<T>;

export interface RenderOptions<T extends Record<string, unknown>> {
    renderDate?: (post: EnrichedPost<T>) => string; // will use the locale's default formatting if not provided
    renderTitle?: (post: EnrichedPost<T>) => string; // custom title rendering
    renderTags?: (tags: string[]) => string[]; // custom tag rendering
}

export interface GridOptions<T extends Record<string, unknown>> {
    gridContainerId?: string; // default is 'wikijs-post-grid'
    maxPosts?: number;
    enrichPost?: (post: WikiJsPost) => EnrichedProperties<T>; // should return additional properties to merge
    filterPost?: (post: EnrichedPost<T>) => boolean;
    sortPost?: (a: EnrichedPost<T>, b: EnrichedPost<T>) => number;
    renderOptions?: RenderOptions<T>;
    fetchedPosts?: WikiJsPost[]; // freshly-fetched, unfiltered posts; avoids redundant GraphQL calls if multiple grids are in one page
}

export interface GraphQLPayload {
    operationName: null;
    variables: object;
    extensions: object;
    query: string;
}

export interface GraphQLResponse {
    data: {
        pages: {
            list: GraphQLResponseWikiJsPost[];
        };
    };
}