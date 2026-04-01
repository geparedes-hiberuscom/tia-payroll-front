import React from 'react';
import { RubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';
import { RubrosidomainRubrosidolistRubrosidodetailCard } from './RubrosidomainRubrosidolistRubrosidodetailCard';

interface RubrosidomainRubrosidolistRubrosidodetailListProps {
  items: RubrosidomainRubrosidolistRubrosidodetail[];
  loading?: boolean;
  onSelect?: (item: RubrosidomainRubrosidolistRubrosidodetail) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: RubrosidomainRubrosidolistRubrosidodetail) => void;
}

export const RubrosidomainRubrosidolistRubrosidodetailList: React.FC<RubrosidomainRubrosidolistRubrosidodetailListProps> = ({ items, loading, onSelect, onDelete, onEdit }) => {
  if (loading) return <div data-testid="rubrosidomain-list-loading">Cargando lista...</div>;
  if (items.length === 0) return <p data-testid="rubrosidomain-list-empty">No se encontraron registros.</p>;
  return (
    <section data-testid="rubrosidomain-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => <RubrosidomainRubrosidolistRubrosidodetailCard key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} onEdit={onEdit} />)}
    </section>
  );
};
