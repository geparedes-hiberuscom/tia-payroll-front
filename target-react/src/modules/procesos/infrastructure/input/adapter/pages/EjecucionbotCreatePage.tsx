import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useEjecucionbot } from '../hooks/useEjecucionbot';
import { EjecucionbotViewMapper } from '../mapper/EjecucionbotViewMapper';
import { EjecucionbotForm } from '../components/EjecucionbotForm';
import { CreateEjecucionbot, UpdateEjecucionbot } from '../../../../domain/model/Ejecucionbot';

export const EjecucionbotCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useEjecucionbot();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return EjecucionbotViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateEjecucionbot | UpdateEjecucionbot) => {
    if (isEditMode && id) {
      await update(id, EjecucionbotViewMapper.toUpdateRequest(data as UpdateEjecucionbot));
    } else {
      await create(EjecucionbotViewMapper.toCreateRequest(data as CreateEjecucionbot));
    }
    navigate(ROUTES.PATHS['ejecucionbot']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="ejecucionbot-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Ejecucionbot</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <EjecucionbotForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['ejecucionbot'])}
        loading={loading}
      />
    </main>
  );
};
