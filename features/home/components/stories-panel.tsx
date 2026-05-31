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
        {/* Add story */}
        <div className="shrink-0 flex items-center justify-center w-16 h-24 rounded-3xl bg-card border border-border cursor-pointer hover:bg-secondary transition-colors">
          <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
            <Plus size={16} className="text-destructive" />
          </div>
        </div>

        {stories.map((story) => (
          <div
            key={story.id}
            className="shrink-0 relative w-16 h-24 rounded-3xl overflow-hidden ring-2 ring-primary/30 cursor-pointer hover:ring-primary/60 transition-all"
          >
            <Image src={story.coverUrl} alt={story.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
