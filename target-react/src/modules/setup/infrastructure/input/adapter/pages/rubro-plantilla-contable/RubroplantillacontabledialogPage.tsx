import React, { useState, useEffect } from 'react';
import { useRubroplantillacontabledialog } from '../../hooks/useRubroplantillacontabledialog';
import { RubroplantillacontabledialogList } from '../../components/rubro-plantilla-contable/RubroplantillacontabledialogList';
import { RubroplantillacontabledialogForm } from '../../components/rubro-plantilla-contable/RubroplantillacontabledialogForm';
import { CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogResponse } from '../../dto/RubroplantillacontabledialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { UIButton } from '../../components/ui-kit';

/**
 * Página principal: rubroplantillaContableDialog.zul
 * Pantallas ZUL fuente: rubroplantillaContableDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useRubroplantillacontabledialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 */
export const RubroplantillacontabledialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useRubroplantillacontabledialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RubroplantillacontabledialogResponse | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => { 
    fetchAll(); 
  }, []);

  const handleSubmit = async (data: CreateRubroplantillacontabledialogRequest | UpdateRubroplantillacontabledialogRequest) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdateRubroplantillacontabledialogRequest);
      } else {
        await create(data as CreateRubroplantillacontabledialogRequest);
      }
      setShowForm(false);
      setEditingItem(undefined);
      setFormError(null);
      await fetchAll();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar';
      setFormError(errorMessage);
    }
  };

  const handleEdit = (item: RubroplantillacontabledialogResponse) => {
    setEditingItem(item);
    setShowForm(true);
    setFormError(null);
    clearError();
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      try {
        await remove(id);
        await fetchAll();
      } catch (err) {
        setFormError(err instanceof Error ? err.message : 'Error al eliminar');
      }
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Rubros de Plantilla Contable</h1>
        {!showForm && (
          <UIButton 
            variant="primary"
            size="medium"
            onClick={() => { setEditingItem(undefined); setShowForm(true); setFormError(null); clearError(); }}
          >
            + Nuevo Rubro
          </UIButton>
        )}
      </div>

      {error && !showForm && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: 6 }}>
          <RubroplantillacontabledialogForm 
            initialData={editingItem} 
            onSubmit={handleSubmit} 
            onCancel={() => { setShowForm(false); setEditingItem(undefined); setFormError(null); clearError(); }} 
            loading={loading}
            error={formError}
          />
        </div>
      )}

      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando rubros..." /> : <RubroplantillacontabledialogList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};



