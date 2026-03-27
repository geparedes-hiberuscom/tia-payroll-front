import React from 'react';
import { useRubros } from '../hooks/useRubros';
import { RubrosList } from '../components/RubrosList';
import { RubrosForm } from '../components/RubrosForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useRubros();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>📋 Gestión de Rubros</h1>
      <p>Rubros, conceptos e IDO</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <RubrosForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <RubrosList items={items} onDelete={remove} />
      )}
    </div>
  );
};
