import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNominaxcolabprelistNominaxcolabpredialog } from '../hooks/useNominaxcolabprelistNominaxcolabpredialog';
import { NominaxcolabprelistNominaxcolabpredialogForm } from '../components/NominaxcolabprelistNominaxcolabpredialogForm';
import { CreateNominaxcolabprelistNominaxcolabpredialog, UpdateNominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const NominaxcolabprelistNominaxcolabpredialogCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useNominaxcolabprelistNominaxcolabpredialog();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateNominaxcolabprelistNominaxcolabpredialog | UpdateNominaxcolabprelistNominaxcolabpredialog) => {
    if (isEditMode && id) {
      await update(id, data as UpdateNominaxcolabprelistNominaxcolabpredialog);
    } else {
      await create(data as CreateNominaxcolabprelistNominaxcolabpredialog);
    }
    navigate('/nominaxcolabprelist-nominaxcolabpredialog');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} nominaxColabPreList.zul / nominaxColabPreDialog.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <NominaxcolabprelistNominaxcolabpredialogForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
