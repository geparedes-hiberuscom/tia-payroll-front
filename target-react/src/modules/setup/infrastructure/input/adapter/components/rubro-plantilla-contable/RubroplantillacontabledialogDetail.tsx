import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { RubroplantillacontabledialogResponse } from '../../dto/RubroplantillacontabledialogDto';

interface RubroplantillacontabledialogDetailProps {
  item: RubroplantillacontabledialogResponse;
  onEdit?: (item?: RubroplantillacontabledialogResponse) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: rubroplantillaContableDialog.zul
 * Muestra todos los campos de un rubro de plantilla contable en vista de detalle.
 */
export const RubroplantillacontabledialogDetail: React.FC<RubroplantillacontabledialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e5e7eb',
  };

  const fieldGroupStyle = {
    marginBottom: '2rem',
  };

  const fieldGroupTitleStyle = {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#666',
    textTransform: 'uppercase' as const,
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e7eb',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#666',
  };

  const valueStyle = {
    fontSize: '0.95rem',
    color: '#333',
    fontWeight: 500,
  };

  const renderValue = (value: any) => {
    if (value === undefined || value === null) {
      return <span style={{ color: '#999', fontStyle: 'italic' }}>No especificado</span>;
    }
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    return String(value);
  };

  return (
    <div data-testid="rubroplantillacontabledialog-detail">
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, marginBottom: '0.25rem' }}>Rubro Plantilla Contable</h2>
          <div style={{ fontSize: '0.95rem', color: '#666' }}>
            ID <code style={{ backgroundColor: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: 3 }}>{item.id}</code>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onBack && (
            <UIButton
              variant="secondary"
              onClick={onBack}
            >
              ← Volver
            </UIButton>
          )}
        </div>
      </div>

      {/* Información Principal */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Información Principal</div>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Proceso</div>
            <span style={valueStyle}>{item.procesoId}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Rubro</div>
            <span style={valueStyle}>{item.rubroNombre || item.rubroId}</span>
          </div>
        </div>
      </div>

      {/* Información Contable */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Información Contable</div>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Cuenta</div>
            <span style={valueStyle}>{item.cuenta}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Debe / Haber</div>
            <span style={{ ...valueStyle, color: item.debeHaber === 'D' ? '#d97706' : '#059669', fontWeight: 700 }}>
              {item.debeHaber === 'D' ? 'DEBE' : 'HABER'}
            </span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Subcuenta</div>
            <span style={valueStyle}>{renderValue(item.subcuenta)}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Auxiliar</div>
            <span style={valueStyle}>{renderValue(item.auxiliar)}</span>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      {(item.distribucionCosto || item.dimensionId || item.dimensionNombre) && (
        <div style={fieldGroupStyle}>
          <div style={fieldGroupTitleStyle}>Información Adicional</div>
          <div style={gridStyle}>
            {item.distribucionCosto && (
              <div style={fieldStyle}>
                <div style={labelStyle}>Distribución de Costo</div>
                <span style={valueStyle}>{item.distribucionCosto}</span>
              </div>
            )}
            {(item.dimensionId || item.dimensionNombre) && (
              <>
                <div style={fieldStyle}>
                  <div style={labelStyle}>Dimensión ID</div>
                  <span style={valueStyle}>{item.dimensionId}</span>
                </div>
                <div style={fieldStyle}>
                  <div style={labelStyle}>Dimensión Nombre</div>
                  <span style={valueStyle}>{renderValue(item.dimensionNombre)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        {onEdit && (
          <UIButton
            variant="primary"
            onClick={() => onEdit(item)}
          >
            Editar
          </UIButton>
        )}
        {onDelete && (
          <UIButton
            variant="secondary"
            onClick={() => onDelete(item.id)}
          >
            Eliminar
          </UIButton>
        )}
      </div>
    </div>
  );
};
