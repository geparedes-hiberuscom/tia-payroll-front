import React, { useState } from 'react';
import { useCargarubrosido } from '../hooks/useCargarubrosido';
import { CargarubrosidoList } from '../components/CargarubrosidoList';
import { CargarubrosidoForm } from '../components/CargarubrosidoForm';
import { Cargarubrosido, CreateCargarubrosido, UpdateCargarubrosido } from '../../../../domain/model/Cargarubrosido';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const CargarubrosidoPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useCargarubrosido();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Cargarubrosido | undefined>(undefined);

  const handleSubmit = async (data: CreateCargarubrosido | UpdateCargarubrosido) => {
    if (editingItem) {
      await update(String(editingItem.id), data as UpdateCargarubrosido);
    } else {
      await create(data as CreateCargarubrosido);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: Cargarubrosido) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(String(id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Carga Rubros IDO</h1>
        {!showForm && <button onClick={() => setShowForm(true)}>+ Nuevo</button>}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <CargarubrosidoForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando cargas masivas..." />
      ) : (
        <CargarubrosidoList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};
