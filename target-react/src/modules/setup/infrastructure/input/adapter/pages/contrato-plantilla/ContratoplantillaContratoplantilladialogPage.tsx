import React, { useState, useEffect } from 'react';
import { useContratoplantillaContratoplantilladialog } from '../../hooks/useContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogList } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogList';
import { ContratoplantillaContratoplantilladialogForm } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogForm';
import { ContratoplantillaContratoplantilladialog, CreateContratoplantillaContratoplantilladialog, UpdateContratoplantillaContratoplantilladialog } from '../../../../../domain/model/ContratoplantillaContratoplantilladialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Pantallas ZUL fuente: contratoPlantilla.zul, contratoPlantillaDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useContratoplantillaContratoplantilladialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const ContratoplantillaContratoplantilladialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useContratoplantillaContratoplantilladialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContratoplantillaContratoplantilladialog | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (data: CreateContratoplantillaContratoplantilladialog | UpdateContratoplantillaContratoplantilladialog) => {
    if (editingItem) {
      await update(editingItem.id.toString(), data as UpdateContratoplantillaContratoplantilladialog);
    } else {
      await create(data as CreateContratoplantillaContratoplantilladialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Plantillas de Contratos</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nueva</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <ContratoplantillaContratoplantilladialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingItem(undefined); }} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <ContratoplantillaContratoplantilladialogList items={items} loading={loading} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={(id) => { if (globalThis.confirm('¿Eliminar?')) remove(id.toString()); }} />)}
    </div>
  );
};



