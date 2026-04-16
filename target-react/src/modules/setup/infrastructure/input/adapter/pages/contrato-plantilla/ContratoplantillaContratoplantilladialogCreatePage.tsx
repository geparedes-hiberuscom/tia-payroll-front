import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContratoplantillaContratoplantilladialog } from '../../hooks/useContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogForm } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogForm';
import { CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest } from '../../dto/ContratoplantillaContratoplantilladialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 */
export const ContratoplantillaContratoplantilladialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useContratoplantillaContratoplantilladialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateContratoplantillaContratoplantilladialogRequest | UpdateContratoplantillaContratoplantilladialogRequest) => {
    try {
      if (isEditMode && id) {
        await update(id, data as UpdateContratoplantillaContratoplantilladialogRequest);
      } else {
        await create(data as CreateContratoplantillaContratoplantilladialogRequest);
      }
      navigate('/contratoplantilla-contratoplantilladialog');
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} Plantilla de Contrato</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <ContratoplantillaContratoplantilladialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};


