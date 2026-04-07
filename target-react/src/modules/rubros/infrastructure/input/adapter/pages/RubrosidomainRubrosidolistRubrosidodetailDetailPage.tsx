import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosidomainRubrosidolistRubrosidodetail } from '../hooks/useRubrosidomainRubrosidolistRubrosidodetail';
import { RubrosidomainRubrosidolistRubrosidodetailDetail } from '../components/RubrosidomainRubrosidolistRubrosidodetailDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosidomainRubrosidolistRubrosidodetailDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useRubrosidomainRubrosidolistRubrosidodetail();

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  if (loading && !selectedItem) return <Loading message="Cargando detalle..." />;
  if (error) return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) fetchById(id); }} />;
  if (!selectedItem) return <div>No se encontró el registro.</div>;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <RubrosidomainRubrosidolistRubrosidodetailDetail
        item={selectedItem}
        onEdit={(item) => navigate(`/rubrosidomain-rubrosidolist-rubrosidodetail/editar/${item.id}`)}
        onDelete={async (itemId) => {
          if (window.confirm('¿Eliminar este registro?')) {
            await remove(itemId);
            navigate(ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail']);
          }
        }}
        onBack={() => navigate(-1)}
      />
    </div>
  );
};
