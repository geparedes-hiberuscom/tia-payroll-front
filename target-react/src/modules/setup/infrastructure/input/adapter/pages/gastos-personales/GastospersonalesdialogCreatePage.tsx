import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGastospersonalesdialog } from '../../hooks/useGastospersonalesdialog';
import { GastospersonalesdialogForm } from '../../components/gastos-personales/GastospersonalesdialogForm';
import { CreateGastospersonalesdialog, UpdateGastospersonalesdialog } from '../../../../../domain/model/Gastospersonalesdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: GastosPersonalesDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const GastospersonalesdialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useGastospersonalesdialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateGastospersonalesdialog | UpdateGastospersonalesdialog) => {
    if (isEditMode && id) {
      await update(Number(id), data as UpdateGastospersonalesdialog);
    } else {
      await create(data as CreateGastospersonalesdialog);
    }
    navigate('/gastospersonalesdialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} GastosPersonalesDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <GastospersonalesdialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};


