import React from 'react';
import { UIButton } from '../../components/ui-kit';
import { ContratoplantillaContratoplantilladialogResponse } from '../../dto/ContratoplantillaContratoplantilladialogDto';

interface ContratoplantillaContratoplantilladialogDetailProps {
  item: ContratoplantillaContratoplantilladialogResponse;
  onEdit?: (item?: ContratoplantillaContratoplantilladialogResponse) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

/**
 * Componente Detalle: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Muestra todos los campos de una plantilla de contrato en vista de detalle.
 */
export const ContratoplantillaContratoplantilladialogDetail: React.FC<ContratoplantillaContratoplantilladialogDetailProps> = ({
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
    if (typeof value === 'string' && value.includes('T')) {
      // Intenta parsear como fecha
      try {
        return new Date(value).toLocaleDateString('es-ES');
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  return (
    <div data-testid="contratoplantilla-contratoplantilladialog-detail">
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, marginBottom: '0.25rem' }}>Plantilla de Contrato</h2>
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
            <div style={labelStyle}>Descripción</div>
            <span style={valueStyle}>{item.descripcion}</span>
          </div>
        </div>
      </div>

      {/* Información de Archivos */}
      {(item.nombreArchivo || item.nombreArchivo2) && (
        <div style={fieldGroupStyle}>
          <div style={fieldGroupTitleStyle}>Archivos</div>
          <div style={gridStyle}>
            {item.nombreArchivo && (
              <div style={fieldStyle}>
                <div style={labelStyle}>Archivo Principal</div>
                <span style={valueStyle}>{item.nombreArchivo}</span>
              </div>
            )}
            {item.nombreArchivo2 && (
              <div style={fieldStyle}>
                <div style={labelStyle}>Archivo Secundario</div>
                <span style={valueStyle}>{item.nombreArchivo2}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información de Auditoría */}
      <div style={fieldGroupStyle}>
        <div style={fieldGroupTitleStyle}>Auditoría</div>
        <div style={gridStyle}>
          {item.usuarioIngreso && (
            <div style={fieldStyle}>
              <div style={labelStyle}>Usuario Ingreso</div>
              <span style={valueStyle}>{item.usuarioIngreso}</span>
            </div>
          )}
          {item.fechaIngreso && (
            <div style={fieldStyle}>
              <div style={labelStyle}>Fecha Ingreso</div>
              <span style={valueStyle}>{renderValue(item.fechaIngreso)}</span>
            </div>
          )}
          {item.usuarioModificacion && (
            <div style={fieldStyle}>
              <div style={labelStyle}>Usuario Modificación</div>
              <span style={valueStyle}>{item.usuarioModificacion}</span>
            </div>
          )}
          {item.fechaModificacion && (
            <div style={fieldStyle}>
              <div style={labelStyle}>Fecha Modificación</div>
              <span style={valueStyle}>{renderValue(item.fechaModificacion)}</span>
            </div>
          )}
        </div>
      </div>

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
