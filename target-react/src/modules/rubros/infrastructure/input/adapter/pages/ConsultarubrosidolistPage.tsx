import React, { useState } from 'react';
import { useConsultarubrosidolist } from '../hooks/useConsultarubrosidolist';
import { ConsultarubrosidolistList } from '../components/ConsultarubrosidolistList';
import { ConsultarubrosidolistForm } from '../components/ConsultarubrosidolistForm';
import { Consultarubrosidolist, CreateConsultarubrosidolist, UpdateConsultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ConsultarubrosidolistPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useConsultarubrosidolist();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Consultarubrosidolist | undefined>(undefined);

  const handleSubmit = async (data: CreateConsultarubrosidolist | UpdateConsultarubrosidolist) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateConsultarubrosidolist);
    } else {
      await create(data as CreateConsultarubrosidolist);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Consulta Rubros IDO</h1>
        {!showForm && <button onClick={() => setShowForm(true)}>+ Nuevo</button>}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <ConsultarubrosidolistForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingItem(undefined); }}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando consultas..." />
      ) : (
        <ConsultarubrosidolistList
          items={items}
          loading={loading}
          onEdit={(item) => { setEditingItem(item); setShowForm(true); }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
