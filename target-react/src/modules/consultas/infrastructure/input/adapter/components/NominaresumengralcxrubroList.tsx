import React from 'react';
import { Nominaresumengralcxrubro } from '../../../../domain/model/Nominaresumengralcxrubro';
import { NominaresumengralcxrubroCard } from './NominaresumengralcxrubroCard';

interface NominaresumengralcxrubroListProps {
  items: Nominaresumengralcxrubro[];
  loading?: boolean;
  onSelect?: (item: Nominaresumengralcxrubro) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Nominaresumengralcxrubro) => void;
}

/**
 * Componente Lista: nominaresumenGralCxRubro.zul
 * Renderiza una lista de elementos usando NominaresumengralcxrubroCard.
 * Pantallas fuente: nominaresumenGralCxRubro.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const NominaresumengralcxrubroList: React.FC<NominaresumengralcxrubroListProps> = ({
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
    <div data-testid="nominaresumengralcxrubro-list">
      {items.map((item) => (
        <NominaresumengralcxrubroCard
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
