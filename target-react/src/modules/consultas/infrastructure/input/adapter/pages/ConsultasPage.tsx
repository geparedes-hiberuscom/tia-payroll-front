import React from 'react';
import { useConsultas } from '../hooks/useConsultas';
import { ConsultasList } from '../components/ConsultasList';
import { ConsultasForm } from '../components/ConsultasForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ConsultasPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useConsultas();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>👤 Consultas</h1>
      <p>Nómina por colaborador, acumulados</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <ConsultasForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <ConsultasList items={items} onDelete={remove} />
      )}
    </div>
  );
};
