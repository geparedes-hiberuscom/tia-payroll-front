import React, { useState, useEffect } from 'react';
import { UIButton } from '../../components/ui-kit';
import { useGeningproyectados } from '../../hooks/useGeningproyectados';
import { GeningproyectadosList } from '../../components/gening-proyectados/GeningproyectadosList';
import { GeningproyectadosForm } from '../../components/gening-proyectados/GeningproyectadosForm';
import { GenerarGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página principal: genIngProyectados.zul
 * Vertical Slice: 🔧 Setup y Configuración
 */
export const GeningproyectadosPage: React.FC = () => {
  const { items, loading, error, fetchAll, generar, update, remove, clearError } = useGeningproyectados();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GeningproyectadosResponse | undefined>(undefined);

  useEffect(() => { fetchAll(); }, []);

  const handleEdit = (item: GeningproyectadosResponse) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm('¿Estás seguro de eliminar este registro?')) {
      await remove(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleSubmit = async (data: GenerarGeningproyectadosRequest | UpdateGeningproyectadosRequest) => {
    if (editingItem) {
      await update(editingItem.id, data as UpdateGeningproyectadosRequest);
    } else {
      await generar(data as GenerarGeningproyectadosRequest);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ingresos Proyectados</h1>
        {!showForm && <UIButton variant="primary" onClick={() => setShowForm(true)}>+ Generar</UIButton>}
      </div>
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(); }} />}
      {showForm && (
        <GeningproyectadosForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
      {!showForm && (loading && items.length === 0 ? (
        <Loading message="Cargando ingresos proyectados..." />
      ) : (
        <GeningproyectadosList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};



