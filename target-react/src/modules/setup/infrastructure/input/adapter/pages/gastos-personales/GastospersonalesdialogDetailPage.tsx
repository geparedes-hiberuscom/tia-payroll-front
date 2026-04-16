import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGastospersonalesdialog } from '../../hooks/useGastospersonalesdialog';
import { GastospersonalesdialogDetail } from '../../components/gastos-personales/GastospersonalesdialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: GastosPersonalesDialog.zul
 * Muestra el detalle completo de un registro.
 *
 * TODO: Copilot — Completar con la navegación y acciones específicas.
 */
export const GastospersonalesdialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useGastospersonalesdialog();

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/gastospersonalesdialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(Number(id));
      navigate('/gastospersonalesdialog');
    }
  };

  const handleBack = () => {
    navigate('/gastospersonalesdialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(Number(id)); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <GastospersonalesdialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};


