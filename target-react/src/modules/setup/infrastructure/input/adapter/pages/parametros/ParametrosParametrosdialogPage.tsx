import React, { useState, useEffect } from 'react';
import { useParametrosParametrosdialog } from '../../hooks/useParametrosParametrosdialog';
import { ParametrosParametrosdialogList } from '../../components/parametros/ParametrosParametrosdialogList';
import { ParametrosParametrosdialogForm } from '../../components/parametros/ParametrosParametrosdialogForm';
import { ParametrosParametrosdialogFilter } from '../../components/parametros/ParametrosParametrosdialogFilter';
import { ParametrosDeleteConfirmModal } from '../../components/parametros/ParametrosDeleteConfirmModal';
import { CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogResponse, ParametrosParametrosdialogFilterParams } from '../../dto/ParametrosParametrosdialogDto';
import { Modal } from '@shared/infrastructure/input/adapter/components/Modal';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const ParametrosParametrosdialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useParametrosParametrosdialog();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ParametrosParametrosdialogResponse | undefined>(undefined);
  const [deletingItem, setDeletingItem] = useState<ParametrosParametrosdialogResponse | undefined>(undefined);
  const [filteredItems, setFilteredItems] = useState<ParametrosParametrosdialogResponse[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleApplyFilter = (params: ParametrosParametrosdialogFilterParams) => {
    const filtered = items.filter((item) => {
      const matchesIdParametro = !params.idParametro || item.idParametro.toLowerCase().includes(params.idParametro.toLowerCase());
      const matchesParametro = !params.parametro || item.parametro.toLowerCase().includes(params.parametro.toLowerCase());
      return matchesIdParametro && matchesParametro;
    });
    setFilteredItems(filtered);
  };

  const handleClearFilter = () => {
    setFilteredItems(items);
  };

  const handleSubmit = async (data: CreateParametrosParametrosdialogRequest | UpdateParametrosParametrosdialogRequest) => {
    if (editingItem) {
      await update(editingItem.entorno, editingItem.idParametro, data as UpdateParametrosParametrosdialogRequest);
    } else {
      await create(data as CreateParametrosParametrosdialogRequest);
    }
    setShowFormModal(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: ParametrosParametrosdialogResponse) => {
    setEditingItem(item);
    setShowFormModal(true);
  };

  const handleDeleteClick = (id: string) => {
    const [entorno, idParametro] = id.split(':');
    const itemToDelete = items.find((item) => item.entorno === entorno && item.idParametro === idParametro);
    if (itemToDelete) {
      setDeletingItem(itemToDelete);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingItem) {
      await remove(deletingItem.entorno, deletingItem.idParametro);
      setShowDeleteModal(false);
      setDeletingItem(undefined);
    }
  };

  const handleCancelForm = () => {
    setShowFormModal(false);
    setEditingItem(undefined);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingItem(undefined);
  };

  const modalTitle = editingItem ? 'Editar Parámetro' : 'Crear Nuevo Parámetro';

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Parámetros del Sistema</h1>
        <button
          onClick={() => setShowFormModal(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#B1CBD5',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          + Nuevo Parámetro
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      <ParametrosParametrosdialogFilter
        loading={loading}
        onApply={handleApplyFilter}
        onClear={handleClearFilter}
      />

      {loading && items.length === 0 ? (
        <Loading message="Cargando parámetros..." />
      ) : (
        <ParametrosParametrosdialogList
          items={filteredItems}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <Modal open={showFormModal} setIsOpen={handleCancelForm} title={modalTitle}>
        <ParametrosParametrosdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
          loading={loading}
        />
      </Modal>

      <ParametrosDeleteConfirmModal
        open={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={loading}
        parametroName={deletingItem?.parametro}
      />
    </div>
  );
};


