import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNominaresumengeneralResumengralnominadialog } from '../hooks/useNominaresumengeneralResumengralnominadialog';
import { NominaresumengeneralResumengralnominadialogForm } from '../components/NominaresumengeneralResumengralnominadialogForm';
import { CreateNominaresumengeneralResumengralnominadialog, UpdateNominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const NominaresumengeneralResumengralnominadialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useNominaresumengeneralResumengralnominadialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateNominaresumengeneralResumengralnominadialog | UpdateNominaresumengeneralResumengralnominadialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateNominaresumengeneralResumengralnominadialog);
    } else {
      await create(data as CreateNominaresumengeneralResumengralnominadialog);
    }
    navigate('/nominaresumengeneral-resumengralnominadialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} nominaresumenGeneral.zul / ResumenGralNominaDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <NominaresumengeneralResumengralnominadialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
