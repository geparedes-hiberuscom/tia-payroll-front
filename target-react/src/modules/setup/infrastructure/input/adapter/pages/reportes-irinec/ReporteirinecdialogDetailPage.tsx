import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReporteirinecdialog } from '../../hooks/useReporteirinecdialog';
import { ReporteirinecdialogDetail } from '../../components/reportes-irinec/ReporteirinecdialogDetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de detalle: ReporteIRINECDialog.zul
 * Muestra el detalle completo de un registro.
 *
 * TODO: Copilot — Completar con la navegación y acciones específicas.
 */
export const ReporteirinecdialogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, remove, clearError } = useReporteirinecdialog();

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  const handleEdit = () => {
    navigate(`/reporteirinecdialog/${id}/edit`);
  };

  const handleDelete = async () => {
    if (id && globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(Number(id));
      navigate('/reporteirinecdialog');
    }
  };

  const handleBack = () => {
    navigate('/reporteirinecdialog');
  };

  if (loading) { return <Loading message="Cargando detalle..." />; }
  if (error) { return <ErrorBanner message={error} onRetry={() => { clearError(); if (id) { fetchById(Number(id)); } }} />; }
  if (!selectedItem) { return <p>No encontrado.</p>; }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <ReporteirinecdialogDetail
        item={selectedItem}
        onEdit={() => handleEdit()}
        onDelete={() => handleDelete()}
        onBack={handleBack}
      />
    </div>
  );
};


