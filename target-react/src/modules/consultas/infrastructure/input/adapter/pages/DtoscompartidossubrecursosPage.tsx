import React, { useState } from 'react';
import { useDtoscompartidossubrecursos } from '../hooks/useDtoscompartidossubrecursos';
import { DtoscompartidossubrecursosList } from '../components/DtoscompartidossubrecursosList';
import { DtoscompartidossubrecursosForm } from '../components/DtoscompartidossubrecursosForm';
import { Dtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';
import { CreateDtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: DTOs compartidos (subrecursos)
 * Pantallas ZUL fuente: DTOs compartidos (subrecursos)
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useDtoscompartidossubrecursos que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const DtoscompartidossubrecursosPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useDtoscompartidossubrecursos();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Dtoscompartidossubrecursos | undefined>(undefined);

  const handleCreate = async (data: CreateDtoscompartidossubrecursos) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: Dtoscompartidossubrecursos) => {
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
        <h1>DTOs compartidos (subrecursos)</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <DtoscompartidossubrecursosForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando DTOs compartidos (subrecursos)..." />
      ) : (
        <DtoscompartidossubrecursosList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
