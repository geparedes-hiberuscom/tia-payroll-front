import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useLogderegistrosdeprocesosubrecurso } from '../hooks/useLogderegistrosdeprocesosubrecurso';
import { LogderegistrosdeprocesosubrecursoViewMapper } from '../mapper/LogderegistrosdeprocesosubrecursoViewMapper';
import { LogderegistrosdeprocesosubrecursoForm } from '../components/LogderegistrosdeprocesosubrecursoForm';
import { CreateLogderegistrosdeprocesosubrecurso, UpdateLogderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';

export const LogderegistrosdeprocesosubrecursoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useLogderegistrosdeprocesosubrecurso();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return LogderegistrosdeprocesosubrecursoViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateLogderegistrosdeprocesosubrecurso | UpdateLogderegistrosdeprocesosubrecurso) => {
    if (isEditMode && id) {
      await update(id, LogderegistrosdeprocesosubrecursoViewMapper.toUpdateRequest(data as UpdateLogderegistrosdeprocesosubrecurso));
    } else {
      await create(LogderegistrosdeprocesosubrecursoViewMapper.toCreateRequest(data as CreateLogderegistrosdeprocesosubrecurso));
    }
    navigate(ROUTES.PATHS['logderegistrosdeprocesosubrecurso']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="logderegistrosdeprocesosubrecurso-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Logderegistrosdeprocesosubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <LogderegistrosdeprocesosubrecursoForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['logderegistrosdeprocesosubrecurso'])}
        loading={loading}
      />
    </main>
  );
};
