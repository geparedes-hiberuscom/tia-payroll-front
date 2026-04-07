import React, { PropsWithChildren } from 'react';
import { ParametrosParametrosdialogResponse } from '../../dto/ParametrosParametrosdialogDto';

interface ParametrosParametrosdialogCardProps {
  item: ParametrosParametrosdialogResponse;
  onSelect?: (item: ParametrosParametrosdialogResponse) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ParametrosParametrosdialogResponse) => void;
}

const CardContent: React.FC<{ item: ParametrosParametrosdialogResponse; onEdit?: (item: ParametrosParametrosdialogResponse) => void; onDelete?: (id: string) => void }> = ({ item, onEdit, onDelete }) => (
  <>
    <div>
      <strong>{item.parametro}</strong>
      <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#666' }}>
        {item.entorno} / {item.idParametro}
      </p>
      {item.datoCadena && <span style={{ color: '#888' }}>Texto: {item.datoCadena}</span>}
    </div>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
          type="button"
        >
          Editar
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(`${item.entorno}:${item.idParametro}`)}
          type="button"
          style={{ color: 'red' }}
        >
          Eliminar
        </button>
      )}
    </div>
  </>
);

const containerStyle = {
  padding: '1rem',
  borderBottom: '1px solid #eee',
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
};

const buttonStyle = {
  padding: '1rem',
  borderBottom: '1px solid #eee',
  display: 'flex' as const,
  justifyContent: 'space-between' as const,
  alignItems: 'center' as const,
  cursor: 'pointer' as const,
  width: '100%',
  border: 'none',
  backgroundColor: 'transparent',
  textAlign: 'left' as const,
};

export const ParametrosParametrosdialogCard: React.FC<PropsWithChildren<ParametrosParametrosdialogCardProps>> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (onSelect) {
    return (
      <button
        type="button"
        data-testid={`parametros-parametrosdialog-card-${item.entorno}-${item.idParametro}`}
        onClick={() => onSelect(item)}
        style={buttonStyle}
      >
        <CardContent item={item} onEdit={onEdit} onDelete={onDelete} />
      </button>
    );
  }

  return (
    <div
      data-testid={`parametros-parametrosdialog-card-${item.entorno}-${item.idParametro}`}
      style={containerStyle}
    >
      <CardContent item={item} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
