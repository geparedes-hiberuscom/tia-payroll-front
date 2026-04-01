import React from 'react';
import { RubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';
import { RubrosRubrosdialogCard } from './RubrosRubrosdialogCard';

interface RubrosRubrosdialogListProps {
  items: RubrosRubrosdialog[];
  loading?: boolean;
  onSelect?: (item: RubrosRubrosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: RubrosRubrosdialog) => void;
}

export const RubrosRubrosdialogList: React.FC<RubrosRubrosdialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div data-testid="rubros-rubrosdialog-list-loading">Cargando lista...</div>;
  }

  if (items.length === 0) {
    return <p data-testid="rubros-rubrosdialog-list-empty">No se encontraron rubros.</p>;
  }

  return (
    <section data-testid="rubros-rubrosdialog-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => (
        <RubrosRubrosdialogCard
          key={item.idRubro}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};
