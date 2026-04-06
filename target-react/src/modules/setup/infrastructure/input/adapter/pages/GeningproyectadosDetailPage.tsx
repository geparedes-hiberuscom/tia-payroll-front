import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGeningproyectados } from '../hooks/useGeningproyectados';
import { GeningproyectadosDetail } from '../components/GeningproyectadosDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: genIngProyectados.zul
 * Muestra el detalle completo de un registro.
 *
 * TODO: Copilot — Completar con la navegación y acciones específicas.
 */
export const GeningproyectadosDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useGeningproyectados();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/geningproyectados/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
      navigate('/geningproyectados');
    }
  };

  const handleBack = () => {
    navigate('/geningproyectados');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <GeningproyectadosDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};
