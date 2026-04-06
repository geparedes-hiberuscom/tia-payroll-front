import React, { useState, useEffect } from 'react';
import { useParametrosParametrosdialog } from '../hooks/useParametrosParametrosdialog';
import { ParametrosParametrosdialogList } from '../components/ParametrosParametrosdialogList';
import { ParametrosParametrosdialogForm } from '../components/ParametrosParametrosdialogForm';
import { ParametrosParametrosdialog, CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: parametros.zul / parametrosDialog.zul
 * Pantallas ZUL fuente: parametros.zul, parametrosDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useParametrosParametrosdialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 */
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

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ParametrosParametrosdialog | undefined>(undefined);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (data: CreateParametrosParametrosdialog | UpdateParametrosParametrosdialog) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateParametrosParametrosdialog);
    } else {
      await create(data as CreateParametrosParametrosdialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: ParametrosParametrosdialog) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Parámetros del Sistema</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>
            + Nuevo Parámetro
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <ParametrosParametrosdialogForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {!showForm && (
        loading && items.length === 0 ? (
          <Loading message="Cargando parámetros..." />
        ) : (
          <ParametrosParametrosdialogList
            items={items}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};
