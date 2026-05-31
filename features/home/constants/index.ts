import type { Post, Story } from '../types';

export const MOCK_USER = {
  name: 'Mehrab Kargardoost',
  role: 'Performance Marketer',
  favoriteBook: 'Harry Potter',
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'Amara Collins', handle: '@Anna' },
    content:
      "The Legacy of Prairie Winds by Glenda K Clare is a saga that chronicles the life of Johann (John) Gehring, a young German immigrant who bravely journeys to America in search of a new life.\n\nAt sixteen, Johann arrives in the Nebraska's rugged prairies. He encounters tornadoes, prairie fires, and experiences the freezing winters.",
    timestamp: '1 hour ago',
    bookCoverUrl: 'https://picsum.photos/seed/prairie1/96/136',
    likes: 24,
    commentsCount: 8,
  },
  {
    id: '2',
    author: { name: 'Amara Collins', handle: '@Anna' },
    content:
      "The Legacy of Prairie Winds by Glenda K Clare is a saga that chronicles the life of Johann (John) Gehring, a young German immigrant who bravely journeys to America in search of a new life.\n\nAt sixteen, Johann arrives in the Nebraska's rugged prairies. He encounters tornadoes, prairie fires, and experiences the freezing winters.",
    timestamp: '1 hour ago',
    bookCoverUrl: 'https://picsum.photos/seed/prairie2/96/136',
    likes: 11,
    commentsCount: 3,
  },
];

export const MOCK_STORIES: Story[] = [
  { id: '1', coverUrl: 'https://picsum.photos/seed/story1/64/96', alt: 'Story 1' },
  { id: '2', coverUrl: 'https://picsum.photos/seed/story2/64/96', alt: 'Story 2' },
  { id: '3', coverUrl: 'https://picsum.photos/seed/story3/64/96', alt: 'Story 3' },
];
