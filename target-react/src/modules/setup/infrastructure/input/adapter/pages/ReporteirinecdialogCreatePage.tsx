import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReporteirinecdialog } from '../hooks/useReporteirinecdialog';
import { ReporteirinecdialogForm } from '../components/ReporteirinecdialogForm';
import { CreateReporteirinecdialog, UpdateReporteirinecdialog } from '../../../../domain/model/Reporteirinecdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: ReporteIRINECDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const ReporteirinecdialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useReporteirinecdialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateReporteirinecdialog | UpdateReporteirinecdialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateReporteirinecdialog);
    } else {
      await create(data as CreateReporteirinecdialog);
    }
    navigate('/reporteirinecdialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} ReporteIRINECDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <ReporteirinecdialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
