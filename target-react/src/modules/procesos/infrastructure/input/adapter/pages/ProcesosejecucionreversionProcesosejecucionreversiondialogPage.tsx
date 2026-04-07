import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejecucionreversionProcesosejecucionreversiondialog } from '../hooks/useProcesosejecucionreversionProcesosejecucionreversiondialog';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper } from '../mapper/ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper';
import { ProcesosejecucionreversionProcesosejecucionreversiondialog, CreateProcesosejecucionreversionProcesosejecucionreversiondialog, UpdateProcesosejecucionreversionProcesosejecucionreversiondialog } from '../../../../domain/model/ProcesosejecucionreversionProcesosejecucionreversiondialog';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogList } from '../components/ProcesosejecucionreversionProcesosejecucionreversiondialogList';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogForm } from '../components/ProcesosejecucionreversionProcesosejecucionreversiondialogForm';

export const ProcesosejecucionreversionProcesosejecucionreversiondialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useProcesosejecucionreversionProcesosejecucionreversiondialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcesosejecucionreversionProcesosejecucionreversiondialog | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: ProcesosejecucionreversionProcesosejecucionreversiondialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosejecucionreversionProcesosejecucionreversiondialog | UpdateProcesosejecucionreversionProcesosejecucionreversiondialog) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toUpdateRequest(data as UpdateProcesosejecucionreversionProcesosejecucionreversiondialog));
    } else {
      await create(ProcesosejecucionreversionProcesosejecucionreversiondialogViewMapper.toCreateRequest(data as CreateProcesosejecucionreversionProcesosejecucionreversiondialog));
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
    <main className="container" data-testid="procesosejecucionreversion-procesosejecucionreversiondialog-page">
      <h1>ProcesosejecucionreversionProcesosejecucionreversiondialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosejecucionreversionProcesosejecucionreversiondialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosejecucionreversionProcesosejecucionreversiondialogList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
