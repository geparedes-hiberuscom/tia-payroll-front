import React, { useState } from 'react';
import { useComparativonominas } from '../hooks/useComparativonominas';
import { ComparativonominasList } from '../components/ComparativonominasList';
import { ComparativonominasForm } from '../components/ComparativonominasForm';
import { Comparativonominas } from '../../../../domain/model/Comparativonominas';
import { CreateComparativonominas } from '../../../../domain/model/Comparativonominas';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: comparativoNominas.zul
 * Pantallas ZUL fuente: comparativoNominas.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useComparativonominas que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const ComparativonominasPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useComparativonominas();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Comparativonominas | undefined>(undefined);

  const handleCreate = async (data: CreateComparativonominas) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Comparativonominas) => {
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
        <h1>comparativoNominas.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <ComparativonominasForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando comparativoNominas.zul..." />
      ) : (
        <ComparativonominasList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
