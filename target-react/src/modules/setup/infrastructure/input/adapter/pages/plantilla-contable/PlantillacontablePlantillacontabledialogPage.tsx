import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlantillacontablePlantillacontabledialog } from '../../hooks/usePlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogList } from '../../components/plantilla-contable/PlantillacontablePlantillacontabledialogList';
import { PlantillacontablePlantillacontabledialogForm } from '../../components/plantilla-contable/PlantillacontablePlantillacontabledialogForm';
import { CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest } from '../../dto/PlantillacontablePlantillacontabledialogDto';
import { PlantillacontablePlantillacontabledialog } from '../../../../../domain/model/PlantillacontablePlantillacontabledialog';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: plantillaContable.zul / plantillaContableDialog.zul
 * Vertical Slice: 🔧 Setup y Configuración
 *
 * Muestra la lista de plantillas contables con capacidad de crear, editar y eliminar.
 * Usa el hook usePlantillacontablePlantillacontabledialog que conecta con:
 *   ApplicationService → GatewayPort → GatewayAdapter (Axios)
 */
export const PlantillacontablePlantillacontabledialogPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error, fetchAll, create, update, remove, clearError } = usePlantillacontablePlantillacontabledialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PlantillacontablePlantillacontabledialog | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (data: CreatePlantillacontablePlantillacontabledialogRequest | UpdatePlantillacontablePlantillacontabledialogRequest) => {
    try {
      setFormError(null);
      if (editingItem) {
        await update(editingItem.id, data as UpdatePlantillacontablePlantillacontabledialogRequest);
      } else {
        await create(data as CreatePlantillacontablePlantillacontabledialogRequest);
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

  const handleEdit = (item: PlantillacontablePlantillacontabledialog) => {
    setEditingItem(item);
    setShowForm(true);
    setFormError(null);
    clearError();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
    setFormError(null);
    clearError();
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await remove(id);
        await fetchAll();
      } catch (err) {
        console.error('Error al eliminar:', err);
      }
    }
  };

  const handleViewDetail = (item: PlantillacontablePlantillacontabledialog) => {
    navigate(`/setup/plantillacontable-plantillacontabledialog/${item.id}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: '0.5rem' }}>Plantillas Contables</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>Gestión de plantillas contables del sistema</p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setEditingItem(undefined);
              setShowForm(true);
            }}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#B1CBD5',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7B8D95';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#B1CBD5';
            }}
          >
            + Nueva Plantilla
          </button>
        )}
      </div>

      {error && !showForm && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}

      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: 6, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>
            {editingItem ? 'Editar Plantilla Contable' : 'Nueva Plantilla Contable'}
          </h3>
          <PlantillacontablePlantillacontabledialogForm
            initialData={editingItem}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            error={formError}
          />
        </div>
      )}

      {!showForm && (
        <>
          {loading && items.length === 0 ? (
            <Loading message="Cargando plantillas contables..." />
          ) : (
            <PlantillacontablePlantillacontabledialogList
              items={items}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleViewDetail}
            />
          )}
        </>
      )}
    </div>
  );
};



