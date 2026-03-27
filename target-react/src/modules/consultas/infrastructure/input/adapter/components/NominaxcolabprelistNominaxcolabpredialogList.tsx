import React from 'react';
import { NominaxcolabprelistNominaxcolabpredialog } from '../../../../domain/model/NominaxcolabprelistNominaxcolabpredialog';
import { NominaxcolabprelistNominaxcolabpredialogCard } from './NominaxcolabprelistNominaxcolabpredialogCard';

interface NominaxcolabprelistNominaxcolabpredialogListProps {
  items: NominaxcolabprelistNominaxcolabpredialog[];
  loading?: boolean;
  onSelect?: (item: NominaxcolabprelistNominaxcolabpredialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: NominaxcolabprelistNominaxcolabpredialog) => void;
}

/**
 * Componente Lista: nominaxColabPreList.zul / nominaxColabPreDialog.zul
 * Renderiza una lista de elementos usando NominaxcolabprelistNominaxcolabpredialogCard.
 * Pantallas fuente: nominaxColabPreList.zul, nominaxColabPreDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const NominaxcolabprelistNominaxcolabpredialogList: React.FC<NominaxcolabprelistNominaxcolabpredialogListProps> = ({
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
    <div data-testid="nominaxcolabprelist-nominaxcolabpredialog-list">
      {items.map((item) => (
        <NominaxcolabprelistNominaxcolabpredialogCard
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
