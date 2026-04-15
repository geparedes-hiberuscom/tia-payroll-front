import React from 'react';
import {
  Loading,
  SectionCard,
  StatCard,
  Table,
  formatDateLabel,
  formatNumberLabel,
  formatShortDate,
  renderStatusBadge,
} from '@shared/index';
import { Cargarubrosido, CargarubrosidoLinea } from '../../../../domain/model/Cargarubrosido';

interface CargarubrosidoDetailProps {
  selectedCarga: Cargarubrosido | null;
  lineas: CargarubrosidoLinea[];
  loading: boolean;
}

export const CargarubrosidoDetail: React.FC<CargarubrosidoDetailProps> = ({
  selectedCarga,
  lineas,
  loading,
}) => {
  if (!selectedCarga) {
    return (
      <SectionCard title="Detalle no disponible" description="Seleccione una carga desde el histórico para revisar sus líneas.">
        <p className="text-sm text-slate-500">Aún no hay una cabecera seleccionada para inspección.</p>
      </SectionCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.6fr]">
      <SectionCard title="Cabecera seleccionada" description="Resumen operativo de la carga activa y sus métricas de validación.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <StatCard label="Archivo" value={selectedCarga.nombreArchivo || 'Sin nombre'} />
          <StatCard label="Estado" value={selectedCarga.estado || 'Sin estado'} tone="amber" />
          <StatCard label="Registros exitosos" value={formatNumberLabel(selectedCarga.numeroExitosos)} tone="emerald" />
          <StatCard label="Registros con error" value={formatNumberLabel(selectedCarga.numeroErrores)} tone="rose" />
        </div>

        <dl className="mt-5 grid gap-3 text-sm text-slate-600">
          <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="font-medium text-slate-700">Empresa</dt>
            <dd className="text-right">{selectedCarga.empresaId || 'No disponible'}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="font-medium text-slate-700">Rubro</dt>
            <dd className="text-right">{selectedCarga.rubroId || selectedCarga.vidrubro || 'No asociado'}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="font-medium text-slate-700">Fecha aplicación</dt>
            <dd className="text-right">{formatDateLabel(selectedCarga.fechaAplica || selectedCarga.dfechaaplica)}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="font-medium text-slate-700">Usuario</dt>
            <dd className="text-right">{selectedCarga.usuarioCarga || selectedCarga.usuarioIngreso || 'No disponible'}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
            <dt className="font-medium text-slate-700">Descripción</dt>
            <dd className="text-right">{selectedCarga.descripcion || 'Sin observaciones'}</dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard title="Líneas procesadas" description="Vista rápida de las líneas más recientes para análisis de errores y consistencia de datos.">
        {loading && lineas.length === 0 ? <Loading message="Cargando líneas de la carga seleccionada..." /> : null}
        <Table
          items={lineas}
          loading={loading}
          showPagination={false}
          getRowKey={(item, index) => item.lineaId ?? `${item.rubroId}-${index}`}
          columns={[
            { key: 'cedula', header: 'Colaborador', render: (item) => item.vcedula || String(item.colaboradorId ?? '') },
            { key: 'rubro', header: 'Rubro', render: (item) => item.rubroId || item.vidrubro },
            { key: 'desde', header: 'Desde', render: (item) => formatShortDate(item.dfdesde) || '-' },
            { key: 'hasta', header: 'Hasta', render: (item) => formatShortDate(item.dfhasta) || '-' },
            {
              key: 'valor1',
              header: 'Valor 1',
              align: 'right' as const,
              render: (item) => formatNumberLabel(item.mvalor01 ?? item.valor),
            },
            { key: 'valor2', header: 'Valor 2', align: 'right' as const, render: (item) => formatNumberLabel(item.mvalor02) },
            { key: 'estado', header: 'Estado', render: (item) => renderStatusBadge(item.estado) },
            { key: 'mensaje', header: 'Mensaje', render: (item) => item.mensaje || 'Sin novedades' },
          ]}
        />
      </SectionCard>
    </div>
  );
};
