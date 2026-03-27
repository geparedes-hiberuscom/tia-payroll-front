import { useState, useCallback } from 'react';
import { AppError } from '@shared/domain/exception/AppError';

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof AppError) {
      setError(err);
    } else if (err instanceof Error) {
      setError(new AppError(err.message));
    } else {
      setError(new AppError('Error desconocido'));
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, handleError, clearError };
}
