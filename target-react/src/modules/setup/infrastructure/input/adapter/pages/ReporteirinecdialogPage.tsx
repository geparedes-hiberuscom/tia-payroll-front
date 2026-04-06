import React, { useState, useEffect } from 'react';
import { useReporteirinecdialog } from '../hooks/useReporteirinecdialog';
import { ReporteirinecdialogList } from '../components/ReporteirinecdialogList';
import { ReporteirinecdialogForm } from '../components/ReporteirinecdialogForm';
import { GenerarReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogResponse } from '../dto/ReporteirinecdialogDto';
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
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const ReporteirinecdialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, generar, update, remove, clearError } = useReporteirinecdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ReporteirinecdialogResponse | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (data: GenerarReporteirinecdialogRequest | UpdateReporteirinecdialogRequest) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateReporteirinecdialogRequest);
    } else {
      await generar(data as GenerarReporteirinecdialogRequest);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Reportes IR / INEC</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nuevo</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <ReporteirinecdialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingItem(undefined); }} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <ReporteirinecdialogList items={items} loading={loading} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={(id) => { if (window.confirm('¿Eliminar?')) remove(id); }} />)}
    </div>
  );
};
