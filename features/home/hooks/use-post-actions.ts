'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { likePost, sharePost, unlikePost } from '../services/post-service';
import type { Post } from '../types';

interface PostState {
  liked: boolean;
  likeCount: number;
  shared: boolean;
}

export function usePostActions(posts: Post[]) {
  const [states, setStates] = useState<Record<string, PostState>>(() =>
    Object.fromEntries(
      posts.map((p) => [p.id, { liked: false, likeCount: p.likes, shared: false }]),
    ),
  );

  const shareTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const timers = shareTimers.current;
    return () => {
      for (const id of Object.values(timers)) clearTimeout(id);
    };
  }, []);

  const toggleLike = useCallback(
    (postId: string) => {
      const nextLiked = !states[postId].liked;
      void (nextLiked ? likePost(postId) : unlikePost(postId));
      setStates((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          liked: nextLiked,
          likeCount: prev[postId].likeCount + (nextLiked ? 1 : -1),
        },
      }));
    },
    [states],
  );

  const triggerShare = useCallback((postId: string) => {
    void sharePost(postId);
    clearTimeout(shareTimers.current[postId]);
    setStates((prev) => ({ ...prev, [postId]: { ...prev[postId], shared: true } }));
    shareTimers.current[postId] = setTimeout(() => {
      setStates((prev) => ({ ...prev, [postId]: { ...prev[postId], shared: false } }));
    }, 2000);
  }, []);

  return { states, toggleLike, triggerShare };
}
