import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useRubrospreliquidadossubrecurso } from '../hooks/useRubrospreliquidadossubrecurso';
import { RubrospreliquidadossubrecursoViewMapper } from '../mapper/RubrospreliquidadossubrecursoViewMapper';
import { RubrospreliquidadossubrecursoForm } from '../components/RubrospreliquidadossubrecursoForm';
import { CreateRubrospreliquidadossubrecurso, UpdateRubrospreliquidadossubrecurso } from '../../../../domain/model/Rubrospreliquidadossubrecurso';

export const RubrospreliquidadossubrecursoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubrospreliquidadossubrecurso();

  useEffect(() => {
    if (isEditMode && id) {
      fetchById(id);
    }
  }, [isEditMode, id, fetchById]);

  const initialData = useMemo(() => {
    if (!selectedItem || !isEditMode) {
      return undefined;
    }
    return RubrospreliquidadossubrecursoViewMapper.toDomain(selectedItem);
  }, [selectedItem, isEditMode]);

  const handleSubmit = async (data: CreateRubrospreliquidadossubrecurso | UpdateRubrospreliquidadossubrecurso) => {
    if (isEditMode && id) {
      await update(id, RubrospreliquidadossubrecursoViewMapper.toUpdateRequest(data as UpdateRubrospreliquidadossubrecurso));
    } else {
      await create(RubrospreliquidadossubrecursoViewMapper.toCreateRequest(data as CreateRubrospreliquidadossubrecurso));
    }
    navigate(ROUTES.PATHS['rubrospreliquidadossubrecurso']);
  };

  if (isEditMode && loading && !initialData) {
    return <Loading message="Cargando datos para edicion..." />;
  }

  return (
    <main className="container" data-testid="rubrospreliquidadossubrecurso-create-page">
      <h1>{isEditMode ? 'Editar' : 'Crear'} Rubrospreliquidadossubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); if (isEditMode && id) { fetchById(id); } }} />}
      <RubrospreliquidadossubrecursoForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.PATHS['rubrospreliquidadossubrecurso'])}
        loading={loading}
      />
    </main>
  );
};
