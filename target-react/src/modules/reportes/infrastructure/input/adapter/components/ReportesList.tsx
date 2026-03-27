import React from 'react';
import { Reportes } from '../../../../domain/model/Reportes';

interface ReportesListProps {
  items: Reportes[];
  onDelete?: (id: string) => void;
}

export const ReportesList: React.FC<ReportesListProps> = ({ items, onDelete }) => {
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
