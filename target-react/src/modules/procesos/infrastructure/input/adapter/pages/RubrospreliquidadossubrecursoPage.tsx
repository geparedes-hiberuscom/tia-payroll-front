import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useRubrospreliquidadossubrecurso } from '../hooks/useRubrospreliquidadossubrecurso';
import { RubrospreliquidadossubrecursoViewMapper } from '../mapper/RubrospreliquidadossubrecursoViewMapper';
import { Rubrospreliquidadossubrecurso, CreateRubrospreliquidadossubrecurso, UpdateRubrospreliquidadossubrecurso } from '../../../../domain/model/Rubrospreliquidadossubrecurso';
import { RubrospreliquidadossubrecursoList } from '../components/RubrospreliquidadossubrecursoList';
import { RubrospreliquidadossubrecursoForm } from '../components/RubrospreliquidadossubrecursoForm';

export const RubrospreliquidadossubrecursoPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useRubrospreliquidadossubrecurso();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Rubrospreliquidadossubrecurso | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => RubrospreliquidadossubrecursoViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Rubrospreliquidadossubrecurso) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateRubrospreliquidadossubrecurso | UpdateRubrospreliquidadossubrecurso) => {
    if (editingItem) {
      await update(editingItem.id, RubrospreliquidadossubrecursoViewMapper.toUpdateRequest(data as UpdateRubrospreliquidadossubrecurso));
    } else {
      await create(RubrospreliquidadossubrecursoViewMapper.toCreateRequest(data as CreateRubrospreliquidadossubrecurso));
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
    <main className="container" data-testid="rubrospreliquidadossubrecurso-page">
      <h1>Rubrospreliquidadossubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <RubrospreliquidadossubrecursoForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <RubrospreliquidadossubrecursoList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['rubrospreliquidadossubrecurso'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
