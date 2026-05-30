'use client';

import { ImageIcon, MapPin, Tag } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

interface PostComposerProps {
  placeholder: string;
  imageLabel: string;
  locationLabel: string;
  tagLabel: string;
  postLabel: string;
}

export function PostComposer({
  placeholder,
  imageLabel,
  locationLabel,
  tagLabel,
  postLabel,
}: PostComposerProps) {
  const [text, setText] = useState('');

  return (
    <div className="bg-background rounded-2xl p-4 border border-border/60">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-secondary shrink-0 flex items-center justify-center text-xs font-bold text-secondary-foreground select-none">
          MK
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="flex-1 resize-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none leading-relaxed"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            disabled
            className="h-auto px-0 gap-1.5 text-xs text-muted-foreground hover:bg-transparent"
          >
            <ImageIcon size={14} />
            {imageLabel}
          </Button>
          <Button
            variant="ghost"
            disabled
            className="h-auto px-0 gap-1.5 text-xs text-muted-foreground hover:bg-transparent"
          >
            <MapPin size={14} />
            {locationLabel}
          </Button>
          <Button
            variant="ghost"
            disabled
            className="h-auto px-0 gap-1.5 text-xs text-muted-foreground hover:bg-transparent"
          >
            <Tag size={14} />
            {tagLabel}
          </Button>
        </div>
        <Button variant="post" size="post">
          {postLabel}
        </Button>
      </div>
    </div>
  );
}
