import { WikiJSPage, EnrichedPage } from './types';
import { showGrid } from './index';

type ProjectEnriched = { time: Date, isBigProject: boolean, imageUrl: string | null, filteredTags: string[] };
type ProjectPage = EnrichedPage<ProjectEnriched>;

export function isFinishedProject({ tags }: ProjectPage): boolean {
    return !tags.includes("wip") && (tags.includes("big project") || tags.includes("small project"));
}

export function enrichProjectPage(page: WikiJSPage): ProjectPage {
    // Extract time from description or use createdAt
    const match = /end:(\d\d\d\d-\d\d-\d\d)/g.exec(page.description);
    const time = new Date(match ? match[1] : page.createdAt);

    const imageUrl = extractImageUrl(page.description);
    const filteredTags = page.tags.filter(tag => tag !== "big project" && tag !== "small project");

    return {
        ...page,
        time,
        isBigProject: page.tags.includes("big project"),
        imageUrl: imageUrl,
        filteredTags: filteredTags
    };
}

export function extractImageUrl(description: string): string | null {
    // Look for image URLs in the description (jpg, jpeg, or webp)
    // Match text at start of string or after whitespace that ends with image extension
    const imageRegex = /(?:^|\s)(\S+\.(jpg|jpeg|webp))/i;
    const match = description.match(imageRegex);
    return match ? match[1] : null;
}

export function sortProjectsByAdjustedTime(a: EnrichedPage<ProjectEnriched>, b: EnrichedPage<ProjectEnriched>): number {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
}

export interface ProjectGridOptions {
    maxPosts?: number;
    filterPost?: (page: WikiJSPage) => boolean;
    sortPost?: (a: ProjectPage, b: ProjectPage) => number;
    formatDate?: (date: Date) => string;
}

export async function showProjectGrid(): Promise<void> {
    return showGrid({
        enrichPost: enrichProjectPage,
        filterPost: isFinishedProject,
        sortPost: sortProjectsByAdjustedTime,
    });
}