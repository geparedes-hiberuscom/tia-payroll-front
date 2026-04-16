import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { PlantillacontablePlantillacontabledialogResponse } from '../../dto/PlantillacontablePlantillacontabledialogDto';

interface PlantillacontablePlantillacontabledialogCardProps {
  item: PlantillacontablePlantillacontabledialogResponse;
  onSelect?: (item: PlantillacontablePlantillacontabledialogResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: PlantillacontablePlantillacontabledialogResponse) => void;
}

/**
 * Componente Card: plantillaContable.zul / plantillaContableDialog.zul
 * Muestra un resumen individual de una plantilla contable.
 * Nota: Usado principalmente si se requiere vista de cards (se prefiere tabla).
 */
export const PlantillacontablePlantillacontabledialogCard: React.FC<PlantillacontablePlantillacontabledialogCardProps> = ({
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
      data-testid={`plantillacontable-plantillacontabledialog-card-${item.id}`}
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
            Cuenta: <strong>{item.cuenta}</strong>
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={fieldStyle}>
          <span style={labelStyle}>Proceso</span>
          <span style={valueStyle}>{item.procesoNombre || `ID: ${item.procesoId}`}</span>
        </div>

        <div style={fieldStyle}>
          <span style={labelStyle}>Rubro</span>
          <span style={valueStyle}>{item.rubroNombre || item.rubroId}</span>
        </div>

        <div style={fieldStyle}>
          <span style={labelStyle}>Debe/Haber</span>
          <span style={{ ...valueStyle, color: item.debeHaber === 'D' ? '#d97706' : '#059669', fontWeight: 700 }}>
            {item.debeHaber === 'D' ? 'DEBE' : 'HABER'}
          </span>
        </div>

        <div style={fieldStyle}>
          <span style={labelStyle}>Subcuenta</span>
          <span style={valueStyle}>{item.subcuenta || '—'}</span>
        </div>

        {item.auxiliar && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Auxiliar</span>
            <span style={valueStyle}>{item.auxiliar}</span>
          </div>
        )}

        {item.dimensionNombre && (
          <div style={fieldStyle}>
            <span style={labelStyle}>Dimensión</span>
            <span style={valueStyle}>{item.dimensionNombre}</span>
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
