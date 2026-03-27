import React from 'react';
import { usePrestamos } from '../hooks/usePrestamos';
import { PrestamosList } from '../components/PrestamosList';
import { PrestamosForm } from '../components/PrestamosForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const PrestamosPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = usePrestamos();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>💰 Préstamos</h1>
      <p>Préstamos, anticipos, sobregiros, endeudamiento</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <PrestamosForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <PrestamosList items={items} onDelete={remove} />
      )}
    </div>
  );
};
