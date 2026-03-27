import React from 'react';
import { Pago } from '../../../../domain/model/Pago';

interface PagoListProps {
  items: Pago[];
  onDelete?: (id: string) => void;
}

export const PagoList: React.FC<PagoListProps> = ({ items, onDelete }) => {
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
