'use client';

import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

import { PostCard } from '../components/post-card';
import { PostComposer } from '../components/post-composer';
import { SocialMediaNav } from '../components/social-media-nav';
import { StoriesPanel } from '../components/stories-panel';
import { usePostActions } from '../hooks/use-post-actions';
import type { FeedTab, HomeFeedLabels, Post, Story } from '../types';

interface HomeFeedProps {
  posts: Post[];
  stories: Story[];
  labels: HomeFeedLabels;
}

export function HomeFeed({ posts, stories, labels }: HomeFeedProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>('recent');
  const { states, toggleLike, triggerShare } = usePostActions(posts);

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

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-4">
        <div className="lg:hidden">
          <StoriesPanel title={labels.storiesTitle} stories={stories} />
        </div>

        {posts.map((post) => (
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
            onComment={() => {}}
            onShare={() => triggerShare(post.id)}
          />
        ))}
      </div>

      <div className="pt-3">
        <PostComposer
          placeholder={labels.writeNowPlaceholder}
          imageLabel={labels.imageOption}
          locationLabel={labels.locationOption}
          tagLabel={labels.tagOption}
          postLabel={labels.post}
        />
      </div>
    </div>
  );
}
