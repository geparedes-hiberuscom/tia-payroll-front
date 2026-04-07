import React from 'react';
import { ParametrosParametrosdialogResponse } from '../../dto/ParametrosParametrosdialogDto';

interface ParametrosParametrosdialogListProps {
  items: ParametrosParametrosdialogResponse[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (item: ParametrosParametrosdialogResponse) => void;
}

export const ParametrosParametrosdialogList: React.FC<ParametrosParametrosdialogListProps> = ({
  items,
  loading,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando lista...</div>;
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        No se encontraron parámetros.
      </div>
    );
  }

  return (
    <div data-testid="parametros-parametrosdialog-list" style={{ overflowX: 'auto' }}>
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
              ID Parámetro
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Nombre
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Entorno
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Valor
            </th>
            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${item.entorno}:${item.idParametro}`}
              style={{
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                const isEven = index % 2 === 0;
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = isEven ? '#fff' : '#f9fafb';
              }}
            >
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: 3 }}>
                  {item.idParametro}
                </code>
              </td>
              <td style={{ padding: '0.75rem', fontWeight: 500 }}>{item.parametro}</td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#666' }}>{item.entorno}</td>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.datoCadena || item.datoNumero || item.datoFechaInicio || '—'}
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                      data-testid={`edit-${item.entorno}-${item.idParametro}`}
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#B1CBD5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(`${item.entorno}:${item.idParametro}`);
                      }}
                      data-testid={`delete-${item.entorno}-${item.idParametro}`}
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#6C5C51',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
