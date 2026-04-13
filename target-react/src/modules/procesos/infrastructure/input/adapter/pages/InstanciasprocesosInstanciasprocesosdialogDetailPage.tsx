import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useInstanciasprocesosInstanciasprocesosdialog } from '../hooks/useInstanciasprocesosInstanciasprocesosdialog';
import { InstanciasprocesosInstanciasprocesosdialogViewMapper } from '../mapper/InstanciasprocesosInstanciasprocesosdialogViewMapper';
import { InstanciasprocesosInstanciasprocesosdialogDetail } from '../components/InstanciasprocesosInstanciasprocesosdialogDetail';

export const InstanciasprocesosInstanciasprocesosdialogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useInstanciasprocesosInstanciasprocesosdialog();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const domainItem = useMemo(() => (selectedItem ? InstanciasprocesosInstanciasprocesosdialogViewMapper.toDomain(selectedItem) : null), [selectedItem]);

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
    <main className="container" data-testid="instanciasprocesos-instanciasprocesosdialog-detail-page">
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />}
      <InstanciasprocesosInstanciasprocesosdialogDetail
        item={domainItem}
        onEdit={(item) => navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'] + '/edit/' + item.id)}
        onDelete={async (recordId) => {
          const ok = window.confirm('Deseas eliminar este registro?');
          if (!ok) {
            return;
          }
          await remove(recordId);
          navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog']);
        }}
        onBack={() => navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'])}
      />
    </main>
  );
};
