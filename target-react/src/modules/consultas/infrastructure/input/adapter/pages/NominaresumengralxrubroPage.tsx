import React, { useState } from 'react';
import { useNominaresumengralxrubro } from '../hooks/useNominaresumengralxrubro';
import { NominaresumengralxrubroList } from '../components/NominaresumengralxrubroList';
import { NominaresumengralxrubroForm } from '../components/NominaresumengralxrubroForm';
import { Nominaresumengralxrubro } from '../../../../domain/model/Nominaresumengralxrubro';
import { CreateNominaresumengralxrubro } from '../../../../domain/model/Nominaresumengralxrubro';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: nominaresumenGralxRubro.zul
 * Pantallas ZUL fuente: nominaresumenGralxRubro.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useNominaresumengralxrubro que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const NominaresumengralxrubroPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useNominaresumengralxrubro();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Nominaresumengralxrubro | undefined>(undefined);

  const handleCreate = async (data: CreateNominaresumengralxrubro) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Nominaresumengralxrubro) => {
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
        <h1>nominaresumenGralxRubro.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <NominaresumengralxrubroForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando nominaresumenGralxRubro.zul..." />
      ) : (
        <NominaresumengralxrubroList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
