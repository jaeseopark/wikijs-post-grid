export interface BaseWikiJSPage {
    id: string;
    path: string;
    title: string;
    description: string;
    createdAt: string;
}

export interface GraphQLResponseWikiJSPage extends BaseWikiJSPage {
    tags?: string[]; // tags may be undefined in the GraphQL response
}

export interface WikiJSPage extends BaseWikiJSPage {
    tags: string[]; // ensure tags is always defined
}

export type EnrichedProperties<T extends Record<string, unknown>> = T;

export type EnrichedPage<T extends Record<string, unknown>> = WikiJSPage & EnrichedProperties<T>;

export interface GridOptions<T extends Record<string, unknown>> {
    maxPosts?: number;
    enrichPost?: (page: WikiJSPage) => EnrichedProperties<T>; // should return additional properties to merge
    filterPost?: (page: EnrichedPage<T>) => boolean;
    sortPost?: (a: EnrichedPage<T>, b: EnrichedPage<T>) => number;
    formatDate?: (date: Date) => string; // will use the locale's default formatting if not provided
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
            list: GraphQLResponseWikiJSPage[];
        };
    };
}