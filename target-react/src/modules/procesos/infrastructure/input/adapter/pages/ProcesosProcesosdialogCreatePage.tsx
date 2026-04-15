import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosProcesosdialog } from '../hooks/useProcesosProcesosdialog';
import { ProcesosProcesosdialogForm } from '../components/ProcesosProcesosdialogForm';
import { CreateProcesosProcesosdialog, UpdateProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';
import { Button, PageShell, SectionCard } from '@shared/index';

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
    return selectedItem;
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateProcesosProcesosdialog);
    } else {
      await create(data as CreateProcesosProcesosdialog);
    }
    navigate(ROUTES.PATHS['procesos-procesosdialog']);
  };

  if (isEditMode && loading && !initialData) {
    return (
      <PageShell
        title="Procesos"
        description="Mantiene la configuracion de procesos operativos con una interfaz alineada al resto del sistema."
      >
        <Loading message="Cargando datos para edicion..." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={isEditMode ? 'Editar proceso' : 'Crear proceso'}
      description="Define los identificadores del proceso y los procedimientos relacionados para ejecucion, reversion y contabilizacion."
      actions={
        <Button
          type="button"
          variant="ghost"
          label="Volver"
          onClick={() => navigate(ROUTES.PATHS['procesos-procesosdialog'])}
        />
      }
    >
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}

      <SectionCard
        title="Formulario de proceso"
        description="Completa informacion principal y procedimientos para ejecutar la operacion de forma controlada."
      >
        <ProcesosProcesosdialogForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PATHS['procesos-procesosdialog'])}
          loading={loading}
        />
      </SectionCard>
    </PageShell>
  );
};
