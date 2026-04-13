import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContratoplantillaContratoplantilladialog } from '../../hooks/useContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogDetail } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Muestra el detalle completo de un registro.
 */
export const ContratoplantillaContratoplantilladialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useContratoplantillaContratoplantilladialog();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/contratoplantilla-contratoplantilladialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
      navigate('/contratoplantilla-contratoplantilladialog');
    }
  };

  const handleBack = () => {
    navigate('/contratoplantilla-contratoplantilladialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <ContratoplantillaContratoplantilladialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};


