export function inputClassName(hasError = false) {
  return [
    'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition',
    'placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100',
    hasError ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200',
  ].join(' ');
}

export function textAreaClassName(hasError = false) {
  return [inputClassName(hasError), 'min-h-28 resize-y'].join(' ');
}

export function checkboxClassName() {
  return 'h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500';
}

export function formatDateLabel(value?: string) {
  if (!value) {
    return 'No disponible';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('es-EC', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

export function formatShortDate(value?: string) {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toISOString().slice(0, 10);
}

export function formatNumberLabel(value?: number) {
  return new Intl.NumberFormat('es-EC').format(value ?? 0);
}

export function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function toOptionalString(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
