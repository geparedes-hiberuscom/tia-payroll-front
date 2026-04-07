import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useEjecucionproccierre } from '../hooks/useEjecucionproccierre';
import { EjecucionproccierreViewMapper } from '../mapper/EjecucionproccierreViewMapper';
import { Ejecucionproccierre, CreateEjecucionproccierre, UpdateEjecucionproccierre } from '../../../../domain/model/Ejecucionproccierre';
import { EjecucionproccierreList } from '../components/EjecucionproccierreList';
import { EjecucionproccierreForm } from '../components/EjecucionproccierreForm';

export const EjecucionproccierrePage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useEjecucionproccierre();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Ejecucionproccierre | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => EjecucionproccierreViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Ejecucionproccierre) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateEjecucionproccierre | UpdateEjecucionproccierre) => {
    if (editingItem) {
      await update(editingItem.id, EjecucionproccierreViewMapper.toUpdateRequest(data as UpdateEjecucionproccierre));
    } else {
      await create(EjecucionproccierreViewMapper.toCreateRequest(data as CreateEjecucionproccierre));
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
    <main className="container" data-testid="ejecucionproccierre-page">
      <h1>Ejecucionproccierre</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <EjecucionproccierreForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <EjecucionproccierreList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['ejecucionproccierre'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
