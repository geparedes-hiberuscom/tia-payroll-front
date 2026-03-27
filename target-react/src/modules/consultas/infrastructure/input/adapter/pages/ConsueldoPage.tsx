import React, { useState } from 'react';
import { useConsueldo } from '../hooks/useConsueldo';
import { ConsueldoList } from '../components/ConsueldoList';
import { ConsueldoForm } from '../components/ConsueldoForm';
import { Consueldo } from '../../../../domain/model/Consueldo';
import { CreateConsueldo } from '../../../../domain/model/Consueldo';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: conSueldo.zul
 * Pantallas ZUL fuente: conSueldo.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useConsueldo que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const ConsueldoPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useConsueldo();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Consueldo | undefined>(undefined);

  const handleCreate = async (data: CreateConsueldo) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Consueldo) => {
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
        <h1>conSueldo.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <ConsueldoForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando conSueldo.zul..." />
      ) : (
        <ConsueldoList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
