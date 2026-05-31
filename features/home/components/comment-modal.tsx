'use client';

import { SendHorizonal, X } from 'lucide-react';
import { type KeyboardEvent, useRef, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/utils/cn';

import { MOCK_USER } from '../constants';
import type { Comment, CommentModalLabels, Post } from '../types';

interface CommentModalProps {
  post: Post;
  comments: Comment[];
  labels: CommentModalLabels;
  onClose: () => void;
  onSubmit: (postId: string, content: string) => void;
}

export function CommentModal({ post, comments, labels, onClose, onSubmit }: CommentModalProps) {
  const [text, setText] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const currentUserInitials = MOCK_USER.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(post.id, trimmed);
    setText('');
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const authorInitials = post.author.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className={cn(
          'flex flex-col gap-0 p-0 overflow-hidden [&>button]:hidden',
          // mobile: bottom sheet
          'top-auto bottom-0 left-0 translate-x-0 translate-y-0 w-full max-h-[90vh] rounded-t-2xl rounded-b-none border-x-0 border-b-0',
          // sm+: centered modal
          'sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:max-h-[85vh] sm:rounded-2xl sm:border',
        )}
      >
        <DialogTitle className="sr-only">{labels.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Comments on {post.author.name}&apos;s post
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border shrink-0">
          <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
            {labels.title}
          </span>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X size={10} />
            </Button>
          </DialogClose>
        </div>

        {/* Post preview */}
        <div className="flex items-start gap-3 px-5 py-3 bg-secondary/40 border-b border-border shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground shrink-0 select-none">
            {authorInitials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {post.author.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>

        {/* Comments list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 min-h-0">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">{labels.noComments}</p>
          ) : (
            comments.map((comment) => {
              const initials = comment.author.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              return (
                <div key={comment.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground shrink-0 select-none">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground/90 mt-0.5 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-border shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0 select-none">
            {currentUserInitials}
          </div>
          <div
            className={cn(
              'flex-1 flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-3 py-2',
              'focus-within:border-primary/50 transition-colors',
            )}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={labels.placeholder}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed max-h-28 overflow-y-auto"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={!text.trim()}
              onClick={handleSubmit}
              className="shrink-0 text-primary hover:text-primary hover:bg-primary/10 disabled:opacity-30"
            >
              <SendHorizonal size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
