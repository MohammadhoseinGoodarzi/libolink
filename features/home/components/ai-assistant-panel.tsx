'use client';

import { Bot, User } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/shared/components/ui/input';

import type { AiPanelLabels } from '../types';

interface AiAssistantPanelProps {
  labels: AiPanelLabels;
}

export function AiAssistantPanel({ labels }: AiAssistantPanelProps) {
  const [input, setInput] = useState('');

  return (
    <div className="flex-1 rounded-2xl p-4 bg-linear-to-br from-brand-soft to-brand-glow dark:from-[#0c2218] dark:to-[#1a1a2e]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Bot size={15} className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-foreground">{labels.title}</span>
        </div>
        <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded font-medium">
          {labels.mode}
        </span>
      </div>

      <div className="flex items-start gap-2 mb-3">
        <User size={13} className="text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-foreground leading-relaxed">{labels.greeting}</p>
      </div>

      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={labels.placeholder}
        className="rounded-xl bg-background/70 dark:bg-card/80 border-border/50 dark:border-white/15 text-sm shadow-none"
      />
    </div>
  );
}
