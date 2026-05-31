'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

import { CommentModal } from '../components/comment-modal';
import { ImageLightbox } from '../components/image-lightbox';
import { PostCard } from '../components/post-card';
import { PostComposer } from '../components/post-composer';
import { SocialMediaNav } from '../components/social-media-nav';
import { StoriesPanel } from '../components/stories-panel';
import { MOCK_USER } from '../constants';
import { useComments } from '../hooks/use-comments';
import { usePostActions } from '../hooks/use-post-actions';
import { createPost } from '../services/post-service';
import type { CommentModalLabels, FeedTab, HomeFeedLabels, Post, Story } from '../types';

interface HomeFeedProps {
  posts: Post[];
  stories: Story[];
  labels: HomeFeedLabels;
}

export function HomeFeed({ posts: initialPosts, stories, labels }: HomeFeedProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>('recent');
  const [localPosts, setLocalPosts] = useState<Post[]>(initialPosts);
  const { states, toggleLike, triggerShare, registerPost } = usePostActions(localPosts);
  const { openPost, openCommentsList, openComments, closeComments, submitComment } =
    useComments(localPosts);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [composerVisible, setComposerVisible] = useState(true);

  const handleNewPost = useCallback(
    (content: string, imageFile?: File) => {
      const newPost: Post = {
        id: crypto.randomUUID(),
        author: { name: MOCK_USER.name, handle: MOCK_USER.handle },
        content,
        bookCoverUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
        timestamp: 'Just now',
        likes: 0,
        commentsCount: 0,
      };
      setLocalPosts((prev) => [newPost, ...prev]);
      registerPost(newPost.id, 0);
      void createPost({ content, imageFile });
    },
    [registerPost],
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const composerVisibleRef = useRef(true);
  const lastComposerToggle = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const now = Date.now();
      // ignore layout-induced scroll events fired during the composer animation
      if (now - lastComposerToggle.current < 350) return;

      const y = el.scrollTop;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < 8) return;

      lastScrollY.current = y;
      const newVisible = y < 10 || delta < 0;

      if (composerVisibleRef.current !== newVisible) {
        composerVisibleRef.current = newVisible;
        lastComposerToggle.current = now;
        setComposerVisible(newVisible);
      }
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const commentModalLabels: CommentModalLabels = {
    title: labels.commentModalTitle,
    noComments: labels.commentModalNoComments,
    placeholder: labels.commentModalPlaceholder,
    send: labels.commentModalSend,
  };

  const tabs: { key: FeedTab; label: string }[] = [
    { key: 'recent', label: labels.tabRecent },
    { key: 'popular', label: labels.tabPopular },
    { key: 'following', label: labels.tabFollowing },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="hidden lg:block sticky top-0 z-10 bg-neutral-100 dark:bg-background pb-4">
        <SocialMediaNav label={labels.socialMediaLabel} />
      </div>

      <div className="flex gap-6 border-b border-border">
        {tabs.map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            onClick={() => setActiveTab(key)}
            className={cn(
              'h-auto pb-2.5 px-0 rounded-none -mb-px text-sm font-medium hover:bg-transparent border-b-2',
              activeTab === key
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground',
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-4 py-4">
        <div className="lg:hidden">
          <StoriesPanel title={labels.storiesTitle} stories={stories} />
        </div>

        {localPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            likeLabel={labels.like}
            commentLabel={labels.comment}
            shareLabel={labels.share}
            copiedLabel={labels.copied}
            liked={states[post.id]?.liked ?? false}
            likeCount={states[post.id]?.likeCount ?? post.likes}
            shared={states[post.id]?.shared ?? false}
            onLike={() => toggleLike(post.id)}
            onComment={() => openComments(post.id)}
            onShare={() => triggerShare(post.id)}
            onImageClick={(url) => setLightboxUrl(url)}
          />
        ))}
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          composerVisible ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="pt-3">
          <PostComposer
            placeholder={labels.writeNowPlaceholder}
            imageLabel={labels.imageOption}
            locationLabel={labels.locationOption}
            tagLabel={labels.tagOption}
            postLabel={labels.post}
            onPost={handleNewPost}
          />
        </div>
      </div>

      {lightboxUrl && <ImageLightbox src={lightboxUrl} onClose={() => setLightboxUrl(null)} />}

      {openPost && (
        <CommentModal
          post={openPost}
          comments={openCommentsList}
          labels={commentModalLabels}
          onClose={closeComments}
          onSubmit={submitComment}
        />
      )}
    </div>
  );
}
