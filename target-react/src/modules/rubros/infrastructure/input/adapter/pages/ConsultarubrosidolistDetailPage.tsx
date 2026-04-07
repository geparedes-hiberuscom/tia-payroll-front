import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useConsultarubrosidolist } from '../hooks/useConsultarubrosidolist';
import { ConsultarubrosidolistDetail } from '../components/ConsultarubrosidolistDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ConsultarubrosidolistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useConsultarubrosidolist();

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleDelete = async (itemId: number) => {
    if (window.confirm('¿Eliminar este registro?')) {
      await remove(itemId);
      navigate(ROUTES.PATHS['consultarubrosidolist']);
    }
  };

  if (loading && !selectedItem) return <Loading message="Cargando detalle..." />;
  if (error) return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) fetchById(id); }} />;
  if (!selectedItem) return <div>No se encontró el registro.</div>;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <ConsultarubrosidolistDetail
        item={selectedItem}
        onEdit={(item) => navigate(`/consultarubrosidolist/editar/${item.id}`)}
        onDelete={handleDelete}
        onBack={() => navigate(-1)}
      />
    </div>
  );
};
