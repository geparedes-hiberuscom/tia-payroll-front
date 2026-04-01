import React, { useState } from 'react';
import { useRubrosidocargaxproceso } from '../hooks/useRubrosidocargaxproceso';
import { RubrosidocargaxprocesoList } from '../components/RubrosidocargaxprocesoList';
import { RubrosidocargaxprocesoForm } from '../components/RubrosidocargaxprocesoForm';
import { CreateRubrosidocargaxproceso, Rubrosidocargaxproceso, UpdateRubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosidocargaxprocesoPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useRubrosidocargaxproceso();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Rubrosidocargaxproceso | undefined>(undefined);

  const handleSubmit = async (data: CreateRubrosidocargaxproceso | UpdateRubrosidocargaxproceso) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateRubrosidocargaxproceso);
    } else {
      await create(data as CreateRubrosidocargaxproceso);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Rubros IDO por Proceso</h1>
        {!showForm && <button onClick={() => setShowForm(true)}>+ Nuevo</button>}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <RubrosidocargaxprocesoForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingItem(undefined); }}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando ejecuciones..." />
      ) : (
        <RubrosidocargaxprocesoList
          items={items}
          loading={loading}
          onEdit={(item) => { setEditingItem(item); setShowForm(true); }}
          onDelete={async (id) => { if (window.confirm('¿Eliminar este registro?')) await remove(id); }}
        />
      )}
    </div>
  );
};
