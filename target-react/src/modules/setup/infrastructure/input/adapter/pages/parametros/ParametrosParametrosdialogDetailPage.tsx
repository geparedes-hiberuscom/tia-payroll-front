import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParametrosParametrosdialog } from '../../hooks/useParametrosParametrosdialog';
import { ParametrosParametrosdialogDetail } from '../../components/parametros/ParametrosParametrosdialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: parametros.zul / parametrosDialog.zul
 * Muestra el detalle completo de un registro.
 * Permite editar, eliminar y volver a la lista principal.
 */
export const ParametrosParametrosdialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useParametrosParametrosdialog();

  useEffect(() => {
    if (id) {
      const [entorno, idParametro] = id.split(':');
      fetchById(entorno, idParametro);
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/parametros-parametrosdialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      const [entorno, idParametro] = id.split(':');
      await remove(entorno, idParametro);
      navigate('/parametros-parametrosdialog');
    }
  };

  const handleBack = () => {
    navigate('/parametros-parametrosdialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { const [e, p] = id.split(':'); fetchById(e, p); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <ParametrosParametrosdialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};


