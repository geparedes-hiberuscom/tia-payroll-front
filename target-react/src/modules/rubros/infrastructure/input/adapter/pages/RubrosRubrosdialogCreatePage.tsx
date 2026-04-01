import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRubrosRubrosdialog } from '../hooks/useRubrosRubrosdialog';
import { RubrosRubrosdialogForm } from '../components/RubrosRubrosdialogForm';
import { CreateRubrosRubrosdialog, UpdateRubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosRubrosdialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubrosRubrosdialog();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateRubrosRubrosdialog | UpdateRubrosRubrosdialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateRubrosRubrosdialog);
    } else {
      await create(data as CreateRubrosRubrosdialog);
    }
    navigate('/rubros-rubrosdialog');
  };

  if (isEditMode && loading && !selectedItem) return <Loading message="Cargando datos..." />;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} rubro</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <RubrosRubrosdialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
