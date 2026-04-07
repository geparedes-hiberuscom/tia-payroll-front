import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosRubrosdialog } from '../hooks/useRubrosRubrosdialog';
import { RubrosRubrosdialogDetail } from '../components/RubrosRubrosdialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosRubrosdialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useRubrosRubrosdialog();

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  if (loading && !selectedItem) return <Loading message="Cargando detalle..." />;
  if (error) return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) fetchById(id); }} />;
  if (!selectedItem) return <div>No se encontró el registro.</div>;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <RubrosRubrosdialogDetail
        item={selectedItem}
        onEdit={(item) => navigate(`/rubros-rubrosdialog/editar/${item.idRubro}`)}
        onDelete={async (itemId) => {
          if (window.confirm('¿Eliminar este registro?')) {
            await remove(itemId);
            navigate(ROUTES.PATHS['rubros-rubrosdialog']);
          }
        }}
        onBack={() => navigate(-1)}
      />
    </div>
  );
};
