import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlantillacontablePlantillacontabledialog } from '../../hooks/usePlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogForm } from '../../components/plantilla-contable/PlantillacontablePlantillacontabledialogForm';
import { CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest } from '../../dto/PlantillacontablePlantillacontabledialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: plantillaContable.zul / plantillaContableDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 * Maneja la validación, carga de datos y navegación.
 */
export const PlantillacontablePlantillacontabledialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = usePlantillacontablePlantillacontabledialog();
  const [formError, setFormError] = useState<string | null>(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreatePlantillacontablePlantillacontabledialogRequest | UpdatePlantillacontablePlantillacontabledialogRequest) => {
    try {
      setFormError(null);
      if (isEditMode && id) {
        await update(Number(id), data as UpdatePlantillacontablePlantillacontabledialogRequest);
      } else {
        await create(data as CreatePlantillacontablePlantillacontabledialogRequest);
      }
      navigate('/setup/plantillacontable-plantillacontabledialog');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar plantilla contable';
      setFormError(errorMessage);
    }
  };

  const handleCancel = () => {
    setFormError(null);
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} Plantilla Contable</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <PlantillacontablePlantillacontabledialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        error={formError}
      />
    </div>
  );
};


