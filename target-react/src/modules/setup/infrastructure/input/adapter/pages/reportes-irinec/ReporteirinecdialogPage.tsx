import React, { useState, useEffect } from 'react';
import { UIButton } from '../../components/ui-kit';
import { useReporteirinecdialog } from '../../hooks/useReporteirinecdialog';
import { ReporteirinecdialogList } from '../../components/reportes-irinec/ReporteirinecdialogList';
import { ReporteirinecdialogForm } from '../../components/reportes-irinec/ReporteirinecdialogForm';
import { GenerarReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogResponse } from '../../dto/ReporteirinecdialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: ReporteIRINECDialog.zul
 * Pantallas ZUL fuente: ReporteIRINECDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useReporteirinecdialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 */
export const ReporteirinecdialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, generar, update, remove, clearError } = useReporteirinecdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ReporteirinecdialogResponse | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSubmit = async (data: GenerarReporteirinecdialogRequest | UpdateReporteirinecdialogRequest) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdateReporteirinecdialogRequest);
      } else {
        await generar(data as GenerarReporteirinecdialogRequest);
      }
      setShowForm(false);
      setEditingItem(undefined);
      setFormError(null);
      await fetchAll();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  const handleEdit = (item: ReporteirinecdialogResponse) => {
    setEditingItem(item);
    setShowForm(true);
    setFormError(null);
    clearError();
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm('¿Eliminar?')) {
      try {
        await remove(id);
        await fetchAll();
      } catch (err) {
        setFormError(err instanceof Error ? err.message : 'Error al eliminar');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
    setFormError(null);
    clearError();
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Reportes IR / INEC</h1>
        {!showForm && <UIButton variant="primary" onClick={() => { setShowForm(true); setEditingItem(undefined); setFormError(null); clearError(); }}>+ Nuevo</UIButton>}
      </div>
      {error && !showForm && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <ReporteirinecdialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} error={formError} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <ReporteirinecdialogList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};



