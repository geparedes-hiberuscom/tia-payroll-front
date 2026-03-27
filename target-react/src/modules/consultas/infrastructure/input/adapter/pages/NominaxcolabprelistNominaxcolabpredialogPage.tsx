import React, { useState } from 'react';
import { useNominaxcolabprelistNominaxcolabpredialog } from '../hooks/useNominaxcolabprelistNominaxcolabpredialog';
import { NominaxcolabprelistNominaxcolabpredialogList } from '../components/NominaxcolabprelistNominaxcolabpredialogList';
import { NominaxcolabprelistNominaxcolabpredialogForm } from '../components/NominaxcolabprelistNominaxcolabpredialogForm';
import { NominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { CreateNominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Pantallas ZUL fuente: nominaxColabPreList.zul, nominaxColabPreDialog.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useNominaxcolabprelistNominaxcolabpredialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const NominaxcolabprelistNominaxcolabpredialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useNominaxcolabprelistNominaxcolabpredialog();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NominaxcolabprelistNominaxcolabpredialog | undefined>(undefined);

  const handleCreate = async (data: CreateNominaxcolabprelistNominaxcolabpredialog) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: NominaxcolabprelistNominaxcolabpredialog) => {
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
        <h1>nominaxColabPreList.zul / nominaxColabPreDialog.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <NominaxcolabprelistNominaxcolabpredialogForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando nominaxColabPreList.zul / nominaxColabPreDialog.zul..." />
      ) : (
        <NominaxcolabprelistNominaxcolabpredialogList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
