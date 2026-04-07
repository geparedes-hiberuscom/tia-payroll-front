import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosejeccolaboradores } from '../hooks/useProcesosejeccolaboradores';
import { ProcesosejeccolaboradoresViewMapper } from '../mapper/ProcesosejeccolaboradoresViewMapper';
import { Procesosejeccolaboradores, CreateProcesosejeccolaboradores, UpdateProcesosejeccolaboradores } from '../../../../domain/model/Procesosejeccolaboradores';
import { ProcesosejeccolaboradoresList } from '../components/ProcesosejeccolaboradoresList';
import { ProcesosejeccolaboradoresForm } from '../components/ProcesosejeccolaboradoresForm';

export const ProcesosejeccolaboradoresPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useProcesosejeccolaboradores();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Procesosejeccolaboradores | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => ProcesosejeccolaboradoresViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Procesosejeccolaboradores) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosejeccolaboradores | UpdateProcesosejeccolaboradores) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosejeccolaboradoresViewMapper.toUpdateRequest(data as UpdateProcesosejeccolaboradores));
    } else {
      await create(ProcesosejeccolaboradoresViewMapper.toCreateRequest(data as CreateProcesosejeccolaboradores));
    }
    setShowForm(false);
    setEditingItem(undefined);
    await fetchAll({});
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Deseas eliminar este registro?');
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll({});
  };

  if (loading && domainItems.length === 0) {
    return <Loading message="Cargando listado..." />;
  }

  return (
    <main className="container" data-testid="procesosejeccolaboradores-page">
      <h1>Procesosejeccolaboradores</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll({}); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosejeccolaboradoresForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosejeccolaboradoresList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['procesosejeccolaboradores'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
