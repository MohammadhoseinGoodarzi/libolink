'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { likePost, sharePost, unlikePost } from '../services/post-service';
import type { Post } from '../types';

interface PostState {
  liked: boolean;
  likeCount: number;
  shared: boolean;
}

const DEFAULT_STATE: PostState = { liked: false, likeCount: 0, shared: false };

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

  const registerPost = useCallback((postId: string, initialLikes: number) => {
    setStates((prev) => {
      if (prev[postId]) return prev;
      return { ...prev, [postId]: { liked: false, likeCount: initialLikes, shared: false } };
    });
  }, []);

  const toggleLike = useCallback(
    (postId: string) => {
      const current = states[postId] ?? DEFAULT_STATE;
      const nextLiked = !current.liked;
      void (nextLiked ? likePost(postId) : unlikePost(postId));
      setStates((prev) => {
        const entry = prev[postId] ?? DEFAULT_STATE;
        return {
          ...prev,
          [postId]: {
            ...entry,
            liked: nextLiked,
            likeCount: entry.likeCount + (nextLiked ? 1 : -1),
          },
        };
      });
    },
    [states],
  );

  const triggerShare = useCallback((postId: string) => {
    void sharePost(postId);
    clearTimeout(shareTimers.current[postId]);
    setStates((prev) => ({
      ...prev,
      [postId]: { ...(prev[postId] ?? DEFAULT_STATE), shared: true },
    }));
    shareTimers.current[postId] = setTimeout(() => {
      setStates((prev) => ({
        ...prev,
        [postId]: { ...(prev[postId] ?? DEFAULT_STATE), shared: false },
      }));
    }, 2000);
  }, []);

  return { states, toggleLike, triggerShare, registerPost };
}
