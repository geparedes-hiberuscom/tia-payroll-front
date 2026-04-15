

import { forwardRef } from 'react';
import { cn } from 'utils-tailwindcss';
import {
  MultiSelectListBoxStyles,
  MultiSelectListCheckboxStyles,
  MultiSelectListContainerStyles,
  MultiSelectListEmptyStyles,
  MultiSelectListLabelStyles,
  MultiSelectListOptionLabelStyles,
  MultiSelectListOptionsStyles,
  MultiSelectListSearchStyles,
} from './MultiSelectList.styles';
import { useMultiSelectList } from './hooks/useMultiSelectList';
import { MultiSelectListProps } from './MultiSelectList.types';

export const MultiSelectList = forwardRef<HTMLDivElement, MultiSelectListProps>(
  (
    {
      label,
      options,
      selectedIds,
      onChange,
      disabled = false,
      placeholder = 'Buscar...',
      testId,
      className,
      ...rest
    },
    ref,
  ) => {
    const { searchTerm, setSearchTerm, filteredOptions, handleToggle } = useMultiSelectList({
      options,
      selectedIds,
      onChange,
    });

    return (
      <div ref={ref} className={cn(MultiSelectListContainerStyles(), className)} {...rest}>
        <label className={MultiSelectListLabelStyles()}>{label}</label>

        {options.length > 10 ? (
          <input
            data-testid={testId ? `${testId}-search` : undefined}
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={disabled}
            className={MultiSelectListSearchStyles()}
          />
        ) : null}

        <div className={MultiSelectListBoxStyles()}>
          {filteredOptions.length === 0 ? (
            <p className={MultiSelectListEmptyStyles()}>Sin coincidencias</p>
          ) : (
            <div className={MultiSelectListOptionsStyles()}>
              {filteredOptions.map((option) => (
                <label
                  key={option.id}
                  className={MultiSelectListOptionLabelStyles({ disabled })}
                >
                  <input
                    data-testid={testId ? `${testId}-checkbox-${option.id}` : undefined}
                    type="checkbox"
                    checked={selectedIds.includes(option.id)}
                    onChange={() => handleToggle(option.id)}
                    disabled={disabled}
                    className={MultiSelectListCheckboxStyles()}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

MultiSelectList.displayName = 'MultiSelectList';
