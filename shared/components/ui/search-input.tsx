import { Mic, Search } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

import { Input, type InputProps } from './input';

type SearchInputProps = Omit<InputProps, 'type'> & {
  placeholder: string;
};

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="text"
        className={cn(
          'h-10 rounded-full bg-background dark:bg-secondary border-border pl-9 pr-10 text-sm shadow-none',
          className,
        )}
        {...props}
      />
      <Mic
        size={15}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
    </div>
  );
}
