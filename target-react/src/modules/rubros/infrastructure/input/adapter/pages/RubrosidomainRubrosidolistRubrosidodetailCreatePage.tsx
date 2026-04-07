import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosidomainRubrosidolistRubrosidodetail } from '../hooks/useRubrosidomainRubrosidolistRubrosidodetail';
import { RubrosidomainRubrosidolistRubrosidodetailForm } from '../components/RubrosidomainRubrosidolistRubrosidodetailForm';
import { CreateRubrosidomainRubrosidolistRubrosidodetail, UpdateRubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosidomainRubrosidolistRubrosidodetailCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubrosidomainRubrosidolistRubrosidodetail();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateRubrosidomainRubrosidolistRubrosidodetail | UpdateRubrosidomainRubrosidolistRubrosidodetail) => {
    if (isEditMode && id) {
      await update(id, data as UpdateRubrosidomainRubrosidolistRubrosidodetail);
    } else {
      await create(data as CreateRubrosidomainRubrosidolistRubrosidodetail);
    }
    navigate(ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail']);
  };

  if (isEditMode && loading && !selectedItem) return <Loading message="Cargando datos..." />;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} rubro IDO</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <RubrosidomainRubrosidolistRubrosidodetailForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
