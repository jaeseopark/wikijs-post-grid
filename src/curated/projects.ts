import { WikiJsPost, EnrichedPost } from '../types';
import { showGrid } from '../index';
import { combinePredicates } from '../utils';

type ProjectEnriched = {
  time: Date;
  isBigProject: boolean;
  filteredTags: string[];
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

  const filteredTags = post.tags.filter(
    (tag: string) => tag !== 'big project' && tag !== 'small project'
  );

  return {
    ...post,
    time,
    isBigProject: post.tags.includes('big project'),
    filteredTags,
  };
};

const sortProjectsByAdjustedTime = (
  a: EnrichedPost<ProjectEnriched>,
  b: EnrichedPost<ProjectEnriched>
): number => b.time.getTime() - a.time.getTime();

export const showProjectGrid = async (): Promise<void> => {
  const isFinishedProject = combinePredicates(isProject, isFinished);
  return showGrid({
    enrichPost: enrichProjectPage,
    filterPost: isFinishedProject,
    sortPost: sortProjectsByAdjustedTime,
  });
};
