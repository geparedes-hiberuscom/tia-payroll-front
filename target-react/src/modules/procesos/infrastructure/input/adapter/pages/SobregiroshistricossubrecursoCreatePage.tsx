import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useSobregiroshistricossubrecurso } from '../hooks/useSobregiroshistricossubrecurso';
import { SobregiroshistricossubrecursoViewMapper } from '../mapper/SobregiroshistricossubrecursoViewMapper';
import { SobregiroshistricossubrecursoForm } from '../components/SobregiroshistricossubrecursoForm';
import { CreateSobregiroshistricossubrecurso, UpdateSobregiroshistricossubrecurso } from '../../../../domain/model/Sobregiroshistricossubrecurso';

export const SobregiroshistricossubrecursoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useSobregiroshistricossubrecurso();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return SobregiroshistricossubrecursoViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateSobregiroshistricossubrecurso | UpdateSobregiroshistricossubrecurso) => {
    if (isEditMode && id) {
      await update(id, SobregiroshistricossubrecursoViewMapper.toUpdateRequest(data as UpdateSobregiroshistricossubrecurso));
    } else {
      await create(SobregiroshistricossubrecursoViewMapper.toCreateRequest(data as CreateSobregiroshistricossubrecurso));
    }
    navigate(ROUTES.PATHS['sobregiroshistricossubrecurso']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="sobregiroshistricossubrecurso-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Sobregiroshistricossubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <SobregiroshistricossubrecursoForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['sobregiroshistricossubrecurso'])}
        loading={loading}
      />
    </main>
  );
};
