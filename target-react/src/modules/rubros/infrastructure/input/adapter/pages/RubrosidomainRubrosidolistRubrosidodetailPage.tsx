import React, { useState } from 'react';
import { useRubrosidomainRubrosidolistRubrosidodetail } from '../hooks/useRubrosidomainRubrosidolistRubrosidodetail';
import { RubrosidomainRubrosidolistRubrosidodetailList } from '../components/RubrosidomainRubrosidolistRubrosidodetailList';
import { RubrosidomainRubrosidolistRubrosidodetailForm } from '../components/RubrosidomainRubrosidolistRubrosidodetailForm';
import { CreateRubrosidomainRubrosidolistRubrosidodetail, RubrosidomainRubrosidolistRubrosidodetail, UpdateRubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosidomainRubrosidolistRubrosidodetailPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useRubrosidomainRubrosidolistRubrosidodetail();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RubrosidomainRubrosidolistRubrosidodetail | undefined>(undefined);

  const handleSubmit = async (data: CreateRubrosidomainRubrosidolistRubrosidodetail | UpdateRubrosidomainRubrosidolistRubrosidodetail) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateRubrosidomainRubrosidolistRubrosidodetail);
    } else {
      await create(data as CreateRubrosidomainRubrosidolistRubrosidodetail);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Rubros IDO</h1>
        {!showForm && <button onClick={() => setShowForm(true)}>+ Nuevo</button>}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <RubrosidomainRubrosidolistRubrosidodetailForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingItem(undefined); }}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando rubros IDO..." />
      ) : (
        <RubrosidomainRubrosidolistRubrosidodetailList
          items={items}
          loading={loading}
          onEdit={(item) => { setEditingItem(item); setShowForm(true); }}
          onDelete={async (itemId) => { if (window.confirm('¿Eliminar este registro?')) await remove(itemId); }}
        />
      )}
    </div>
  );
};
