import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/components/ui/button';

import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  likeLabel: string;
  commentLabel: string;
  shareLabel: string;
}

export function PostCard({ post, likeLabel, commentLabel, shareLabel }: PostCardProps) {
  const { author, content, timestamp, bookCoverUrl } = post;

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
          <div className="w-24 h-34 rounded-xl overflow-hidden shrink-0 bg-muted">
            <Image
              src={bookCoverUrl}
              alt=""
              width={96}
              height={136}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
        <Button
          variant="ghost"
          disabled
          className="h-auto px-0 gap-2 text-sm text-muted-foreground hover:bg-transparent"
        >
          <Heart size={16} />
          {likeLabel}
        </Button>
        <Button
          variant="ghost"
          disabled
          className="h-auto px-0 gap-2 text-sm text-muted-foreground hover:bg-transparent"
        >
          <MessageCircle size={16} />
          {commentLabel}
        </Button>
        <Button
          variant="ghost"
          disabled
          className="h-auto px-0 gap-2 text-sm text-muted-foreground hover:bg-transparent"
        >
          <Share2 size={16} />
          {shareLabel}
        </Button>
      </div>
    </div>
  );
}
