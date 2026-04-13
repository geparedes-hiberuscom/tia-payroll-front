import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecaprobarlq } from '../hooks/useProcesosejecaprobarlq';
import { ProcesosejecaprobarlqViewMapper } from '../mapper/ProcesosejecaprobarlqViewMapper';
import { ProcesosejecaprobarlqForm } from '../components/ProcesosejecaprobarlqForm';
import { CreateProcesosejecaprobarlq, UpdateProcesosejecaprobarlq } from '../../../../domain/model/Procesosejecaprobarlq';

export const ProcesosejecaprobarlqCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosejecaprobarlq();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosejecaprobarlqViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosejecaprobarlq | UpdateProcesosejecaprobarlq) => {
    if (isEditMode && id) {
      await update(id, ProcesosejecaprobarlqViewMapper.toUpdateRequest(data as UpdateProcesosejecaprobarlq));
    } else {
      await create(ProcesosejecaprobarlqViewMapper.toCreateRequest(data as CreateProcesosejecaprobarlq));
    }
    navigate(ROUTES.PATHS['procesosejecaprobarlq']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="procesosejecaprobarlq-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Procesosejecaprobarlq</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosejecaprobarlqForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesosejecaprobarlq'])}
        loading={loading}
      />
    </main>
  );
};
