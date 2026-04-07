import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecucionreversionProcesosejecucionreversiondialog } from '../hooks/useProcesosejecucionreversionProcesosejecucionreversiondialog';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper } from '../mapper/ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogForm } from '../components/ProcesosejecucionreversionProcesosejecucionreversiondialogForm';
import { CreateProcesosejecucionreversionProcesosejecucionreversiondialog, UpdateProcesosejecucionreversionProcesosejecucionreversiondialog } from '../../../../domain/model/ProcesosejecucionreversionProcesosejecucionreversiondialog';

export const ProcesosejecucionreversionProcesosejecucionreversiondialogCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosejecucionreversionProcesosejecucionreversiondialog();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosejecucionreversionProcesosejecucionreversiondialog | UpdateProcesosejecucionreversionProcesosejecucionreversiondialog) => {
    if (isEditMode && id) {
      await update(id, ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toUpdateRequest(data as UpdateProcesosejecucionreversionProcesosejecucionreversiondialog));
    } else {
      await create(ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toCreateRequest(data as CreateProcesosejecucionreversionProcesosejecucionreversiondialog));
    }
    navigate(ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="procesosejecucionreversion-procesosejecucionreversiondialog-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} ProcesosejecucionreversionProcesosejecucionreversiondialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosejecucionreversionProcesosejecucionreversiondialogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog'])}
        loading={loading}
      />
    </main>
  );
};
