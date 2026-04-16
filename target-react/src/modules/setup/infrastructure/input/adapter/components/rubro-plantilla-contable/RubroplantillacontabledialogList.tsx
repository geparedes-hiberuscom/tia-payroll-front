import React from 'react';
import { RubroplantillacontabledialogResponse } from '../../dto/RubroplantillacontabledialogDto';
import { UIButton } from '../../components/ui-kit';

interface RubroplantillacontabledialogListProps {
  items: RubroplantillacontabledialogResponse[];
  loading?: boolean;
  onSelect?: (item: RubroplantillacontabledialogResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: RubroplantillacontabledialogResponse) => void;
}

/**
 * Componente Lista: rubroplantillaContableDialog.zul
 * Renderiza una tabla de elementos con columnas reales del dominio.
 */
export const RubroplantillacontabledialogList: React.FC<RubroplantillacontabledialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando lista...</div>;
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        No se encontraron rubros de plantilla contable.
      </div>
    );
  }

  return (
    <div data-testid="rubroplantillacontabledialog-list" style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              ID
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Proceso
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Rubro
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Cuenta
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              D/H
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              style={{
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                transition: 'background-color 0.15s ease',
                cursor: onSelect ? 'pointer' : 'default',
              }}
              onClick={() => onSelect?.(item)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                const isEven = index % 2 === 0;
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = isEven ? '#fff' : '#f9fafb';
              }}
            >
              <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
                {item.id}
              </td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: 3 }}>
                  {item.procesoId}
                </code>
              </td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: 3 }}>
                  {item.rubroId}
                </code>
                {item.rubroNombre && <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.rubroNombre}</div>}
              </td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>
                {item.cuenta}
              </td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600, color: item.debeHaber === 'D' ? '#d97706' : '#059669' }}>
                {item.debeHaber}
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
