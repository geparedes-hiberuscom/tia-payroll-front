import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useConsueldo } from '../hooks/useConsueldo';
import { ConsueldoForm } from '../components/ConsueldoForm';
import { CreateConsueldo, UpdateConsueldo } from '../../../../domain/model/Consueldo';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: conSueldo.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const ConsueldoCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useConsueldo();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateConsueldo | UpdateConsueldo) => {
    if (isEditMode && id) {
      await update(id, data as UpdateConsueldo);
    } else {
      await create(data as CreateConsueldo);
    }
    navigate('/consueldo');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} conSueldo.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <ConsueldoForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
