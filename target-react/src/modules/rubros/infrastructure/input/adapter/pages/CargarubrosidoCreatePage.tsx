import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCargarubrosido } from '../hooks/useCargarubrosido';
import { CargarubrosidoForm } from '../components/CargarubrosidoForm';
import { CreateCargarubrosido, UpdateCargarubrosido } from '../../../../domain/model/Cargarubrosido';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const CargarubrosidoCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useCargarubrosido();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateCargarubrosido | UpdateCargarubrosido) => {
    if (isEditMode && id) {
      await update(id, data as UpdateCargarubrosido);
    } else {
      await create(data as CreateCargarubrosido);
    }
    navigate('/cargarubrosido');
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} carga masiva</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <CargarubrosidoForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
