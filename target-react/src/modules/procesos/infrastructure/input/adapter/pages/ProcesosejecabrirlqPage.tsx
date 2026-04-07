import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecabrirlq } from '../hooks/useProcesosejecabrirlq';
import { ProcesosejecabrirlqViewMapper } from '../mapper/ProcesosejecabrirlqViewMapper';
import { Procesosejecabrirlq, CreateProcesosejecabrirlq, UpdateProcesosejecabrirlq } from '../../../../domain/model/Procesosejecabrirlq';
import { ProcesosejecabrirlqList } from '../components/ProcesosejecabrirlqList';
import { ProcesosejecabrirlqForm } from '../components/ProcesosejecabrirlqForm';

export const ProcesosejecabrirlqPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useProcesosejecabrirlq();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Procesosejecabrirlq | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => ProcesosejecabrirlqViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Procesosejecabrirlq) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosejecabrirlq | UpdateProcesosejecabrirlq) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosejecabrirlqViewMapper.toUpdateRequest(data as UpdateProcesosejecabrirlq));
    } else {
      await create(ProcesosejecabrirlqViewMapper.toCreateRequest(data as CreateProcesosejecabrirlq));
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
    <main className="container" data-testid="procesosejecabrirlq-page">
      <h1>Procesosejecabrirlq</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosejecabrirlqForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosejecabrirlqList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['procesosejecabrirlq'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
