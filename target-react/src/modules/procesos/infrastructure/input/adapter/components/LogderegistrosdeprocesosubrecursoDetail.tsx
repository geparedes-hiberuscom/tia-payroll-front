import React from 'react';
import { Logderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';

interface LogderegistrosdeprocesosubrecursoDetailProps {
  item: Logderegistrosdeprocesosubrecurso;
  onEdit?: (item: Logderegistrosdeprocesosubrecurso) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

export const LogderegistrosdeprocesosubrecursoDetail: React.FC<LogderegistrosdeprocesosubrecursoDetailProps> = ({ item, onEdit, onDelete, onBack }) => {
  return (
    <section className="card" data-testid="logderegistrosdeprocesosubrecurso-detail">
      <h2 style={{ marginTop: 0 }}>Detalle Logderegistrosdeprocesosubrecurso</h2>
      <dl>
        {Object.entries(item).map(([key, value]) => (
          <div key={key}>
            <dt><strong>{key}</strong></dt>
            <dd>{String(value ?? '')}</dd>
          </div>
        ))}
      </dl>
      <div className="form-actions">
        {onEdit && <button type="button" className="btn btn-primary" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && <button type="button" className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button>}
        {onBack && <button type="button" className="btn btn-secondary" onClick={onBack}>Volver</button>}
      </div>
    </section>
  );
};
