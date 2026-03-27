import React from 'react';
import { useReportes } from '../hooks/useReportes';
import { ReportesList } from '../components/ReportesList';
import { ReportesForm } from '../components/ReportesForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ReportesPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useReportes();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>📊 Reportes</h1>
      <p>Reportes y análisis</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <ReportesForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <ReportesList items={items} onDelete={remove} />
      )}
    </div>
  );
};
