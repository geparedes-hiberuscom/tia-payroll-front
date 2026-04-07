import React from 'react';
import { ProcesosejecucionreversionProcesosejecucionreversiondialog } from '../../../../domain/model/ProcesosejecucionreversionProcesosejecucionreversiondialog';
import { ProcesosejecucionreversionProcesosejecucionreversiondialogCard } from './ProcesosejecucionreversionProcesosejecucionreversiondialogCard';

interface ProcesosejecucionreversionProcesosejecucionreversiondialogListProps {
  items: ProcesosejecucionreversionProcesosejecucionreversiondialog[];
  loading?: boolean;
  onSelect?: (item: ProcesosejecucionreversionProcesosejecucionreversiondialog) => void;
  onEdit?: (item: ProcesosejecucionreversionProcesosejecucionreversiondialog) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejecucionreversionProcesosejecucionreversiondialogList: React.FC<ProcesosejecucionreversionProcesosejecucionreversiondialogListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="procesosejecucionreversion-procesosejecucionreversiondialog-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="procesosejecucionreversion-procesosejecucionreversiondialog-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="procesosejecucionreversion-procesosejecucionreversiondialog-list" className="layout-grid">
      {items.map((item) => (
        <ProcesosejecucionreversionProcesosejecucionreversiondialogCard
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
