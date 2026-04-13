import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useEjecucionproccierre } from '../hooks/useEjecucionproccierre';
import { EjecucionproccierreViewMapper } from '../mapper/EjecucionproccierreViewMapper';
import { EjecucionproccierreForm } from '../components/EjecucionproccierreForm';
import { CreateEjecucionproccierre, UpdateEjecucionproccierre } from '../../../../domain/model/Ejecucionproccierre';

export const EjecucionproccierreCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useEjecucionproccierre();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return EjecucionproccierreViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateEjecucionproccierre | UpdateEjecucionproccierre) => {
    if (isEditMode && id) {
      await update(id, EjecucionproccierreViewMapper.toUpdateRequest(data as UpdateEjecucionproccierre));
    } else {
      await create(EjecucionproccierreViewMapper.toCreateRequest(data as CreateEjecucionproccierre));
    }
    navigate(ROUTES.PATHS['ejecucionproccierre']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="ejecucionproccierre-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Ejecucionproccierre</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <EjecucionproccierreForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['ejecucionproccierre'])}
        loading={loading}
      />
    </main>
  );
};
