import React from 'react';
import { ProcesosejecucionProcesosejecdialog } from '../../../../domain/model/ProcesosejecucionProcesosejecdialog';
import { ProcesosejecucionProcesosejecdialogCard } from './ProcesosejecucionProcesosejecdialogCard';

interface ProcesosejecucionProcesosejecdialogListProps {
  items: ProcesosejecucionProcesosejecdialog[];
  loading?: boolean;
  onSelect?: (item: ProcesosejecucionProcesosejecdialog) => void;
  onEdit?: (item: ProcesosejecucionProcesosejecdialog) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejecucionProcesosejecdialogList: React.FC<ProcesosejecucionProcesosejecdialogListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="procesosejecucion-procesosejecdialog-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="procesosejecucion-procesosejecdialog-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="procesosejecucion-procesosejecdialog-list" className="layout-grid">
      {items.map((item) => (
        <ProcesosejecucionProcesosejecdialogCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
