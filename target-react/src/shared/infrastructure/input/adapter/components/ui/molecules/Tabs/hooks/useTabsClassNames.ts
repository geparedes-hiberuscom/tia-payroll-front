import { cn } from 'utils-tailwindcss';

export const useTabsClassNames = () => {
  const merge = (...classNames: Array<string | undefined>) => cn(...classNames);

  return {
    merge,
  };
};
