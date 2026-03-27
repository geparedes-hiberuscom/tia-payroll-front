import React from 'react';
import { usePago } from '../hooks/usePago';
import { PagoList } from '../components/PagoList';
import { PagoForm } from '../components/PagoForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const PagoPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = usePago();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>🏦 Pago y Acreditación</h1>
      <p>Acreditaciones bancarias</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <PagoForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <PagoList items={items} onDelete={remove} />
      )}
    </div>
  );
};
