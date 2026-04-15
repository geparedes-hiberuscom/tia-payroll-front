import { useMemo, useState } from 'react';
import { MultiSelectListProps } from '../MultiSelectList.types';

export const useMultiSelectList = ({
  options,
  selectedIds,
  onChange,
}: Pick<MultiSelectListProps, 'options' | 'selectedIds' | 'onChange'>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  const handleToggle = (id: string | number) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      onChange(selectedIds.filter((selected) => selected !== id));
      return;
    }

    onChange([...selectedIds, id]);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredOptions,
    handleToggle,
  };
};
