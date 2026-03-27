import React, { useState } from 'react';
import { useNominaresumengeneralResumengralnominadialog } from '../hooks/useNominaresumengeneralResumengralnominadialog';
import { NominaresumengeneralResumengralnominadialogList } from '../components/NominaresumengeneralResumengralnominadialogList';
import { NominaresumengeneralResumengralnominadialogForm } from '../components/NominaresumengeneralResumengralnominadialogForm';
import { NominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';
import { CreateNominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Pantallas ZUL fuente: nominaresumenGeneral.zul, ResumenGralNominaDialog.zul
 * Vertical Slice: 👤 Consultas
 *
 * Usa el hook useNominaresumengeneralResumengralnominadialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const NominaresumengeneralResumengralnominadialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useNominaresumengeneralResumengralnominadialog();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NominaresumengeneralResumengralnominadialog | undefined>(undefined);

  const handleCreate = async (data: CreateNominaresumengeneralResumengralnominadialog) => {
    await create(data);
    setShowForm(false);
  };

  const handleEdit = (item: NominaresumengeneralResumengralnominadialog) => {
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
        <h1>nominaresumenGeneral.zul / ResumenGralNominaDialog.zul</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            + Nuevo
          </button>
        )}
      </div>

      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <NominaresumengeneralResumengralnominadialogForm
          initialData={editingItem}
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando nominaresumenGeneral.zul / ResumenGralNominaDialog.zul..." />
      ) : (
        <NominaresumengeneralResumengralnominadialogList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
