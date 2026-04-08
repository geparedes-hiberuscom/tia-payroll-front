import React from 'react';
import { PlantillacontablePlantillacontabledialogResponse } from '../../dto/PlantillacontablePlantillacontabledialogDto';

interface PlantillacontablePlantillacontabledialogDetailProps {
  item: PlantillacontablePlantillacontabledialogResponse;
  onEdit?: (item?: PlantillacontablePlantillacontabledialogResponse) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: plantillaContable.zul / plantillaContableDialog.zul
 * Muestra todos los campos de una plantilla contable en vista de detalle.
 */
export const PlantillacontablePlantillacontabledialogDetail: React.FC<PlantillacontablePlantillacontabledialogDetailProps> = ({
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
    <div data-testid="plantillacontable-plantillacontabledialog-detail">
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, marginBottom: '0.25rem' }}>Plantilla Contable</h2>
          <div style={{ fontSize: '0.95rem', color: '#666' }}>
            ID <code style={{ backgroundColor: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: 3 }}>{item.id}</code>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6C5C51',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5A4C42';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6C5C51';
              }}
            >
              ← Volver
            </button>
          )}
        </div>
      </div>

      {/* Información Principal */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Información Principal</div>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Proceso</div>
            <span style={valueStyle}>{item.procesoNombre || `ID: ${item.procesoId}`}</span>
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

      {/* Información de Distribución */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Distribución</div>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Distribución de Costo</div>
            <span style={valueStyle}>{renderValue(item.distribucionCosto)}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>RPT</div>
            <span style={valueStyle}>{renderValue(item.rpt)}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Centro de Costo (TC/DM)</div>
            <span style={valueStyle}>{renderValue(item.tcDmCentroCosto)}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Localidad (TC/DM)</div>
            <span style={valueStyle}>{renderValue(item.tcDmLocalidad)}</span>
          </div>
        </div>
      </div>

      {/* Agrupaciones */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Agrupaciones</div>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Agrupación Centro de Costo</div>
            <span style={valueStyle}>{renderValue(item.agrupacionCC)}</span>
          </div>
          <div style={fieldStyle}>
            <div style={labelStyle}>Agrupación Localidad</div>
            <span style={valueStyle}>{renderValue(item.agrupacionLoc)}</span>
          </div>
        </div>
      </div>

      {/* Dimensión */}
      {(item.dimensionId || item.dimensionNombre) && (
        <div style={fieldGroupStyle}>
          <div style={fieldGroupTitleStyle}>Dimensión</div>
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <div style={labelStyle}>Dimensión ID</div>
              <span style={valueStyle}>{item.dimensionId}</span>
            </div>
            <div style={fieldStyle}>
              <div style={labelStyle}>Dimensión Nombre</div>
              <span style={valueStyle}>{renderValue(item.dimensionNombre)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        {onEdit && (
          <button
            onClick={() => onEdit(item)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#B1CBD5',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7B8D95';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#B1CBD5';
            }}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#6C5C51',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5A4C42';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6C5C51';
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
