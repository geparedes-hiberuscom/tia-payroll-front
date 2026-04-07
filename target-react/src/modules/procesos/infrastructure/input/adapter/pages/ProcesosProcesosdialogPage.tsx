import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosProcesosdialog } from '../hooks/useProcesosProcesosdialog';
import { ProcesosProcesosdialogViewMapper } from '../mapper/ProcesosProcesosdialogViewMapper';
import { ProcesosProcesosdialog, CreateProcesosProcesosdialog, UpdateProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';
import { ProcesosProcesosdialogList } from '../components/ProcesosProcesosdialogList';
import { ProcesosProcesosdialogForm } from '../components/ProcesosProcesosdialogForm';
import { ProcesosProcesosdialogFilterParams } from '../dto/ProcesosProcesosdialogDto';

export const ProcesosProcesosdialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError, page, size, totalElements } = useProcesosProcesosdialog();
  const [showForm, setShowForm] = useState(false);
  const [isReadOnlyForm, setIsReadOnlyForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcesosProcesosdialog | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<ProcesosProcesosdialogFilterParams>({ page: 0, size: 10 });

  const domainItems = useMemo(() => items.map((item) => ProcesosProcesosdialogViewMapper.toDomain(item)), [items]);

  const handleCreate = () => {
    setIsReadOnlyForm(false);
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: ProcesosProcesosdialog) => {
    setIsReadOnlyForm(true);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog) => {
    if (editingItem) {
      await update(editingItem.id, ProcesosProcesosdialogViewMapper.toUpdateRequest(data as UpdateProcesosProcesosdialog));
    } else {
      await create(ProcesosProcesosdialogViewMapper.toCreateRequest(data as CreateProcesosProcesosdialog));
    }
    setShowForm(false);
    setIsReadOnlyForm(false);
    setEditingItem(undefined);
    await fetchAll(activeFilters);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Deseas eliminar este registro?');
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll(activeFilters);
  };

  if (loading && domainItems.length === 0) {
    return <Loading message="Cargando listado..." />;
  }

  return (
    <main className="container" data-testid="procesos-procesosdialog-page">
      <h1>ProcesosProcesosdialog</h1>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(activeFilters); }} />}
      {!showForm && <button type="button" className="btn btn-primary" onClick={handleCreate}>Nuevo</button>}
      {showForm && (
        <ProcesosProcesosdialogForm
          initialData={editingItem}
          readOnly={isReadOnlyForm}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsReadOnlyForm(false);
            setEditingItem(undefined);
          }}
          loading={loading}
        />
      )}
      <ProcesosProcesosdialogList
        items={domainItems}
        loading={loading}
        page={page}
        pageSize={size}
        totalItems={totalElements}
        onPageChange={(nextPage) => {
          const nextFilters: ProcesosProcesosdialogFilterParams = {
            ...activeFilters,
            page: nextPage,
            size,
          };
          setActiveFilters(nextFilters);
          fetchAll(nextFilters);
        }}
        onSelect={(item) => navigate(ROUTES.PATHS['procesos-procesosdialog'] + '/' + item.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
