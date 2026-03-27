import React from 'react';
import { useProcesos } from '../hooks/useProcesos';
import { ProcesosList } from '../components/ProcesosList';
import { ProcesosForm } from '../components/ProcesosForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ProcesosPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useProcesos();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>⚙️ Procesos de Nómina</h1>
      <p>Ejecutar procesos (quincena, mensual, etc)</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <ProcesosForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <ProcesosList items={items} onDelete={remove} />
      )}
    </div>
  );
};
