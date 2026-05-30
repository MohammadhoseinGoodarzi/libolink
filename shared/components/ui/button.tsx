import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9.75px] text-[13px] font-medium leading-none pt-0.5 transition-colors duration-150 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary/91 text-primary-foreground hover:bg-primary/80 focus-visible:ring-primary/50 active:bg-primary/70',
        outline:
          'bg-secondary text-secondary-foreground hover:bg-accent focus-visible:ring-primary active:bg-brand-surface-active',
        ghost:
          'bg-transparent text-primary hover:bg-secondary focus-visible:ring-primary/50 active:bg-accent',
        destructive:
          'rounded-xl bg-destructive text-destructive-foreground text-xl font-bold hover:bg-destructive/90 focus-visible:ring-destructive active:bg-destructive/80',
        post: 'bg-primary text-brand-soft font-semibold shadow-[0px_4px_6px_-1px_var(--color-brand-glow),0px_2px_4px_-2px_var(--color-brand-glow)] hover:opacity-90 focus-visible:ring-brand-glow active:opacity-75',
      },
      size: {
        default: 'h-[42px] px-6',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-[52px] px-8',
        icon: 'h-9 w-9',
        'icon-sm': 'h-8 w-8',
        post: 'h-[19px] px-[10px] text-[11px]',
      },
    },
    compoundVariants: [{ variant: 'destructive', size: 'default', class: 'h-13' }],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        type={asChild ? type : (type ?? 'button')}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
