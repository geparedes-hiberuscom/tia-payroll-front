import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useSobregiroshistricossubrecurso } from '../hooks/useSobregiroshistricossubrecurso';
import { SobregiroshistricossubrecursoViewMapper } from '../mapper/SobregiroshistricossubrecursoViewMapper';
import { Sobregiroshistricossubrecurso, CreateSobregiroshistricossubrecurso, UpdateSobregiroshistricossubrecurso } from '../../../../domain/model/Sobregiroshistricossubrecurso';
import { SobregiroshistricossubrecursoList } from '../components/SobregiroshistricossubrecursoList';
import { SobregiroshistricossubrecursoForm } from '../components/SobregiroshistricossubrecursoForm';

export const SobregiroshistricossubrecursoPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError } = useSobregiroshistricossubrecurso();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Sobregiroshistricossubrecurso | undefined>(undefined);

  const domainItems = useMemo(() => items.map((item) => SobregiroshistricossubrecursoViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Sobregiroshistricossubrecurso) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateSobregiroshistricossubrecurso | UpdateSobregiroshistricossubrecurso) => {
    if (editingItem) {
      await update(editingItem.id, SobregiroshistricossubrecursoViewMapper.toUpdateRequest(data as UpdateSobregiroshistricossubrecurso));
    } else {
      await create(SobregiroshistricossubrecursoViewMapper.toCreateRequest(data as CreateSobregiroshistricossubrecurso));
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
    <main className="container" data-testid="sobregiroshistricossubrecurso-page">
      <h1>Sobregiroshistricossubrecurso</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <SobregiroshistricossubrecursoForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <SobregiroshistricossubrecursoList
        items={domainItems}
        loading={loading}
        onSelect={(item) => navigate(ROUTES.PATHS['sobregiroshistricossubrecurso'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
