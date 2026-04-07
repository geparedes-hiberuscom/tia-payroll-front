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
import { Modal } from '@shared/infrastructure/input/adapter/components/Modal';

export const ProcesosProcesosdialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, create, update, remove, fetchAll, clearError, page, size, totalElements } = useProcesosProcesosdialog();
  const [showForm, setShowForm] = useState(false);
  const [isReadOnlyForm, setIsReadOnlyForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcesosProcesosdialog | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<ProcesosProcesosdialogFilterParams>({ page: 0, size: 10 });

  const domainItems = useMemo(() => items.map((item) => ProcesosProcesosdialogViewMapper.toDomain(item)), [items]);

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

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }} data-testid="procesos-procesosdialog-page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Procesos</h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setIsReadOnlyForm(false);
              setEditingItem(undefined);
            }}
          >
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(activeFilters); }} />}

      {loading && domainItems.length === 0 && <Loading message="Cargando listado..." />}

      {showForm && (
        <Modal
          open={showForm}
          setIsOpen={(open) => {
            setShowForm(open);
            if (!open) {
              setIsReadOnlyForm(false);
              setEditingItem(undefined);
            }
          }}
          title=""
        >
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
        </Modal>
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
    </div>
  );
};
