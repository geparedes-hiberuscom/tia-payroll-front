import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosxprocesodialog } from '../hooks/useRubrosxprocesodialog';
import { RubrosxprocesodialogForm } from '../components/RubrosxprocesodialogForm';
import { CreateRubrosxprocesodialog, UpdateRubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosxprocesodialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubrosxprocesodialog();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateRubrosxprocesodialog | UpdateRubrosxprocesodialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateRubrosxprocesodialog);
    } else {
      await create(data as CreateRubrosxprocesodialog);
    }
    navigate(ROUTES.PATHS['rubrosxprocesodialog']);
  };

  if (isEditMode && loading && !selectedItem) return <Loading message="Cargando datos..." />;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} asignación</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <RubrosxprocesodialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
