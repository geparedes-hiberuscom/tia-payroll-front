import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlantillacontablePlantillacontabledialog } from '../../hooks/usePlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogDetail } from '../../components/plantilla-contable/PlantillacontablePlantillacontabledialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: plantillaContable.zul / plantillaContableDialog.zul
 * Muestra el detalle completo de un registro con opciones de editar y eliminar.
 */
export const PlantillacontablePlantillacontabledialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = usePlantillacontablePlantillacontabledialog();

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/setup/plantillacontable-plantillacontabledialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await remove(Number(id));
        navigate('/setup/plantillacontable-plantillacontabledialog');
      } catch (err) {
        console.error('Error al eliminar:', err);
      }
    }
  };

  const handleBack = () => {
    navigate('/setup/plantillacontable-plantillacontabledialog');
  };

  if (loading && !selectedItem) {
    return <Loading message="Cargando detalle..." />;
  }

  if (error) {
    return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(Number(id)); } }} />;
  }

  if (!selectedItem) {
    return (
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#666' }}>No se encontró el registro solicitado.</p>
        <button onClick={handleBack} style={{ marginTop: '1rem' }}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <PlantillacontablePlantillacontabledialogDetail
        item={selectedItem}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={handleBack}
      />
    </div>
  );
};


