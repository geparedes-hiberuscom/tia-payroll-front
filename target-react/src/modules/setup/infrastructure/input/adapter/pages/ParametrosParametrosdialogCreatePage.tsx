import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParametrosParametrosdialog } from '../hooks/useParametrosParametrosdialog';
import { ParametrosParametrosdialogForm } from '../components/ParametrosParametrosdialogForm';
import { CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: parametros.zul / parametrosDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const ParametrosParametrosdialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useParametrosParametrosdialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateParametrosParametrosdialog | UpdateParametrosParametrosdialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateParametrosParametrosdialog);
    } else {
      await create(data as CreateParametrosParametrosdialog);
    }
    navigate('/parametros-parametrosdialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} parametros.zul / parametrosDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <ParametrosParametrosdialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
