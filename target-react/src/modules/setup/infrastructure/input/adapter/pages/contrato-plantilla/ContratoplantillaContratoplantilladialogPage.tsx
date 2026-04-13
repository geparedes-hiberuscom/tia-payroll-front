import React, { useState, useEffect } from 'react';
import { useContratoplantillaContratoplantilladialog } from '../../hooks/useContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogList } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogList';
import { ContratoplantillaContratoplantilladialogForm } from '../../components/contrato-plantilla/ContratoplantillaContratoplantilladialogForm';
import { CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest, ContratoplantillaContratoplantilladialogResponse } from '../../dto/ContratoplantillaContratoplantilladialogDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { UIButton } from '../../components/ui-kit';

/**
 * Página principal: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Pantallas ZUL fuente: contratoPlantilla.zul, contratoPlantillaDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Usa el hook useContratoplantillaContratoplantilladialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 */
export const ContratoplantillaContratoplantilladialogPage: React.FC = () => {
  const { items, loading, error, fetchAll, create, update, remove, clearError } = useContratoplantillaContratoplantilladialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContratoplantillaContratoplantilladialogResponse | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => { 
    fetchAll(); 
  }, [fetchAll]);

  const handleSubmit = async (data: CreateContratoplantillaContratoplantilladialogRequest | UpdateContratoplantillaContratoplantilladialogRequest) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdateContratoplantillaContratoplantilladialogRequest);
      } else {
        await create(data as CreateContratoplantillaContratoplantilladialogRequest);
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

  const handleEdit = (item: ContratoplantillaContratoplantilladialogResponse) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // eslint-disable-next-line no-alert
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
        <h1>Plantillas de Contratos</h1>
        {!showForm && (
          <UIButton 
            variant="primary"
            size="medium"
            onClick={() => { setEditingItem(undefined); setShowForm(true); }}
          >
            + Nueva Plantilla
          </UIButton>
        )}
      </div>

      {(formError || error) && (
        <ErrorBanner 
          message={formError || error || ''} 
          onRetry={() => { setFormError(null); clearError(); fetchAll(); }} 
        />
      )}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: 6 }}>
          <ContratoplantillaContratoplantilladialogForm 
            initialData={editingItem} 
            onSubmit={handleSubmit} 
            onCancel={() => { setShowForm(false); setEditingItem(undefined); }} 
            loading={loading}
          />
        </div>
      )}

      {!showForm && (loading && items.length === 0 ? <Loading message="Cargando plantillas..." /> : <ContratoplantillaContratoplantilladialogList items={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};



