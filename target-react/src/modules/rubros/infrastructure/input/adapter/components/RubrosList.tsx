import React from 'react';
import { Rubros } from '../../../../domain/model/Rubros';

interface RubrosListProps {
  items: Rubros[];
  onDelete?: (id: string) => void;
}

export const RubrosList: React.FC<RubrosListProps> = ({ items, onDelete }) => {
  if (items.length === 0) {
    return <p>No hay elementos.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <span>{item.nombre}</span>
          {onDelete && (
            <button onClick={() => onDelete(item.id)} style={{ color: 'red', cursor: 'pointer' }}>
              Eliminar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
