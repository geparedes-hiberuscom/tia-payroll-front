import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGestiontablairGestiontablairdialog } from '../hooks/useGestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogDetail } from '../components/GestiontablairGestiontablairdialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Muestra el detalle completo de un registro.
 *
 * TODO: Copilot — Completar con la navegación y acciones específicas.
 */
export const GestiontablairGestiontablairdialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useGestiontablairGestiontablairdialog();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/gestiontablair-gestiontablairdialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
      navigate('/gestiontablair-gestiontablairdialog');
    }
  };

  const handleBack = () => {
    navigate('/gestiontablair-gestiontablairdialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <GestiontablairGestiontablairdialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};
