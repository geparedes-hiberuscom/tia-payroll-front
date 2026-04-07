import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecucionProcesosejecdialog } from '../hooks/useProcesosejecucionProcesosejecdialog';
import { ProcesosejecucionProcesosejecdialogViewMapper } from '../mapper/ProcesosejecucionProcesosejecdialogViewMapper';
import { ProcesosejecucionProcesosejecdialogForm } from '../components/ProcesosejecucionProcesosejecdialogForm';
import { CreateProcesosejecucionProcesosejecdialog, UpdateProcesosejecucionProcesosejecdialog } from '../../../../domain/model/ProcesosejecucionProcesosejecdialog';

export const ProcesosejecucionProcesosejecdialogCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosejecucionProcesosejecdialog();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosejecucionProcesosejecdialogViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosejecucionProcesosejecdialog | UpdateProcesosejecucionProcesosejecdialog) => {
    if (isEditMode && id) {
      await update(id, ProcesosejecucionProcesosejecdialogViewMapper.toUpdateRequest(data as UpdateProcesosejecucionProcesosejecdialog));
    } else {
      await create(ProcesosejecucionProcesosejecdialogViewMapper.toCreateRequest(data as CreateProcesosejecucionProcesosejecdialog));
    }
    navigate(ROUTES.PATHS['procesosejecucion-procesosejecdialog']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="procesosejecucion-procesosejecdialog-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} ProcesosejecucionProcesosejecdialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosejecucionProcesosejecdialogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesosejecucion-procesosejecdialog'])}
        loading={loading}
      />
    </main>
  );
};
