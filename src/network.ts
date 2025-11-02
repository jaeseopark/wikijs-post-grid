import { WikiJsPost, GraphQLResponse, GraphQLPayload } from "./types";
import { extractImageUrl } from "./utils";

const GRAPHQL_PAYLOAD: GraphQLPayload = {
    operationName: null,
    variables: {},
    extensions: {},
    query: "{\n  pages {\n    list {\n      id\n      path\n      title\n      description\n      createdAt\n      tags\n      }\n      }\n}",
};

export async function fetchPosts(): Promise<WikiJsPost[]> {
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
        tags: page.tags || [],
        imageUrl: extractImageUrl(page.description),
    }));
}
