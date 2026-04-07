import React from 'react';
import { RubroplantillacontabledialogResponse } from '../dto/RubroplantillacontabledialogDto';
import { RubroplantillacontabledialogCard } from './RubroplantillacontabledialogCard';

interface RubroplantillacontabledialogListProps {
  items: RubroplantillacontabledialogResponse[];
  loading?: boolean;
  onSelect?: (item: RubroplantillacontabledialogResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: RubroplantillacontabledialogResponse) => void;
}

/**
 * Componente Lista: rubroplantillaContableDialog.zul
 * Renderiza una lista de elementos usando RubroplantillacontabledialogCard.
 * Pantallas fuente: rubroplantillaContableDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const RubroplantillacontabledialogList: React.FC<RubroplantillacontabledialogListProps> = ({
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
    <div data-testid="rubroplantillacontabledialog-list">
      {items.map((item) => (
        <RubroplantillacontabledialogCard
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
