import React, { useState } from 'react';
import { useAcumulados } from '../hooks/useAcumulados';
import { AcumuladosList } from '../components/AcumuladosList';
import { AcumuladosForm } from '../components/AcumuladosForm';
import { Acumulados } from '../../../../domain/model/Acumulados';
import { CreateAcumulados } from '../../../../domain/model/Acumulados';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: acumulados.zul
 * Pantallas ZUL fuente: acumulados.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useAcumulados que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const AcumuladosPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useAcumulados();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Acumulados | undefined>(undefined);

  const handleCreate = async (data: CreateAcumulados) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Acumulados) => {
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
        <h1>acumulados.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <AcumuladosForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando acumulados.zul..." />
      ) : (
        <AcumuladosList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
