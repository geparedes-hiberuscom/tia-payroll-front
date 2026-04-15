import { type VariantProps } from 'class-variance-authority';
import { MultiSelectListContainerStyles } from './MultiSelectList.styles';

export interface MultiSelectOption {
  id: string | number;
  label: string;
}

export interface MultiSelectListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof MultiSelectListContainerStyles> {
  label: string;
  options: MultiSelectOption[];
  selectedIds: Array<string | number>;
  onChange: (selectedIds: Array<string | number>) => void;
  disabled?: boolean;
  placeholder?: string;
  testId?: string;
}
