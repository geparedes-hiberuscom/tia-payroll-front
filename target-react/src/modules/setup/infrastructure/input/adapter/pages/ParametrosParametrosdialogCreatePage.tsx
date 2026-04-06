import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParametrosParametrosdialog } from '../hooks/useParametrosParametrosdialog';
import { ParametrosParametrosdialogForm } from '../components/ParametrosParametrosdialogForm';
import { CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest } from '../dto/ParametrosParametrosdialogDto';
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
      const [entorno, idParametro] = id.split(':');
      fetchById(entorno, idParametro);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateParametrosParametrosdialogRequest | UpdateParametrosParametrosdialogRequest) => {
    if (isEditMode && id) {
      const [entorno, idParametro] = id.split(':');
      await update(entorno, idParametro, data as UpdateParametrosParametrosdialogRequest);
    } else {
      await create(data as CreateParametrosParametrosdialogRequest);
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
