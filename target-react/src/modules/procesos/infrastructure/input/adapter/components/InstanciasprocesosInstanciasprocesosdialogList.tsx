import React from 'react';
import { InstanciasprocesosInstanciasprocesosdialog } from '../../../../domain/model/InstanciasprocesosInstanciasprocesosdialog';
import { InstanciasprocesosInstanciasprocesosdialogCard } from './InstanciasprocesosInstanciasprocesosdialogCard';

interface InstanciasprocesosInstanciasprocesosdialogListProps {
  items: InstanciasprocesosInstanciasprocesosdialog[];
  loading?: boolean;
  onSelect?: (item: InstanciasprocesosInstanciasprocesosdialog) => void;
  onEdit?: (item: InstanciasprocesosInstanciasprocesosdialog) => void;
  onDelete?: (id: string) => void;
}

export const InstanciasprocesosInstanciasprocesosdialogList: React.FC<InstanciasprocesosInstanciasprocesosdialogListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="instanciasprocesos-instanciasprocesosdialog-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="instanciasprocesos-instanciasprocesosdialog-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="instanciasprocesos-instanciasprocesosdialog-list" className="layout-grid">
      {items.map((item) => (
        <InstanciasprocesosInstanciasprocesosdialogCard
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
