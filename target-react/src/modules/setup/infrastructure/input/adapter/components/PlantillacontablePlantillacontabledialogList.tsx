import React from 'react';
import { PlantillacontablePlantillacontabledialog } from '../../../../domain/model/PlantillacontablePlantillacontabledialog';
import { PlantillacontablePlantillacontabledialogCard } from './PlantillacontablePlantillacontabledialogCard';

interface PlantillacontablePlantillacontabledialogListProps {
  items: PlantillacontablePlantillacontabledialog[];
  loading?: boolean;
  onSelect?: (item: PlantillacontablePlantillacontabledialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: PlantillacontablePlantillacontabledialog) => void;
}

/**
 * Componente Lista: plantillaContable.zul / plantillaContableDialog.zul
 * Renderiza una lista de elementos usando PlantillacontablePlantillacontabledialogCard.
 * Pantallas fuente: plantillaContable.zul, plantillaContableDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const PlantillacontablePlantillacontabledialogList: React.FC<PlantillacontablePlantillacontabledialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div>Cargando lista...</div>;
  }

  if (items.length === 0) {
    return <p>No se encontraron elementos.</p>;
  }

  return (
    <div data-testid="plantillacontable-plantillacontabledialog-list">
      {items.map((item) => (
        <PlantillacontablePlantillacontabledialogCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
