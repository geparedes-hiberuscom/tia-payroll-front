import React from 'react';
import { Logderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';

interface LogderegistrosdeprocesosubrecursoCardProps {
  item: Logderegistrosdeprocesosubrecurso;
  onSelect?: (item: Logderegistrosdeprocesosubrecurso) => void;
  onEdit?: (item: Logderegistrosdeprocesosubrecurso) => void;
  onDelete?: (id: string) => void;
}

export const LogderegistrosdeprocesosubrecursoCard: React.FC<LogderegistrosdeprocesosubrecursoCardProps> = ({ item, onSelect, onEdit, onDelete }) => {
  const fields = Object.entries(item).filter(([key]) => key !== 'id');

  return (
    <article className="card" data-testid="logderegistrosdeprocesosubrecurso-card">
      <h3 style={{ marginTop: 0 }}>Logderegistrosdeprocesosubrecurso</h3>
      <p><strong>ID:</strong> {item.id}</p>
      {fields.length > 0 ? (
        <dl>
          {fields.map(([key, value]) => (
            <div key={key}>
              <dt><strong>{key}</strong></dt>
              <dd>{String(value ?? '')}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-muted">Sin campos adicionales definidos en el modelo.</p>
      )}
      <div className="form-actions">
        {onSelect && <button type="button" className="btn btn-secondary" onClick={() => onSelect(item)}>Ver detalle</button>}
        {onEdit && <button type="button" className="btn btn-primary" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && <button type="button" className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button>}
      </div>
    </article>
  );
};
