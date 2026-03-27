import React from 'react';
import { Procesos } from '../../../../domain/model/Procesos';

interface ProcesosListProps {
  items: Procesos[];
  onDelete?: (id: string) => void;
}

export const ProcesosList: React.FC<ProcesosListProps> = ({ items, onDelete }) => {
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
