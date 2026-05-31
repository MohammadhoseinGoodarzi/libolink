'use client';

import { Bot } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/shared/components/ui/input';

import type { AiPanelLabels } from '../types';

interface AiAssistantPanelProps {
  labels: AiPanelLabels;
}

export function AiAssistantPanel({ labels }: AiAssistantPanelProps) {
  const [input, setInput] = useState('');

  return (
    <div className="flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0">
      {/* Gradient body */}
      <div className="flex-1 flex flex-col p-4 bg-linear-to-b from-white to-brand-glow dark:from-[#1a1030] dark:to-[#0d0820]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot size={15} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground">{labels.title}</span>
          </div>
          <span className="bg-foreground text-background text-[10px] px-2.5 py-1 rounded-lg font-medium">
            {labels.mode}
          </span>
        </div>

        {/* Spacer pushes greeting to bottom */}
        <div className="flex-1" />

        <p className="text-xs text-foreground/70 leading-relaxed mb-3">{labels.greeting}</p>

        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={labels.placeholder}
          className="rounded-xl bg-white/80 dark:bg-white/10 border-transparent shadow-none text-sm"
        />
      </div>
    </div>
  );
}
