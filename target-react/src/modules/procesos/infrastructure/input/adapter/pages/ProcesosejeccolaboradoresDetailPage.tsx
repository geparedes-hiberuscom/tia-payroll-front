import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejeccolaboradores } from '../hooks/useProcesosejeccolaboradores';
import { ProcesosejeccolaboradoresViewMapper } from '../mapper/ProcesosejeccolaboradoresViewMapper';
import { ProcesosejeccolaboradoresDetail } from '../components/ProcesosejeccolaboradoresDetail';

export const ProcesosejeccolaboradoresDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useProcesosejeccolaboradores();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const domainItem = useMemo(() => (selectedItem ? ProcesosejeccolaboradoresViewMapper.toDomain(selectedItem) : null), [selectedItem]);

  if (loading && !domainItem) {
    return <Loading message="Cargando detalle..." />;
  }

  if (!domainItem) {
    return (
      <main className="container">
        {error ? <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} /> : <p>No se encontro el registro.</p>}
      </main>
    );
  }

  return (
    <main className="container" data-testid="procesosejeccolaboradores-detail-page">
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />}
      <ProcesosejeccolaboradoresDetail
        item={domainItem}
        onEdit={(item) => navigate(ROUTES.PATHS['procesosejeccolaboradores'] + '/edit/' + item.id)}
        onDelete={async (recordId) => {
          const ok = window.confirm('Deseas eliminar este registro?');
          if (!ok) {
            return;
          }
          await remove(recordId);
          navigate(ROUTES.PATHS['procesosejeccolaboradores']);
        }}
        onBack={() => navigate(ROUTES.PATHS['procesosejeccolaboradores'])}
      />
    </main>
  );
};
