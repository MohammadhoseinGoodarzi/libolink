'use client';

import { useCallback, useState } from 'react';

import { MOCK_USER } from '../constants';
import { addComment } from '../services/comment-service';
import type { Comment, Post } from '../types';

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: { name: 'Sara Ahmadi', handle: '@sara' },
    content: 'Such a great book! I read it last summer and loved every page.',
    timestamp: '2 hours ago',
  },
  {
    id: 'c2',
    author: { name: 'Dani Lee', handle: '@dani' },
    content: 'Adding this to my reading list right now!',
    timestamp: '45 minutes ago',
  },
];

export function useComments(posts: Post[]) {
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>(() =>
    Object.fromEntries(posts.map((p) => [p.id, MOCK_COMMENTS])),
  );

  const openComments = useCallback((postId: string) => {
    setOpenPostId(postId);
  }, []);

  const closeComments = useCallback(() => {
    setOpenPostId(null);
  }, []);

  const submitComment = useCallback((postId: string, content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: { name: MOCK_USER.name, handle: '@me' },
      content,
      timestamp: 'Just now',
    };
    void addComment(postId, content);
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), newComment],
    }));
  }, []);

  const openPost = openPostId ? (posts.find((p) => p.id === openPostId) ?? null) : null;
  const openCommentsList = openPostId ? (commentsByPost[openPostId] ?? []) : [];

  return { openPost, openCommentsList, openComments, closeComments, submitComment };
}
