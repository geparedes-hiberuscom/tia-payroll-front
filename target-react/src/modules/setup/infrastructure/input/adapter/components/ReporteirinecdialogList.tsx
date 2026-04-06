import React from 'react';
import { Reporteirinecdialog } from '../../../../domain/model/Reporteirinecdialog';
import { ReporteirinecdialogCard } from './ReporteirinecdialogCard';

interface ReporteirinecdialogListProps {
  items: Reporteirinecdialog[];
  loading?: boolean;
  onSelect?: (item: Reporteirinecdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Reporteirinecdialog) => void;
}

/**
 * Componente Lista: ReporteIRINECDialog.zul
 * Renderiza una lista de elementos usando ReporteirinecdialogCard.
 * Pantallas fuente: ReporteIRINECDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const ReporteirinecdialogList: React.FC<ReporteirinecdialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div>Cargando lista...</div>;
  }

  if (items.length === 0) {
    return <p>No se encontraron elementos.</p>;
  }

  return (
    <div data-testid="reporteirinecdialog-list">
      {items.map((item) => (
        <ReporteirinecdialogCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
