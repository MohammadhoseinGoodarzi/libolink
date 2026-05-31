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
  likes: number;
  commentsCount: number;
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
  copied: string;
  commentModalTitle: string;
  commentModalNoComments: string;
  commentModalPlaceholder: string;
  commentModalSend: string;
}

export interface PostCardProps {
  post: Post;
  likeLabel: string;
  commentLabel: string;
  shareLabel: string;
  copiedLabel: string;
  liked: boolean;
  likeCount: number;
  shared: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onImageClick?: (url: string) => void;
}

export interface AiPanelLabels {
  title: string;
  mode: string;
  greeting: string;
  placeholder: string;
}

export interface Comment {
  id: string;
  author: PostAuthor;
  content: string;
  timestamp: string;
}

export interface CommentModalLabels {
  title: string;
  noComments: string;
  placeholder: string;
  send: string;
}
