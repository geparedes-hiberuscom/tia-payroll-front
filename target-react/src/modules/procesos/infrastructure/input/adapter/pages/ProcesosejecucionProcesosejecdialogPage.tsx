import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecucionProcesosejecdialog } from '../hooks/useProcesosejecucionProcesosejecdialog';
import { ProcesosejecucionProcesosejecdialogViewMapper } from '../mapper/ProcesosejecucionProcesosejecdialogViewMapper';
import { ProcesosejecucionProcesosejecdialog, CreateProcesosejecucionProcesosejecdialog, UpdateProcesosejecucionProcesosejecdialog } from '../../../../domain/model/ProcesosejecucionProcesosejecdialog';
import { ProcesosejecucionProcesosejecdialogList } from '../components/ProcesosejecucionProcesosejecdialogList';
import { ProcesosejecucionProcesosejecdialogForm } from '../components/ProcesosejecucionProcesosejecdialogForm';

export const ProcesosejecucionProcesosejecdialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useProcesosejecucionProcesosejecdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcesosejecucionProcesosejecdialog | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => ProcesosejecucionProcesosejecdialogViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: ProcesosejecucionProcesosejecdialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosejecucionProcesosejecdialog | UpdateProcesosejecucionProcesosejecdialog) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosejecucionProcesosejecdialogViewMapper.toUpdateRequest(data as UpdateProcesosejecucionProcesosejecdialog));
    } else {
      await create(ProcesosejecucionProcesosejecdialogViewMapper.toCreateRequest(data as CreateProcesosejecucionProcesosejecdialog));
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
    <main className="container" data-testid="procesosejecucion-procesosejecdialog-page">
      <h1>ProcesosejecucionProcesosejecdialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosejecucionProcesosejecdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosejecucionProcesosejecdialogList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['procesosejecucion-procesosejecdialog'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
