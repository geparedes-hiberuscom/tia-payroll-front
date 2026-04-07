import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRubroplantillacontabledialog } from '../../hooks/useRubroplantillacontabledialog';
import { RubroplantillacontabledialogForm } from '../../components/rubro-plantilla-contable/RubroplantillacontabledialogForm';
import { CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest } from '../../dto/RubroplantillacontabledialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: rubroplantillaContableDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const RubroplantillacontabledialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubroplantillacontabledialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateRubroplantillacontabledialogRequest | UpdateRubroplantillacontabledialogRequest) => {
    if (isEditMode && id) {
      await update(Number(id), data as UpdateRubroplantillacontabledialogRequest);
    } else {
      await create(data as CreateRubroplantillacontabledialogRequest);
    }
    navigate('/rubroplantillacontabledialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} rubroplantillaContableDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <RubroplantillacontabledialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};


