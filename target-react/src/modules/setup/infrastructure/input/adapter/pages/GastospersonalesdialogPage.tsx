import React, { useState, useEffect } from 'react';
import { useGastospersonalesdialog } from '../hooks/useGastospersonalesdialog';
import { GastospersonalesdialogList } from '../components/GastospersonalesdialogList';
import { GastospersonalesdialogForm } from '../components/GastospersonalesdialogForm';
import { Gastospersonalesdialog, CreateGastospersonalesdialog, UpdateGastospersonalesdialog } from '../../../../domain/model/Gastospersonalesdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: GastosPersonalesDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 */
export const GastospersonalesdialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useGastospersonalesdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Gastospersonalesdialog | undefined>(undefined);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (data: CreateGastospersonalesdialog | UpdateGastospersonalesdialog) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateGastospersonalesdialog);
    } else {
      await create(data as CreateGastospersonalesdialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: Gastospersonalesdialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
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
        <h1>Gastos Personales Deducibles</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nuevo</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <GastospersonalesdialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando gastos personales..." /> : <GastospersonalesdialogList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};
