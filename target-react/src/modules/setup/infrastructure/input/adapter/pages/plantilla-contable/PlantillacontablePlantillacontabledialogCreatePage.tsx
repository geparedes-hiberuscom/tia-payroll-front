import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlantillacontablePlantillacontabledialog } from '../../hooks/usePlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogForm } from '../../components/plantilla-contable/PlantillacontablePlantillacontabledialogForm';
import { CreatePlantillacontablePlantillacontabledialog, UpdatePlantillacontablePlantillacontabledialog } from '../../../../../domain/model/PlantillacontablePlantillacontabledialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: plantillaContable.zul / plantillaContableDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const PlantillacontablePlantillacontabledialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = usePlantillacontablePlantillacontabledialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreatePlantillacontablePlantillacontabledialog | UpdatePlantillacontablePlantillacontabledialog) => {
    if (isEditMode && id) {
      await update(Number(id), data as UpdatePlantillacontablePlantillacontabledialog);
    } else {
      await create(data as CreatePlantillacontablePlantillacontabledialog);
    }
    navigate('/plantillacontable-plantillacontabledialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} plantillaContable.zul / plantillaContableDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <PlantillacontablePlantillacontabledialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};


