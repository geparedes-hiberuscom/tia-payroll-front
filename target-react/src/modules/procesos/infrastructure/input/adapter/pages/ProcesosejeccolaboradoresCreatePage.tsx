import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejeccolaboradores } from '../hooks/useProcesosejeccolaboradores';
import { ProcesosejeccolaboradoresViewMapper } from '../mapper/ProcesosejeccolaboradoresViewMapper';
import { ProcesosejeccolaboradoresForm } from '../components/ProcesosejeccolaboradoresForm';
import { CreateProcesosejeccolaboradores, UpdateProcesosejeccolaboradores } from '../../../../domain/model/Procesosejeccolaboradores';

export const ProcesosejeccolaboradoresCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosejeccolaboradores();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosejeccolaboradoresViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosejeccolaboradores | UpdateProcesosejeccolaboradores) => {
    if (isEditMode && id) {
      await update(id, ProcesosejeccolaboradoresViewMapper.toUpdateRequest(data as UpdateProcesosejeccolaboradores));
    } else {
      await create(ProcesosejeccolaboradoresViewMapper.toCreateRequest(data as CreateProcesosejeccolaboradores));
    }
    navigate(ROUTES.PATHS['procesosejeccolaboradores']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="procesosejeccolaboradores-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Procesosejeccolaboradores</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosejeccolaboradoresForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesosejeccolaboradores'])}
        loading={loading}
      />
    </main>
  );
};
