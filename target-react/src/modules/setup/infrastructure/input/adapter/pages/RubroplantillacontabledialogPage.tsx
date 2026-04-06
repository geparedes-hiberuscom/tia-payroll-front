import React, { useState, useEffect } from 'react';
import { useRubroplantillacontabledialog } from '../hooks/useRubroplantillacontabledialog';
import { RubroplantillacontabledialogList } from '../components/RubroplantillacontabledialogList';
import { RubroplantillacontabledialogForm } from '../components/RubroplantillacontabledialogForm';
import { CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogResponse } from '../dto/RubroplantillacontabledialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: rubroplantillaContableDialog.zul
 * Pantallas ZUL fuente: rubroplantillaContableDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useRubroplantillacontabledialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 *
 * TODO: Copilot — Completar la página con la lógica de las pantallas ZUL originales.
 */
export const RubroplantillacontabledialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useRubroplantillacontabledialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RubroplantillacontabledialogResponse | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (data: CreateRubroplantillacontabledialogRequest | UpdateRubroplantillacontabledialogRequest) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateRubroplantillacontabledialogRequest);
    } else {
      await create(data as CreateRubroplantillacontabledialogRequest);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Rubros de Plantillas</h1>
        {!showForm && <button onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem' }}>+ Nuevo Rubro</button>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && <RubroplantillacontabledialogForm initialData={editingItem} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingItem(undefined); }} loading={loading} />}
      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando..." /> : <RubroplantillacontabledialogList items={items} loading={loading} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={(id) => { if (window.confirm('¿Eliminar?')) remove(id); }} />)}
    </div>
  );
};
