import { WikiJsPost, EnrichedPost, GridOptions } from '../types';
import { showGrid } from '../index';
import { combinePredicates } from '../utils';

type ProjectEnriched = {
  time: Date;
  isBigProject: boolean;
};
type ProjectPage = EnrichedPost<ProjectEnriched>;

const isProject = ({ tags }: ProjectPage): boolean =>
  tags.includes('project');

const isFinished = ({ tags }: ProjectPage): boolean =>
  !tags.includes('wip');

const enrichProjectPage = (post: WikiJsPost): ProjectPage => {
  // Extract time from description or use createdAt
  const match = /end:(\d\d\d\d-\d\d-\d\d)/g.exec(post.description);
  const time = new Date(match ? match[1] : post.createdAt);

  return {
    ...post,
    time,
    isBigProject: post.tags.includes('big project'),
  };
};

const sortProjectsByAdjustedTime = (
  a: EnrichedPost<ProjectEnriched>,
  b: EnrichedPost<ProjectEnriched>
): number => b.time.getTime() - a.time.getTime();

const renderTitle = (post: EnrichedPost<ProjectEnriched>): string => {
  const prefix = post.isBigProject ? '🔥' : '';
  return `${prefix}${post.title}`;
}

const renderDate = (post: EnrichedPost<ProjectEnriched>): string => {
  return post.time.toLocaleDateString('sv-SE');
}

const renderTags = (tags: string[]): string[] => {
  return tags.filter(tag => tag !== 'project' && tag !== 'big project');
};

export const showProjectGrid = async (override: GridOptions<ProjectEnriched> = {}): Promise<void> => {
  const isFinishedProject = combinePredicates(isProject, isFinished);
  return showGrid({
    enrichPost: enrichProjectPage,
    filterPost: isFinishedProject,
    sortPost: sortProjectsByAdjustedTime,
    renderOptions: {
      renderTitle,
      renderDate,
      renderTags
    },
    ...override,
  });
};
