import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from 'utils-tailwindcss';
import { inputClassName } from './FeaturePageParts.helpers';

export type SearchableSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: string[];
};

export type SearchableSelectProps = {
  options: SearchableSelectOption[];
  value?: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  id?: string;
  name?: string;
  testId?: string;
  searchThreshold?: number;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function SearchableSelect({
  options,
  value = '',
  onChange,
  placeholder = 'Seleccione una opcion',
  searchPlaceholder = 'Buscar...',
  noResultsText = 'Sin resultados',
  disabled = false,
  hasError = false,
  className,
  id,
  name,
  testId,
  searchThreshold = 10,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const searchable = options.length > searchThreshold;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => {
      const haystack = [option.label, option.value, ...(option.keywords ?? [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [options, query]);

  useEffect(() => {
    if (!searchable) {
      return;
    }

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [searchable]);

  if (!searchable) {
    return (
      <select
        id={id}
        name={name}
        data-testid={testId}
        className={cn(inputClassName(hasError), className)}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  const displayValue = isOpen ? query : selectedOption?.label ?? '';

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <input
        id={id}
        data-testid={testId}
        type="text"
        className={inputClassName(hasError)}
        placeholder={selectedOption ? searchPlaceholder : placeholder}
        value={displayValue}
        onFocus={() => {
          setIsOpen(true);
          setQuery('');
        }}
        onChange={(event) => {
          setIsOpen(true);
          setQuery(event.target.value);
        }}
        disabled={disabled}
        autoComplete="off"
      />

      {isOpen ? (
        <div className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
          <button
            type="button"
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              onChange('');
              setIsOpen(false);
              setQuery('');
            }}
          >
            {placeholder}
          </button>

          {filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                'w-full rounded-xl px-3 py-2 text-left text-sm transition',
                value === option.value
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-slate-700 hover:bg-slate-50',
                option.disabled ? 'cursor-not-allowed opacity-50' : '',
              )}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                if (option.disabled) {
                  return;
                }

                onChange(option.value);
                setIsOpen(false);
                setQuery('');
              }}
            >
              {option.label}
            </button>
          ))}

          {filteredOptions.length === 0 ? (
            <p className="px-3 py-2 text-sm text-slate-500">{noResultsText}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}