import React, { useMemo } from 'react';
import {
  SectionCard,
} from '@shared/index';
import { CargaProcesoFilterState } from '../hooks/rubrosidocargaxprocesoPage.types';
import { Rubrosidocargaxproceso } from '@modules/rubros/domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoListProps {
  items: Rubrosidocargaxproceso[];
  loading: boolean;
  filters: CargaProcesoFilterState;
  onFilterChange: <K extends keyof CargaProcesoFilterState>(field: K, value: CargaProcesoFilterState[K]) => void;
}

interface RubrosSeparadosPorTipo {
  ingresos: Rubrosidocargaxproceso[];
  descuentos: Rubrosidocargaxproceso[];
  otros: Rubrosidocargaxproceso[];
}

const RubroRow: React.FC<{ rubro: Rubrosidocargaxproceso }> = ({ rubro }) => (
  <tr className="border-b border-slate-200 hover:bg-slate-50">
    <td className="px-4 py-2 text-sm text-slate-900">{rubro.rubroId}</td>
    <td className="px-4 py-2 text-sm text-slate-700">{rubro.rubroNombre}</td>
    <td className="px-4 py-2 text-sm text-slate-700">{rubro.aplicacion || '-'}</td>
    <td className="px-4 py-2 text-right text-sm text-slate-900 font-mono">{rubro.valor1 || '-'}</td>
    <td className="px-4 py-2 text-right text-sm text-slate-900 font-mono">{rubro.valor2 || '-'}</td>
    <td className="px-4 py-2 text-sm">
      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
        {rubro.estado || 'Activo'}
      </span>
    </td>
    <td className="px-4 py-2 text-sm text-slate-600">{rubro.origen || '-'}</td>
  </tr>
);

const RubrosTable: React.FC<{
  titulo: string;
  rubros: Rubrosidocargaxproceso[];
  totalValor1?: number;
  totalValor2?: number;
}> = ({ titulo, rubros, totalValor1 = 0, totalValor2 = 0 }) => (
  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
      <h4 className="text-sm font-semibold text-slate-900">
        {titulo} ({rubros.length} rubro{rubros.length !== 1 ? 's' : ''})
      </h4>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th className="px-4 py-2 text-left font-semibold text-slate-700">Rubro</th>
          <th className="px-4 py-2 text-left font-semibold text-slate-700">Nombre</th>
          <th className="px-4 py-2 text-left font-semibold text-slate-700">Aplicación</th>
          <th className="px-4 py-2 text-right font-semibold text-slate-700">Valor 1</th>
          <th className="px-4 py-2 text-right font-semibold text-slate-700">Valor 2</th>
          <th className="px-4 py-2 text-left font-semibold text-slate-700">Estado</th>
          <th className="px-4 py-2 text-left font-semibold text-slate-700">Origen</th>
        </tr>
      </thead>
      <tbody>
        {rubros.map((rubro) => (
          <RubroRow key={`${rubro.id}-${rubro.rubroId}`} rubro={rubro} />
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-slate-100 border-t border-slate-300 font-semibold">
          <td colSpan={3} className="px-4 py-3 text-sm text-slate-900">
            Total
          </td>
          <td className="px-4 py-3 text-right text-sm text-slate-900 font-mono">
            {totalValor1.toLocaleString('es-ES')}
          </td>
          <td className="px-4 py-3 text-right text-sm text-slate-900 font-mono">
            {totalValor2.toLocaleString('es-ES')}
          </td>
          <td colSpan={2} className="px-4 py-3"></td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export const RubrosidocargaxprocesoList: React.FC<RubrosidocargaxprocesoListProps> = ({
  items,
  loading,
}) => {
  const rubrosSeparados = useMemo(() => {
    const resultado: RubrosSeparadosPorTipo = {
      ingresos: [],
      descuentos: [],
      otros: [],
    };

    items.forEach((rubro) => {
      if (rubro.efecto === 'ING') {
        resultado.ingresos.push(rubro);
      } else if (rubro.efecto === 'EGR') {
        resultado.descuentos.push(rubro);
      } else {
        resultado.otros.push(rubro);
      }
    });

    return resultado;
  }, [items]);

  const calcularTotales = (rubros: Rubrosidocargaxproceso[]) => {
    const totales = rubros.reduce(
      (acc, rubro) => ({
        valor1: acc.valor1 + (rubro.valor1 || 0),
        valor2: acc.valor2 + (rubro.valor2 || 0),
      }),
      { valor1: 0, valor2: 0 }
    );
    return totales;
  };

  const totalesING = calcularTotales(rubrosSeparados.ingresos);
  const totalesDESC = calcularTotales(rubrosSeparados.descuentos);
  const totalesOTROS = calcularTotales(rubrosSeparados.otros);

  if (loading) {
    return (
      <SectionCard title="Rubros cargados" description="Resultado de la consulta separado por tipo">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-3 h-4 w-32 rounded bg-slate-200" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-10 rounded bg-slate-100" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  if (items.length === 0) {
    return (
      <SectionCard title="Rubros cargados" description="Resultado de la consulta separado por tipo">
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <p className="text-sm text-slate-600">
            Realiza una búsqueda para visualizar los rubros cargados por proceso, período y colaborador
          </p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Rubros cargados" description="Resultado de la consulta separado por tipo">
      <div className="space-y-6">
        {/* Tabla de Ingresos */}
        {rubrosSeparados.ingresos.length > 0 && (
          <RubrosTable
            titulo="Ingresos"
            rubros={rubrosSeparados.ingresos}
            totalValor1={totalesING.valor1}
            totalValor2={totalesING.valor2}
          />
        )}

        {/* Tabla de Descuentos */}
        {rubrosSeparados.descuentos.length > 0 && (
          <RubrosTable
            titulo="Descuentos"
            rubros={rubrosSeparados.descuentos}
            totalValor1={totalesDESC.valor1}
            totalValor2={totalesDESC.valor2}
          />
        )}

        {/* Tabla de Otros */}
        {rubrosSeparados.otros.length > 0 && (
          <RubrosTable
            titulo="Otros"
            rubros={rubrosSeparados.otros}
            totalValor1={totalesOTROS.valor1}
            totalValor2={totalesOTROS.valor2}
          />
        )}

        {/* Resumen General */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-xs font-medium text-slate-600 mb-1">Total Ingresos</p>
              <p className="text-lg font-bold text-blue-600">{totalesING.valor1.toLocaleString('es-ES')}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-xs font-medium text-slate-600 mb-1">Total Descuentos</p>
              <p className="text-lg font-bold text-rose-600">{totalesDESC.valor1.toLocaleString('es-ES')}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-xs font-medium text-slate-600 mb-1">Total Otros</p>
              <p className="text-lg font-bold text-slate-600">{totalesOTROS.valor1.toLocaleString('es-ES')}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-xs font-medium text-slate-600 mb-1">Total General</p>
              <p className="text-lg font-bold text-slate-900">
                {(totalesING.valor1 + totalesDESC.valor1 + totalesOTROS.valor1).toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
