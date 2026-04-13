import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecabrirlq } from '../hooks/useProcesosejecabrirlq';
import { ProcesosejecabrirlqViewMapper } from '../mapper/ProcesosejecabrirlqViewMapper';
import { ProcesosejecabrirlqForm } from '../components/ProcesosejecabrirlqForm';
import { CreateProcesosejecabrirlq, UpdateProcesosejecabrirlq } from '../../../../domain/model/Procesosejecabrirlq';

export const ProcesosejecabrirlqCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosejecabrirlq();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosejecabrirlqViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosejecabrirlq | UpdateProcesosejecabrirlq) => {
    if (isEditMode && id) {
      await update(id, ProcesosejecabrirlqViewMapper.toUpdateRequest(data as UpdateProcesosejecabrirlq));
    } else {
      await create(ProcesosejecabrirlqViewMapper.toCreateRequest(data as CreateProcesosejecabrirlq));
    }
    navigate(ROUTES.PATHS['procesosejecabrirlq']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="procesosejecabrirlq-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Procesosejecabrirlq</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosejecabrirlqForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesosejecabrirlq'])}
        loading={loading}
      />
    </main>
  );
};
