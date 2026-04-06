import React, { useState, useEffect } from 'react';
import { usePlantillacontablePlantillacontabledialog } from '../hooks/usePlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogList } from '../components/PlantillacontablePlantillacontabledialogList';
import { PlantillacontablePlantillacontabledialogForm } from '../components/PlantillacontablePlantillacontabledialogForm';
import { PlantillacontablePlantillacontabledialog, CreatePlantillacontablePlantillacontabledialog, UpdatePlantillacontablePlantillacontabledialog } from '../../../../domain/model/PlantillacontablePlantillacontabledialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: plantillaContable.zul / plantillaContableDialog.zul
 * Pantallas ZUL fuente: plantillaContable.zul, plantillaContableDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook usePlantillacontablePlantillacontabledialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const PlantillacontablePlantillacontabledialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = usePlantillacontablePlantillacontabledialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PlantillacontablePlantillacontabledialog | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (data: CreatePlantillacontablePlantillacontabledialog | UpdatePlantillacontablePlantillacontabledialog) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdatePlantillacontablePlantillacontabledialog);
    } else {
      await create(data as CreatePlantillacontablePlantillacontabledialog);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Plantillas Contables</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nueva</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <PlantillacontablePlantillacontabledialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingItem(undefined); }} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <PlantillacontablePlantillacontabledialogList items={items} loading={loading} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={(id) => { if (window.confirm('¿Eliminar?')) remove(id.toString()); }} />)}
    </div>
  );
};
