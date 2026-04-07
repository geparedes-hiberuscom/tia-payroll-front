import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGestiontablairGestiontablairdialog } from '../../hooks/useGestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogForm } from '../../components/gestion-tabla-ir/GestiontablairGestiontablairdialogForm';
import { CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const GestiontablairGestiontablairdialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useGestiontablairGestiontablairdialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateGestiontablairGestiontablairdialog | UpdateGestiontablairGestiontablairdialog) => {
    if (isEditMode && id) {
      await update(Number(id), data as UpdateGestiontablairGestiontablairdialog);
    } else {
      await create(data as CreateGestiontablairGestiontablairdialog);
    }
    navigate('/gestiontablair-gestiontablairdialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} gestionTablaIR.zul / gestionTablaIRDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <GestiontablairGestiontablairdialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};


