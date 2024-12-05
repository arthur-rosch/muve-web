import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-[#187BF0] text-white hover:bg-[#187BF0]/90',
        secondary: 'bg-[#2A2A2A] text-white hover:bg-[#2A2A2A]/80',
        outline: 'border border-[#333333] bg-transparent hover:border-[#187BF0] hover:text-[#187BF0]',
        link: 'text-[#909090] hover:bg-[#333333] hover:text-white',
        danger: 'bg-[#333333] text-white hover:brightness-75',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187BF0] focus-visible:ring-offset-2 transition-all transaction-duration:200ms'
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);