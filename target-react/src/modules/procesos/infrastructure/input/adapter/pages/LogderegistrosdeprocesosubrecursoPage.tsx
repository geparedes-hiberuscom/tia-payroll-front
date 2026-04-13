import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useLogderegistrosdeprocesosubrecurso } from '../hooks/useLogderegistrosdeprocesosubrecurso';
import { LogderegistrosdeprocesosubrecursoViewMapper } from '../mapper/LogderegistrosdeprocesosubrecursoViewMapper';
import { Logderegistrosdeprocesosubrecurso, CreateLogderegistrosdeprocesosubrecurso, UpdateLogderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';
import { LogderegistrosdeprocesosubrecursoList } from '../components/LogderegistrosdeprocesosubrecursoList';
import { LogderegistrosdeprocesosubrecursoForm } from '../components/LogderegistrosdeprocesosubrecursoForm';

export const LogderegistrosdeprocesosubrecursoPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useLogderegistrosdeprocesosubrecurso();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Logderegistrosdeprocesosubrecurso | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => LogderegistrosdeprocesosubrecursoViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Logderegistrosdeprocesosubrecurso) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateLogderegistrosdeprocesosubrecurso | UpdateLogderegistrosdeprocesosubrecurso) => {
    if (editingItem) {
      await update(editingItem.id, LogderegistrosdeprocesosubrecursoViewMapper.toUpdateRequest(data as UpdateLogderegistrosdeprocesosubrecurso));
    } else {
      await create(LogderegistrosdeprocesosubrecursoViewMapper.toCreateRequest(data as CreateLogderegistrosdeprocesosubrecurso));
    }
    setShowForm(false);
    setEditingItem(undefined);
    await fetchAll({ ejecucionId: 0 });
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Deseas eliminar este registro?');
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll({ ejecucionId: 0 });
  };

  if (loading && domainItems.length === 0) {
    return <Loading message="Cargando listado..." />;
  }

  return (
    <main className="container" data-testid="logderegistrosdeprocesosubrecurso-page">
      <h1>Logderegistrosdeprocesosubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll({ ejecucionId: 0 }); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <LogderegistrosdeprocesosubrecursoForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <LogderegistrosdeprocesosubrecursoList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['logderegistrosdeprocesosubrecurso'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
