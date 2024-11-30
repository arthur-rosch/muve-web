import { forwardRef } from 'react';
import { cn } from '../../utils';
import InputMask from "react-input-mask";
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex w-full rounded-lg border px-3 py-2 text-sm transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#141414] border-[#333333] text-white placeholder:text-gray-500',
        filled: 'bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 px-2',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  mask?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, variant, size, mask, max, ...props }, ref) => {
   const isMasked = !!mask;

    if (isMasked) {
      return (
        <InputMask 
          mask={mask}
          maskPlaceholder={null}
          className={cn(
            inputVariants({ variant, size }),
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187BF0] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          inputRef={ref as any}
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, size }),
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187BF0] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);