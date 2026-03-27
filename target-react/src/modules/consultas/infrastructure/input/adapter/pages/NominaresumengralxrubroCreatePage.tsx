import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNominaresumengralxrubro } from '../hooks/useNominaresumengralxrubro';
import { NominaresumengralxrubroForm } from '../components/NominaresumengralxrubroForm';
import { CreateNominaresumengralxrubro, UpdateNominaresumengralxrubro } from '../../../../domain/model/Nominaresumengralxrubro';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: nominaresumenGralxRubro.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const NominaresumengralxrubroCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useNominaresumengralxrubro();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateNominaresumengralxrubro | UpdateNominaresumengralxrubro) => {
    if (isEditMode && id) {
      await update(id, data as UpdateNominaresumengralxrubro);
    } else {
      await create(data as CreateNominaresumengralxrubro);
    }
    navigate('/nominaresumengralxrubro');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} nominaresumenGralxRubro.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <NominaresumengralxrubroForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
