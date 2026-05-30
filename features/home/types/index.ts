export interface NavItem {
  key: string;
  href: string;
  label: string;
  disabled?: boolean;
}

export interface PostAuthor {
  name: string;
  handle: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  timestamp: string;
  bookCoverUrl?: string;
}

export interface Story {
  id: string;
  coverUrl: string;
  alt: string;
}

export type FeedTab = 'recent' | 'popular' | 'following';

export interface HomeFeedLabels {
  socialMediaLabel: string;
  storiesTitle: string;
  tabRecent: string;
  tabPopular: string;
  tabFollowing: string;
  writeNowPlaceholder: string;
  post: string;
  imageOption: string;
  locationOption: string;
  tagOption: string;
  like: string;
  comment: string;
  share: string;
}

export interface AiPanelLabels {
  title: string;
  mode: string;
  greeting: string;
  placeholder: string;
}
