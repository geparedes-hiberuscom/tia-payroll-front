import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRubroplantillacontabledialog } from '../hooks/useRubroplantillacontabledialog';
import { RubroplantillacontabledialogDetail } from '../components/RubroplantillacontabledialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: rubroplantillaContableDialog.zul
 * Muestra el detalle completo de un registro.
 *
 * TODO: Copilot — Completar con la navegación y acciones específicas.
 */
export const RubroplantillacontabledialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useRubroplantillacontabledialog();

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/rubroplantillacontabledialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
      navigate('/rubroplantillacontabledialog');
    }
  };

  const handleBack = () => {
    navigate('/rubroplantillacontabledialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(id); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <RubroplantillacontabledialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};
