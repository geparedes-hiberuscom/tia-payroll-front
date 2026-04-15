import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosRubrosdialog } from '../hooks/useRubrosRubrosdialog';
import { RubrosRubrosdialogForm } from '../components/RubrosRubrosdialogForm';
import { CreateRubrosRubrosdialog, UpdateRubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { Button, PageShell, SectionCard } from '@shared/index';

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
    navigate(ROUTES.PATHS['rubros-rubrosdialog']);
  };

  if (isEditMode && loading && !selectedItem) {
    return (
      <PageShell
        title="Rubros"
        description="Gestiona la creacion y actualizacion de rubros con una interfaz consistente con el resto del modulo."
      >
        <Loading message="Cargando datos..." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={isEditMode ? 'Editar rubro' : 'Crear rubro'}
      description="Completa los datos de negocio y parametros operativos del rubro dentro de un flujo guiado por tabs."
      actions={
        <Button
          type="button"
          variant="ghost"
          label="Volver"
          onClick={() => navigate(-1)}
        />
      }
    >
      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <SectionCard
        title="Formulario de rubro"
        description="Registra informacion principal, observaciones y parametros avanzados cuando el ambito lo requiere."
      >
        <RubrosRubrosdialogForm
          initialData={isEditMode ? selectedItem ?? undefined : undefined}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          loading={loading}
        />
      </SectionCard>
    </PageShell>
  );
};
