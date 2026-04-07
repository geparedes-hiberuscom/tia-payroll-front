import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosProcesosdialog } from '../hooks/useProcesosProcesosdialog';
import { ProcesosProcesosdialogViewMapper } from '../mapper/ProcesosProcesosdialogViewMapper';
import { ProcesosProcesosdialogForm } from '../components/ProcesosProcesosdialogForm';
import { CreateProcesosProcesosdialog, UpdateProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';

export const ProcesosProcesosdialogCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useProcesosProcesosdialog();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return ProcesosProcesosdialogViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog) => {
    if (isEditMode && id) {
      await update(id, ProcesosProcesosdialogViewMapper.toUpdateRequest(data as UpdateProcesosProcesosdialog));
    } else {
      await create(ProcesosProcesosdialogViewMapper.toCreateRequest(data as CreateProcesosProcesosdialog));
    }
    navigate(ROUTES.PATHS['procesos-procesosdialog']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }} data-testid="procesos-procesosdialog-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} proceso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <ProcesosProcesosdialogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['procesos-procesosdialog'])}
        loading={loading}
      />
    </div>
  );
};
