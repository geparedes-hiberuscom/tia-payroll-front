import React, { useState } from 'react';
import { useNominaresumengralcxrubro } from '../hooks/useNominaresumengralcxrubro';
import { NominaresumengralcxrubroList } from '../components/NominaresumengralcxrubroList';
import { NominaresumengralcxrubroForm } from '../components/NominaresumengralcxrubroForm';
import { Nominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';
import { CreateNominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: nominaresumenGralCxRubro.zul
 * Pantallas ZUL fuente: nominaresumenGralCxRubro.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useNominaresumengralcxrubro que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const NominaresumengralcxrubroPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useNominaresumengralcxrubro();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Nominaresumengralcxrubro | undefined>(undefined);

  const handleCreate = async (data: CreateNominaresumengralcxrubro) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Nominaresumengralcxrubro) => {
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
        <h1>nominaresumenGralCxRubro.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <NominaresumengralcxrubroForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando nominaresumenGralCxRubro.zul..." />
      ) : (
        <NominaresumengralcxrubroList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
