'use client';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@/shared/utils/cn';

import { Button } from './button';
import { Input, type InputProps } from './input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          type={show ? 'text' : 'password'}
          variant={variant}
          className={cn('pr-12', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-primary hover:bg-transparent"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';
