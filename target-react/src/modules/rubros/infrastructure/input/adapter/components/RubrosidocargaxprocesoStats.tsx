import React from 'react';
import { StatCard, formatNumberLabel } from '@shared/index';
import { Rubrosidocargaxproceso } from '@modules/rubros/domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoStatsProps {
  items: Rubrosidocargaxproceso[];
  totalElements: number;
}

export const RubrosidocargaxprocesoStats: React.FC<RubrosidocargaxprocesoStatsProps> = ({
  items,
  totalElements,
}) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard label="Ejecuciones visibles" value={formatNumberLabel(totalElements)} />
      <StatCard
        label="Registros cargados"
        value={formatNumberLabel(items.reduce((acc, item) => acc + (item.numeroRegistrosCargados ?? 0), 0))}
        tone="emerald"
      />
      <StatCard
        label="Errores acumulados"
        value={formatNumberLabel(items.reduce((acc, item) => acc + (item.numeroErrores ?? 0), 0))}
        tone="rose"
      />
    </section>
  );
};
