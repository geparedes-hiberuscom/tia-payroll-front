import React from 'react';
import { StatCard, formatNumberLabel } from '@shared/index';

interface ConsultarubrosidolistStatsProps {
  totalElements: number;
  enviados: number;
}

export const ConsultarubrosidolistStats: React.FC<ConsultarubrosidolistStatsProps> = ({
  totalElements,
  enviados,
}) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard label="Registros visibles" value={formatNumberLabel(totalElements)} />
      <StatCard label="Marcados para envío" value={formatNumberLabel(enviados)} tone="emerald" />
      <StatCard label="Pendientes de revisar" value={formatNumberLabel(totalElements - enviados)} tone="amber" />
    </section>
  );
};
