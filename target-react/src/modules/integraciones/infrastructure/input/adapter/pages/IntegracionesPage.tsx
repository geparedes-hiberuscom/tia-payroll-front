import React from 'react';
import { useIntegraciones } from '../hooks/useIntegraciones';
import { IntegracionesList } from '../components/IntegracionesList';
import { IntegracionesForm } from '../components/IntegracionesForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const IntegracionesPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useIntegraciones();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>🔗 Integraciones Externas</h1>
      <p>IESS y Contable</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <IntegracionesForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <IntegracionesList items={items} onDelete={remove} />
      )}
    </div>
  );
};
