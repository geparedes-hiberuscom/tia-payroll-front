import React, { useState, useEffect } from 'react';
import { useGeningproyectados } from '../hooks/useGeningproyectados';
import { GeningproyectadosList } from '../components/GeningproyectadosList';
import { GeningproyectadosForm } from '../components/GeningproyectadosForm';
import { Geningproyectados, CreateGeningproyectados, UpdateGeningproyectados } from '../../../../domain/model/Geningproyectados';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: genIngProyectados.zul
 * Vertical Slice: 🔧 Setup y Configuración
 */
export const GeningproyectadosPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useGeningproyectados();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Geningproyectados | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (data: CreateGeningproyectados | UpdateGeningproyectados) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateGeningproyectados);
    } else {
      await create(data as CreateGeningproyectados);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ingresos Proyectados</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nuevo</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <GeningproyectadosForm initialData={editingItem} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingItem(undefined); }} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <GeningproyectadosList items={items} loading={loading} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={(id) => { if (window.confirm('¿Eliminar?')) remove(id.toString()); }} />)}
    </div>
  );
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useGeningproyectados();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Geningproyectados | undefined>(undefined);

  const handleCreate = async (data: CreateGeningproyectados) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Geningproyectados) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>genIngProyectados.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <GeningproyectadosForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando genIngProyectados.zul..." />
      ) : (
        <GeningproyectadosList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
