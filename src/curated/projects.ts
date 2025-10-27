import { WikiJsPost, EnrichedPost } from '../types';
import { showGrid } from '../index';

type ProjectEnriched = {
  time: Date;
  isBigProject: boolean;
  filteredTags: string[];
};
type ProjectPage = EnrichedPost<ProjectEnriched>;

export function isFinishedProject({ tags }: ProjectPage): boolean {
  return (
    !tags.includes('wip') &&
    (tags.includes('big project') || tags.includes('small project'))
  );
}

export function enrichProjectPage(post: WikiJsPost): ProjectPage {
  // Extract time from description or use createdAt
  const match = /end:(\d\d\d\d-\d\d-\d\d)/g.exec(page.description);
  const time = new Date(match ? match[1] : page.createdAt);

  const filteredTags = page.tags.filter(
    (tag) => tag !== 'big project' && tag !== 'small project'
  );

  return {
    ...page,
    time,
    isBigProject: page.tags.includes('big project'),
    filteredTags: filteredTags,
  };
}

export function sortProjectsByAdjustedTime(
  a: EnrichedPost<ProjectEnriched>,
  b: EnrichedPost<ProjectEnriched>
): number {
  return new Date(b.time).getTime() - new Date(a.time).getTime();
}

export interface ProjectGridOptions {
  maxPosts?: number;
  filterPost?: (post: WikiJsPost) => boolean;
  sortPost?: (a: ProjectPage, b: ProjectPage) => number;
  renderDate?: (date: Date) => string;
}

export async function showProjectGrid(): Promise<void> {
  return showGrid({
    enrichPost: enrichProjectPage,
    filterPost: isFinishedProject,
    sortPost: sortProjectsByAdjustedTime,
  });
}
