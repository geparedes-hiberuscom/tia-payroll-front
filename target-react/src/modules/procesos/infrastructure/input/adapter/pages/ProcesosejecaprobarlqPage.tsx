import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecaprobarlq } from '../hooks/useProcesosejecaprobarlq';
import { ProcesosejecaprobarlqViewMapper } from '../mapper/ProcesosejecaprobarlqViewMapper';
import { Procesosejecaprobarlq, CreateProcesosejecaprobarlq, UpdateProcesosejecaprobarlq } from '../../../../domain/model/Procesosejecaprobarlq';
import { ProcesosejecaprobarlqList } from '../components/ProcesosejecaprobarlqList';
import { ProcesosejecaprobarlqForm } from '../components/ProcesosejecaprobarlqForm';

export const ProcesosejecaprobarlqPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useProcesosejecaprobarlq();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Procesosejecaprobarlq | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => ProcesosejecaprobarlqViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Procesosejecaprobarlq) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosejecaprobarlq | UpdateProcesosejecaprobarlq) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosejecaprobarlqViewMapper.toUpdateRequest(data as UpdateProcesosejecaprobarlq));
    } else {
      await create(ProcesosejecaprobarlqViewMapper.toCreateRequest(data as CreateProcesosejecaprobarlq));
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
    <main className="container" data-testid="procesosejecaprobarlq-page">
      <h1>Procesosejecaprobarlq</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosejecaprobarlqForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosejecaprobarlqList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['procesosejecaprobarlq'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
