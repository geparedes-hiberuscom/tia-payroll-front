import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDtoscompartidossubrecursos } from '../hooks/useDtoscompartidossubrecursos';
import { DtoscompartidossubrecursosForm } from '../components/DtoscompartidossubrecursosForm';
import { CreateDtoscompartidossubrecursos, UpdateDtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: DTOs compartidos (subrecursos)
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const DtoscompartidossubrecursosCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useDtoscompartidossubrecursos();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateDtoscompartidossubrecursos | UpdateDtoscompartidossubrecursos) => {
    if (isEditMode && id) {
      await update(id, data as UpdateDtoscompartidossubrecursos);
    } else {
      await create(data as CreateDtoscompartidossubrecursos);
    }
    navigate('/dtoscompartidossubrecursos');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} DTOs compartidos (subrecursos)</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <DtoscompartidossubrecursosForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
