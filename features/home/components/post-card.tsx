import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

import type { PostCardProps } from '../types';

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
}: PostCardProps) {
  const { author, content, timestamp, bookCoverUrl, commentsCount } = post;

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

      <div className="flex gap-4">
        <p className="flex-1 text-sm leading-relaxed text-foreground whitespace-pre-line">
          {content}
        </p>
        {bookCoverUrl && (
          <div className="w-36 h-48 rounded-xl overflow-hidden shrink-0 bg-muted">
            <Image
              src={bookCoverUrl}
              alt=""
              width={144}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
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
