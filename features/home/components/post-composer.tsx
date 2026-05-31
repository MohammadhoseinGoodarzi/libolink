'use client';

import { ImageIcon, MapPin, Tag, X } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

const MAX_CHARS = 5_000;

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    // TODO: call post service with { text, imageFile }
    setText('');
    removeImage();
  };

  const charCount = text.length;
  const isEmpty = charCount === 0 && !imagePreview;
  const charCountColor =
    charCount >= MAX_CHARS * 0.95
      ? 'text-red-500'
      : charCount >= MAX_CHARS * 0.8
        ? 'text-amber-500'
        : 'text-muted-foreground';

  return (
    <div className="bg-background rounded-2xl p-4 border border-border/60">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-secondary shrink-0 flex items-center justify-center text-xs font-bold text-secondary-foreground select-none">
          MK
        </div>
        <div className="flex-1 flex gap-4 items-start">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            maxLength={MAX_CHARS}
            rows={2}
            className="flex-1 resize-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none leading-relaxed"
          />
          {imagePreview && (
            <div className="relative w-36 h-48 rounded-xl overflow-hidden shrink-0 bg-muted">
              <Image src={imagePreview} alt="" fill unoptimized className="object-cover" />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={removeImage}
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/50 hover:bg-black/70 text-white hover:text-white"
              >
                <X size={10} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
            className="h-auto px-0 gap-1.5 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
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

        <div className="flex items-center gap-3">
          {charCount > 0 && (
            <span className={cn('text-xs tabular-nums', charCountColor)}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          )}
          <Button variant="post" size="post" disabled={isEmpty} onClick={handleSubmit}>
            {postLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
