import { Plus } from 'lucide-react';
import Image from 'next/image';

import type { Story } from '../types';

interface StoriesPanelProps {
  title: string;
  stories: Story[];
}

export function StoriesPanel({ title, stories }: StoriesPanelProps) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-destructive/15 cursor-pointer hover:bg-destructive/25 transition-colors">
          <Plus size={20} className="text-destructive" />
        </div>
        {stories.map((story) => (
          <div
            key={story.id}
            className="shrink-0 w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 cursor-pointer"
          >
            <Image
              src={story.coverUrl}
              alt={story.alt}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
