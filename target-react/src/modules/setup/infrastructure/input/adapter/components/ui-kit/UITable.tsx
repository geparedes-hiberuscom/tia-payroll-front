import React from 'react';
import { uiKitColors } from '../../styles/uiKitColors';
import { uiKitSizes } from '../../styles/uiKitSizes';

interface UITableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface UITableProps<T> {
  /**
   * Datos de la tabla
   */
  data: T[];

  /**
   * Definición de columnas
   */
  columns: UITableColumn<T>[];

  /**
   * Mostrar borde
   * @default true
   */
  bordered?: boolean;

  /**
   * Mostrar filas alternadas
   * @default true
   */
  striped?: boolean;

  /**
   * Efecto hover en filas
   * @default true
   */
  hoverable?: boolean;

  /**
   * Callback al hacer click en una fila
   */
  onRowClick?: (record: T, index: number) => void;

  /**
   * Mensaje cuando la tabla está vacía
   */
  emptyMessage?: string;

  /**
   * Clase CSS adicional
   */
  className?: string;

  /**
   * Estilos adicionales
   */
  style?: React.CSSProperties;

  /**
   * Mostrar numeración en filas
   * @default false
   */
  showRowNumber?: boolean;

  /**
   * Tamaño compacto
   * @default false
   */
  compact?: boolean;
}

/**
 * Componente UITable reutilizable
 * Tabla profesional con opciones de borde, striped, hover
 */
export const UITable = React.forwardRef<HTMLTableElement, UITableProps<any>>(
  (
    {
      data,
      columns,
      bordered = true,
      striped = true,
      hoverable = true,
      onRowClick,
      emptyMessage = 'No hay datos disponibles',
      className,
      style,
      showRowNumber = false,
      compact = false,
    },
    ref
  ) => {
    const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null);

    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'collapse',
      border: bordered ? `1px solid ${uiKitColors.borders.light}` : 'none',
      fontSize: compact
        ? uiKitSizes.typography.fontSize.sm
        : uiKitSizes.typography.fontSize.md,
      ...style,
    };

    const theadStyle: React.CSSProperties = {
      backgroundColor: uiKitColors.backgrounds.normal,
      borderBottom: `2px solid ${uiKitColors.primary.normal}`,
    };

    const thStyle: React.CSSProperties = {
      padding: compact ? '8px 12px' : '12px 16px',
      textAlign: 'left',
      fontWeight: uiKitSizes.typography.fontWeight.semibold,
      color: uiKitColors.primary.normal,
      fontSize: uiKitSizes.typography.fontSize.sm,
      borderRight: bordered ? `1px solid ${uiKitColors.borders.light}` : 'none',
    };

    // Determinar color de fondo de la fila
    const getRowBackgroundColor = (rowIndex: number): string => {
      if (hoveredRowIndex === rowIndex) {
        return uiKitColors.backgrounds.normal;
      }
      if (striped && rowIndex % 2 === 0) {
        return uiKitColors.neutral.white;
      }
      return uiKitColors.backgrounds.light;
    };

    const getTdStyle = (_colIndex: number, rowIndex: number): React.CSSProperties => ({
      padding: compact ? '8px 12px' : '12px 16px',
      borderRight: bordered ? `1px solid ${uiKitColors.borders.light}` : 'none',
      borderBottom: bordered ? `1px solid ${uiKitColors.borders.light}` : 'none',
      backgroundColor: getRowBackgroundColor(rowIndex),
      color: uiKitColors.neutral.gray800,
    });

    const emptyStyle: React.CSSProperties = {
      textAlign: 'center',
      padding: '32px 16px',
      color: uiKitColors.neutral.gray600,
      fontSize: uiKitSizes.typography.fontSize.md,
    };

    if (data.length === 0) {
      return (
        <div style={emptyStyle} className={className}>
          {emptyMessage}
        </div>
      );
    }

    return (
      <table ref={ref} style={tableStyle} className={className}>
        <thead style={theadStyle}>
          <tr>
            {showRowNumber && (
              <th style={{ ...thStyle, width: '50px', textAlign: 'center' }}>
                #
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  ...thStyle,
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, rowIndex) => (
            <tr
              key={`row-${rowIndex}-${String(columns[0]?.key)}`}
              style={{
                backgroundColor: getRowBackgroundColor(rowIndex),
                cursor: onRowClick ? 'pointer' : 'default',
                transition: uiKitSizes.transition.fast,
              }}
              onMouseEnter={() => hoverable && setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => hoverable && setHoveredRowIndex(null)}
              onClick={() => onRowClick?.(record, rowIndex)}
            >
              {showRowNumber && (
                <td
                  style={{
                    ...getTdStyle(0, rowIndex),
                    textAlign: 'center',
                    fontWeight: uiKitSizes.typography.fontWeight.medium,
                    color: uiKitColors.neutral.gray600,
                  }}
                >
                  {rowIndex + 1}
                </td>
              )}
              {columns.map((col, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${String(col.key)}`}
                  style={{
                    ...getTdStyle(colIndex, rowIndex),
                    textAlign: col.align || 'left',
                  }}
                >
                  {col.render
                    ? col.render(record[col.key], record, rowIndex)
                    : record[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

UITable.displayName = 'UITable';
