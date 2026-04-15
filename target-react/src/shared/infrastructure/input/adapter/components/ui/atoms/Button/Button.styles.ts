import { cva } from 'class-variance-authority';

export const ButtonStyles = cva(
  // Base classes that always apply
  'inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-200 focus:ring-primary active:bg-primary-300',
        secondary:
          'bg-secondary hover:bg-secondary-200 focus:ring-secondary active:bg-secondary-300',
        outline:
          'bg-transparent border-solid text-primary border-2 border-primary hover:bg-primary-000 focus:ring-primary active:bg-primary-050 ',
        ghost:
          'bg-transparent  hover:bg-secondary-000 focus:ring-secondary-100 active:bg-secondary-100',
      },
      size: {
        sm: 'px-md py-xs text-sm h-8 gap-xs',
        md: 'px-lg py-sm text-base h-10 gap-sm',
        lg: 'px-xl py-md text-lg h-12 gap-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
