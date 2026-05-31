'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/shared/components/ui/button';

interface ImageLightboxProps {
  src: string;
  onClose: () => void;
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xl p-4">
      {/* invisible backdrop button for click-outside-to-close */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        tabIndex={-1}
      />
      <div className="relative z-10">
        <Image
          src={src}
          alt=""
          width={0}
          height={0}
          unoptimized
          sizes="100vw"
          className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="bg-black/30 text-white hover:bg-black/50 hover:text-white"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
