'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

import type { PostCardProps } from '../types';

const TRUNCATE_AT = 500;

export function PostCard({
  post,
  likeLabel,
  commentLabel,
  shareLabel,
  copiedLabel,
  liked,
  likeCount,
  shared,
  onLike,
  onComment,
  onShare,
  onImageClick,
}: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { author, content, timestamp, bookCoverUrl, commentsCount } = post;

  const isLong = content.length > TRUNCATE_AT;
  const displayContent =
    isLong && !expanded
      ? content.slice(0, content.lastIndexOf(' ', TRUNCATE_AT) || TRUNCATE_AT)
      : content;

  const initials = author.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50 dark:border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground shrink-0 select-none">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.handle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessageCircle size={12} className="text-primary" />
          {timestamp}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-sm leading-relaxed text-foreground whitespace-pre-line">
          {displayContent}
          {isLong && (
            <Button
              variant="ghost"
              onClick={() => setExpanded((v) => !v)}
              className="inline ml-1 px-0 py-0 h-auto text-sm text-primary hover:bg-transparent hover:text-primary/80 font-medium"
            >
              {expanded ? 'show less' : 'show more...'}
            </Button>
          )}
        </div>
        {bookCoverUrl && (
          <button
            type="button"
            className="w-full sm:w-28 sm:shrink-0 rounded-xl overflow-hidden cursor-zoom-in p-0 bg-transparent border-0 block"
            onClick={() => onImageClick?.(bookCoverUrl)}
          >
            <Image
              src={bookCoverUrl}
              alt=""
              width={0}
              height={0}
              unoptimized={bookCoverUrl.startsWith('blob:')}
              sizes="112px"
              className="w-full h-auto block"
            />
          </button>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
        <Button
          variant="ghost"
          onClick={onLike}
          className={cn(
            'h-auto px-0 gap-2 text-sm hover:bg-transparent transition-colors',
            liked
              ? 'text-red-500 hover:text-red-500'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          {likeCount > 0 ? likeCount : likeLabel}
        </Button>

        <Button
          variant="ghost"
          onClick={onComment}
          className="h-auto px-0 gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-transparent"
        >
          <MessageCircle size={16} />
          {commentsCount > 0 ? commentsCount : commentLabel}
        </Button>

        <Button
          variant="ghost"
          onClick={onShare}
          className={cn(
            'h-auto px-0 gap-2 text-sm hover:bg-transparent transition-colors',
            shared ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Share2 size={16} />
          {shared ? copiedLabel : shareLabel}
        </Button>
      </div>
    </div>
  );
}
