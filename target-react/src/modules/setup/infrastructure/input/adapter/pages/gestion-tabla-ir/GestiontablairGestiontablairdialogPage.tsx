import React, { useState, useEffect } from 'react';
import { UIButton } from '../../components/ui-kit';
import { useGestiontablairGestiontablairdialog } from '../../hooks/useGestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogList } from '../../components/gestion-tabla-ir/GestiontablairGestiontablairdialogList';
import { GestiontablairGestiontablairdialogForm } from '../../components/gestion-tabla-ir/GestiontablairGestiontablairdialogForm';
import { GestiontablairGestiontablairdialog, CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Pantallas ZUL fuente: gestionTablaIR.zul, gestionTablaIRDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 */
export const GestiontablairGestiontablairdialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useGestiontablairGestiontablairdialog();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GestiontablairGestiontablairdialog | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (data: CreateGestiontablairGestiontablairdialog | UpdateGestiontablairGestiontablairdialog) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdateGestiontablairGestiontablairdialog);
      } else {
        await create(data as CreateGestiontablairGestiontablairdialog);
      }
      setShowForm(false);
      setEditingItem(undefined);
      setFormError(null);
      await fetchAll();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  const handleEdit = (item: GestiontablairGestiontablairdialog) => {
    setEditingItem(item);
    setShowForm(true);
    setFormError(null);
    clearError();
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
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
        <h1>Tabla de Renta (IR)</h1>
        {!showForm && (
          <UIButton variant="primary" onClick={() => { setShowForm(true); setEditingItem(undefined); setFormError(null); clearError(); }}>
            + Nuevo Rango
          </UIButton>
        )}
      </div>

      {error && !showForm && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <GestiontablairGestiontablairdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          error={formError}
        />
      )}

      {!showForm && (
        loading && items.length === 0 ? (
          <Loading message="Cargando tabla IR..." />
        ) : (
          <GestiontablairGestiontablairdialogList
            items={items}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};



