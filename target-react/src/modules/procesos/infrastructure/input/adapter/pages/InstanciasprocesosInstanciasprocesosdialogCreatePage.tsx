import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useInstanciasprocesosInstanciasprocesosdialog } from '../hooks/useInstanciasprocesosInstanciasprocesosdialog';
import { InstanciasprocesosInstanciasprocesosdialogViewMapper } from '../mapper/InstanciasprocesosInstanciasprocesosdialogViewMapper';
import { InstanciasprocesosInstanciasprocesosdialogForm } from '../components/InstanciasprocesosInstanciasprocesosdialogForm';
import { CreateInstanciasprocesosInstanciasprocesosdialog, UpdateInstanciasprocesosInstanciasprocesosdialog } from '../../../../domain/model/InstanciasprocesosInstanciasprocesosdialog';

export const InstanciasprocesosInstanciasprocesosdialogCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useInstanciasprocesosInstanciasprocesosdialog();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return InstanciasprocesosInstanciasprocesosdialogViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateInstanciasprocesosInstanciasprocesosdialog | UpdateInstanciasprocesosInstanciasprocesosdialog) => {
    if (isEditMode && id) {
      await update(id, InstanciasprocesosInstanciasprocesosdialogViewMapper.toUpdateRequest(data as UpdateInstanciasprocesosInstanciasprocesosdialog));
    } else {
      await create(InstanciasprocesosInstanciasprocesosdialogViewMapper.toCreateRequest(data as CreateInstanciasprocesosInstanciasprocesosdialog));
    }
    navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="instanciasprocesos-instanciasprocesosdialog-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} InstanciasprocesosInstanciasprocesosdialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <InstanciasprocesosInstanciasprocesosdialogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'])}
        loading={loading}
      />
    </main>
  );
};
