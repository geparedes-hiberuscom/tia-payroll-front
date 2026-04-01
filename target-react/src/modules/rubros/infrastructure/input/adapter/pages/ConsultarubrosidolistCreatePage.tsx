import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConsultarubrosidolist } from '../hooks/useConsultarubrosidolist';
import { ConsultarubrosidolistForm } from '../components/ConsultarubrosidolistForm';
import { CreateConsultarubrosidolist, UpdateConsultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ConsultarubrosidolistCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useConsultarubrosidolist();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateConsultarubrosidolist | UpdateConsultarubrosidolist) => {
    if (isEditMode && id) {
      await update(id, data as UpdateConsultarubrosidolist);
    } else {
      await create(data as CreateConsultarubrosidolist);
    }
    navigate('/consultarubrosidolist');
  };

  if (isEditMode && loading && !selectedItem) return <Loading message="Cargando datos..." />;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} consulta rubro IDO</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <ConsultarubrosidolistForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
