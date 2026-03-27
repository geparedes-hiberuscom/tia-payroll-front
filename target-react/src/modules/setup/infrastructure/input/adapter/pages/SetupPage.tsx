import React from 'react';
import { useSetup } from '../hooks/useSetup';
import { SetupList } from '../components/SetupList';
import { SetupForm } from '../components/SetupForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const SetupPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useSetup();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>🔧 Setup y Configuración</h1>
      <p>Parámetros, tabla IR, plantillas contables</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <SetupForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <SetupList items={items} onDelete={remove} />
      )}
    </div>
  );
};
