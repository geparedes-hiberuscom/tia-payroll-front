import React, { useState, useEffect } from 'react';
import { useGestiontablairGestiontablairdialog } from '../hooks/useGestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogList } from '../components/GestiontablairGestiontablairdialogList';
import { GestiontablairGestiontablairdialogForm } from '../components/GestiontablairGestiontablairdialogForm';
import { GestiontablairGestiontablairdialog, CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog } from '../../../../domain/model/GestiontablairGestiontablairdialog';
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

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (data: CreateGestiontablairGestiontablairdialog | UpdateGestiontablairGestiontablairdialog) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateGestiontablairGestiontablairdialog);
    } else {
      await create(data as CreateGestiontablairGestiontablairdialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: GestiontablairGestiontablairdialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id.toString());
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Tabla de Renta (IR)</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>
            + Nuevo Rango
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <GestiontablairGestiontablairdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
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
