import React from 'react';
import { Nominaresumengralxrubro } from '../../../../domain/model/Nominaresumengralxrubro';
import { NominaresumengralxrubroCard } from './NominaresumengralxrubroCard';

interface NominaresumengralxrubroListProps {
  items: Nominaresumengralxrubro[];
  loading?: boolean;
  onSelect?: (item: Nominaresumengralxrubro) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Nominaresumengralxrubro) => void;
}

/**
 * Componente Lista: nominaresumenGralxRubro.zul
 * Renderiza una lista de elementos usando NominaresumengralxrubroCard.
 * Pantallas fuente: nominaresumenGralxRubro.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const NominaresumengralxrubroList: React.FC<NominaresumengralxrubroListProps> = ({
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
    <div data-testid="nominaresumengralxrubro-list">
      {items.map((item) => (
        <NominaresumengralxrubroCard
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
