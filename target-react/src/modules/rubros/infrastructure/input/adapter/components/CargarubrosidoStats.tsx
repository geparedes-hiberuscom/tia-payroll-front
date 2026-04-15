import React from 'react';
import { StatCard, formatNumberLabel } from '@shared/index';

interface CargarubrosidoStatsProps {
  totalElements: number;
  totalRegistros: number;
  totalErrores: number;
}

export const CargarubrosidoStats: React.FC<CargarubrosidoStatsProps> = ({
  totalElements,
  totalRegistros,
  totalErrores,
}) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard label="Cargas visibles" value={formatNumberLabel(totalElements)} />
      <StatCard label="Registros procesados" value={formatNumberLabel(totalRegistros)} tone="emerald" />
      <StatCard label="Líneas con error" value={formatNumberLabel(totalErrores)} tone="rose" />
    </section>
  );
};
