import React from 'react';
import { useCostos } from '../hooks/useCostos';
import { CostosList } from '../components/CostosList';
import { CostosForm } from '../components/CostosForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const CostosPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useCostos();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>💼 Distribución de Costos</h1>
      <p>Distribución por centro de costo</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <CostosForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <CostosList items={items} onDelete={remove} />
      )}
    </div>
  );
};
