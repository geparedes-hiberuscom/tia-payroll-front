import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useEjecucionbot } from '../hooks/useEjecucionbot';
import { EjecucionbotViewMapper } from '../mapper/EjecucionbotViewMapper';
import { Ejecucionbot, CreateEjecucionbot, UpdateEjecucionbot } from '../../../../domain/model/Ejecucionbot';
import { EjecucionbotList } from '../components/EjecucionbotList';
import { EjecucionbotForm } from '../components/EjecucionbotForm';

export const EjecucionbotPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useEjecucionbot();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Ejecucionbot | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => EjecucionbotViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Ejecucionbot) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateEjecucionbot | UpdateEjecucionbot) => {
    if (editingItem) {
      await update(editingItem.id, EjecucionbotViewMapper.toUpdateRequest(data as UpdateEjecucionbot));
    } else {
      await create(EjecucionbotViewMapper.toCreateRequest(data as CreateEjecucionbot));
    }
    setShowForm(false);
    setEditingItem(undefined);
    await fetchAll();
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Deseas eliminar este registro?');
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll();
  };

  if (loading && domainItems.length === 0) {
    return <Loading message="Cargando listado..." />;
  }

  return (
    <main className="container" data-testid="ejecucionbot-page">
      <h1>Ejecucionbot</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <EjecucionbotForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <EjecucionbotList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['ejecucionbot'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
