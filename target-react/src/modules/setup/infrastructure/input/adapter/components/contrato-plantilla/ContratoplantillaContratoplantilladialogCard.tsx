import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { ContratoplantillaContratoplantilladialogResponse } from '../../dto/ContratoplantillaContratoplantilladialogDto';

interface ContratoplantillaContratoplantilladialogCardProps {
  item: ContratoplantillaContratoplantilladialogResponse;
  onSelect?: (item: ContratoplantillaContratoplantilladialogResponse) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ContratoplantillaContratoplantilladialogResponse) => void;
}

/**
 * Componente Card: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Muestra un resumen individual de una plantilla de contrato.
 * Nota: Usado principalmente si se requiere vista de cards (se prefiere tabla).
 */
export const ContratoplantillaContratoplantilladialogCard: React.FC<ContratoplantillaContratoplantilladialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  const cardStyle = {
    padding: '1rem',
    marginBottom: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease',
    cursor: onSelect ? 'pointer' : 'default',
  } as const;

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  };

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    margin: '0.75rem 0',
  };

  const fieldStyle = {
    fontSize: '0.875rem',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 600,
    color: '#666',
    fontSize: '0.75rem',
    marginBottom: '0.25rem',
    textTransform: 'uppercase' as const,
  };

  const valueStyle = {
    display: 'block',
    fontWeight: 500,
    color: '#333',
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && onSelect) {
      e.preventDefault();
      onSelect(item);
    }
  };

  return (
    <button
      data-testid={`contratoplantilla-contratoplantilladialog-card-${item.id}`}
      type="button"
      style={{ ...cardStyle, display: 'block', textAlign: 'left' as const, background: 'none', cursor: onSelect ? 'pointer' : 'default' }}
      onClick={() => onSelect?.(item)}
      onKeyDown={handleCardKeyDown}
      onMouseEnter={(e) => {
        if (onSelect) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onSelect) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={headerStyle}>
        <div>
          <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>
            ID: <code style={{ backgroundColor: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: 3 }}>{item.id}</code>
          </h4>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>
            Descripción: <strong>{item.descripcion}</strong>
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        {item.nombreArchivo && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Archivo Principal</span>
            <span style={valueStyle}>{item.nombreArchivo}</span>
          </div>
        )}

        {item.nombreArchivo2 && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Archivo Secundario</span>
            <span style={valueStyle}>{item.nombreArchivo2}</span>
          </div>
        )}

        {item.usuarioIngreso && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Usuario Ingreso</span>
            <span style={valueStyle}>{item.usuarioIngreso}</span>
          </div>
        )}

        {item.fechaIngreso && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Fecha Ingreso</span>
            <span style={valueStyle}>{new Date(item.fechaIngreso).toLocaleDateString('es-ES')}</span>
          </div>
        )}

        {item.usuarioModificacion && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Usuario Modificación</span>
            <span style={valueStyle}>{item.usuarioModificacion}</span>
          </div>
        )}

        {item.fechaModificacion && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Fecha Modificación</span>
            <span style={valueStyle}>{new Date(item.fechaModificacion).toLocaleDateString('es-ES')}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        {onEdit && (
          <UIButton
            variant="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
          >
            Editar
          </UIButton>
        )}
        {onDelete && (
          <UIButton
            variant="secondary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Eliminar
          </UIButton>
        )}
      </div>
    </button>
  );
};
