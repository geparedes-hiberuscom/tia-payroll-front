import React from 'react';
import { Rubroplantillacontabledialog } from '../../../../domain/model/Rubroplantillacontabledialog';
import { RubroplantillacontabledialogCard } from './RubroplantillacontabledialogCard';

interface RubroplantillacontabledialogListProps {
  items: Rubroplantillacontabledialog[];
  loading?: boolean;
  onSelect?: (item: Rubroplantillacontabledialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Rubroplantillacontabledialog) => void;
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
