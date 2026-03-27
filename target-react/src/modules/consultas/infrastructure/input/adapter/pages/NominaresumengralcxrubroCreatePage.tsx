import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNominaresumengralcxrubro } from '../hooks/useNominaresumengralcxrubro';
import { NominaresumengralcxrubroForm } from '../components/NominaresumengralcxrubroForm';
import { CreateNominaresumengralcxrubro, UpdateNominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: nominaresumenGralCxRubro.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const NominaresumengralcxrubroCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useNominaresumengralcxrubro();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateNominaresumengralcxrubro | UpdateNominaresumengralcxrubro) => {
    if (isEditMode && id) {
      await update(id, data as UpdateNominaresumengralcxrubro);
    } else {
      await create(data as CreateNominaresumengralcxrubro);
    }
    navigate('/nominaresumengralcxrubro');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} nominaresumenGralCxRubro.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <NominaresumengralcxrubroForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
