import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, forwardRef } from 'react';

import { cn } from '@/shared/utils/cn';

const inputVariants = cva(
  'flex w-full text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring md:text-sm',
        auth: 'h-13 rounded-full bg-secondary dark:bg-card border border-input dark:border-white/20 px-5 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
