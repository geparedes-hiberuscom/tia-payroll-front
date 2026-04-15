import React from 'react';
import { StatCard, formatNumberLabel } from '@shared/index';
import { Rubrosxprocesodialog } from '@modules/rubros/domain/model/Rubrosxprocesodialog';

interface RubrosxprocesodialogStatsProps {
  items: Rubrosxprocesodialog[];
  totalElements: number;
}

export const RubrosxprocesodialogStats: React.FC<RubrosxprocesodialogStatsProps> = ({
  items,
  totalElements,
}) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard label="Asignaciones visibles" value={formatNumberLabel(totalElements)} />
      <StatCard
        label="Activas"
        value={formatNumberLabel(items.filter((item) => item.activo).length)}
        tone="emerald"
      />
      <StatCard
        label="Inactivas"
        value={formatNumberLabel(items.filter((item) => item.activo === false).length)}
        tone="amber"
      />
    </section>
  );
};
