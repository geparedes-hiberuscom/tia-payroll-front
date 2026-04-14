import React, { useState, useEffect } from 'react';
import { UIButton } from '../../components/ui-kit';
import { useGastospersonalesdialog } from '../../hooks/useGastospersonalesdialog';
import { GastospersonalesdialogList } from '../../components/gastos-personales/GastospersonalesdialogList';
import { GastospersonalesdialogForm } from '../../components/gastos-personales/GastospersonalesdialogForm';
import { GastospersonalesdialogResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest } from '../../dto/GastospersonalesdialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: GastosPersonalesDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 */
export const GastospersonalesdialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, exportarExcel, clearError } = useGastospersonalesdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GastospersonalesdialogResponse | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleSubmit = async (data: CreateGastospersonalesdialogRequest | UpdateGastospersonalesdialogRequest) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdateGastospersonalesdialogRequest);
      } else {
        await create(data as CreateGastospersonalesdialogRequest);
      }
      setShowForm(false);
      setEditingItem(undefined);
      setFormError(null);
      await fetchAll();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  const handleEdit = (item: GastospersonalesdialogResponse) => {
    setEditingItem(item);
    setShowForm(true);
    setFormError(null);
    clearError();
  };

  const handleDelete = async (id: number) => {
    const confirmed = typeof globalThis !== 'undefined' && globalThis.confirm 
      ? globalThis.confirm('¿Estás seguro de eliminar este registro?') 
      : true;
      
    if (confirmed) {
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

  const handleExportExcel = async () => {
    try {
      setExporting(true);
      setFormError(null);
      const empresaId = 1;
      const anio = new Date().getFullYear();
      await exportarExcel(empresaId, anio);
    } catch {
      // El error ya fue manejado en el hook
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <h1>Gastos Personales Deducibles</h1>
        {!showForm && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <UIButton 
              variant="primary" 
              onClick={() => { setShowForm(true); setEditingItem(undefined); setFormError(null); clearError(); }}
            >
              + Nuevo
            </UIButton>
            <UIButton 
              variant="secondary" 
              onClick={handleExportExcel}
              disabled={loading || exporting || items.length === 0}
            >
              {exporting ? '⏳ Exportando...' : '↓ Excel'}
            </UIButton>
          </div>
        )}
      </div>
      {error && !showForm && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <GastospersonalesdialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} error={formError} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando gastos personales..." /> : <GastospersonalesdialogList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};



