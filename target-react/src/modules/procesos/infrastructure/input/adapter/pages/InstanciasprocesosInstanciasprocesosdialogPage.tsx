import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useInstanciasprocesosInstanciasprocesosdialog } from '../hooks/useInstanciasprocesosInstanciasprocesosdialog';
import { InstanciasprocesosInstanciasprocesosdialogViewMapper } from '../mapper/InstanciasprocesosInstanciasprocesosdialogViewMapper';
import { InstanciasprocesosInstanciasprocesosdialog, CreateInstanciasprocesosInstanciasprocesosdialog, UpdateInstanciasprocesosInstanciasprocesosdialog } from '../../../../domain/model/InstanciasprocesosInstanciasprocesosdialog';
import { InstanciasprocesosInstanciasprocesosdialogList } from '../components/InstanciasprocesosInstanciasprocesosdialogList';
import { InstanciasprocesosInstanciasprocesosdialogForm } from '../components/InstanciasprocesosInstanciasprocesosdialogForm';

export const InstanciasprocesosInstanciasprocesosdialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useInstanciasprocesosInstanciasprocesosdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InstanciasprocesosInstanciasprocesosdialog | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => InstanciasprocesosInstanciasprocesosdialogViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: InstanciasprocesosInstanciasprocesosdialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateInstanciasprocesosInstanciasprocesosdialog | UpdateInstanciasprocesosInstanciasprocesosdialog) => {
    if (editingItem) {
      await update(editingItem.id, InstanciasprocesosInstanciasprocesosdialogViewMapper.toUpdateRequest(data as UpdateInstanciasprocesosInstanciasprocesosdialog));
    } else {
      await create(InstanciasprocesosInstanciasprocesosdialogViewMapper.toCreateRequest(data as CreateInstanciasprocesosInstanciasprocesosdialog));
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
    <main className="container" data-testid="instanciasprocesos-instanciasprocesosdialog-page">
      <h1>InstanciasprocesosInstanciasprocesosdialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <InstanciasprocesosInstanciasprocesosdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <InstanciasprocesosInstanciasprocesosdialogList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
