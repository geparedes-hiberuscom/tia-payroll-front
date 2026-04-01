import React, { useState } from 'react';
import { useRubrosxprocesodialog } from '../hooks/useRubrosxprocesodialog';
import { RubrosxprocesodialogList } from '../components/RubrosxprocesodialogList';
import { RubrosxprocesodialogForm } from '../components/RubrosxprocesodialogForm';
import { CreateRubrosxprocesodialog, Rubrosxprocesodialog, UpdateRubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosxprocesodialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useRubrosxprocesodialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Rubrosxprocesodialog | undefined>(undefined);

  const handleSubmit = async (data: CreateRubrosxprocesodialog | UpdateRubrosxprocesodialog) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateRubrosxprocesodialog);
    } else {
      await create(data as CreateRubrosxprocesodialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Rubros por Proceso</h1>
        {!showForm && <button onClick={() => setShowForm(true)}>+ Nuevo</button>}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <RubrosxprocesodialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingItem(undefined); }}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando asignaciones..." />
      ) : (
        <RubrosxprocesodialogList
          items={items}
          loading={loading}
          onEdit={(item) => { setEditingItem(item); setShowForm(true); }}
          onDelete={async (itemId) => { if (window.confirm('¿Eliminar este registro?')) await remove(itemId); }}
        />
      )}
    </div>
  );
};
