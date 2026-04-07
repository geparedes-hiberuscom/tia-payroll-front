import React from 'react';
import { RubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';

interface RubrosRubrosdialogDetailProps {
  item: RubrosRubrosdialog;
  onEdit?: (item: RubrosRubrosdialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

const EFFECT_LABELS: Record<'ING' | 'EGR' | 'NA', string> = {
  ING: 'Ingreso',
  EGR: 'Egreso',
  NA: 'Ninguno',
};

const AMBITO_LABELS: Record<'NA' | 'IDO' | 'PTM', string> = {
  NA: 'No Aplica',
  IDO: 'Ingreso Deduccion Otros',
  PTM: 'Prestamos',
};

export const RubrosRubrosdialogDetail: React.FC<RubrosRubrosdialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  const efectoLabel = item.efecto ? EFFECT_LABELS[item.efecto] : 'N/A';
  const ambitoLabel = item.ambito ? AMBITO_LABELS[item.ambito] : 'N/A';

  return (
    <section data-testid="rubros-rubrosdialog-detail" style={{ maxWidth: 720 }}>
      <h2>Detalle de Rubro</h2>
      <dl>
        <dt>ID Rubro</dt><dd>{item.idRubro}</dd>
        <dt>Nombre</dt><dd>{item.nombre}</dd>
        <dt>Ambito</dt><dd>{ambitoLabel}</dd>
        <dt>Efecto</dt><dd>{efectoLabel}</dd>
        <dt>Observaciones</dt><dd>{item.observaciones ?? 'N/A'}</dd>
        <dt>Procedimiento</dt><dd>{item.procedimientoCalculo ?? 'N/A'}</dd>
        <dt>Rubro Historico</dt><dd>{item.rubroHistorico ? 'Si' : 'No'}</dd>
        <dt>Secuencia Impresion</dt><dd>{item.secuenciaImpresion ?? 'N/A'}</dd>
        <dt>Secuencia Sobregiro</dt><dd>{item.secuenciaSobregiro ?? 'N/A'}</dd>
        <dt>Aplica Interfaz</dt><dd>{item.aplicaInterfaz ? 'Si' : 'No'}</dd>
        <dt>Inserta En Lote</dt><dd>{item.insertaEnLote ? 'Si' : 'No'}</dd>
        <dt>Carta</dt><dd>{item.carta ?? 'N/A'}</dd>
        <dt>Antiguedad Minima</dt><dd>{item.antiguedadMinima ?? 'N/A'}</dd>
        <dt>Numero Aprobaciones</dt><dd>{item.numAprobaciones ?? 'N/A'}</dd>
        <dt>Numero Aprobaciones No Locales</dt><dd>{item.numAprobacionesNoLocales ?? 'N/A'}</dd>
        <dt>Plazo Maximo</dt><dd>{item.plazoMaximo ?? 'N/A'}</dd>
        <dt>Plazo Minimo</dt><dd>{item.plazoMinimo ?? 'N/A'}</dd>
        <dt>Monto Maximo</dt><dd>{item.montoMaximo ?? 'N/A'}</dd>
        <dt>Verifica Endeudamiento</dt><dd>{item.verificaEndeudamiento ? 'Si' : 'No'}</dd>
        <dt>Acumulable</dt><dd>{item.acumulable ? 'Si' : 'No'}</dd>
        <dt>Estado</dt><dd>{item.estado ?? 'N/A'}</dd>
        <dt>Usuario Creacion</dt><dd>{item.usuarioCreacion ?? 'N/A'}</dd>
        <dt>Fecha Creacion</dt><dd>{item.fechaCreacion ?? 'N/A'}</dd>
        <dt>Usuario Actualizacion</dt><dd>{item.usuarioActualizacion ?? 'N/A'}</dd>
        <dt>Fecha Actualizacion</dt><dd>{item.fechaActualizacion ?? 'N/A'}</dd>
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button type="button" data-testid="rubros-rubrosdialog-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && (
          <button type="button" data-testid="rubros-rubrosdialog-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.idRubro)}>
            Eliminar
          </button>
        )}
        {onBack && <button type="button" data-testid="rubros-rubrosdialog-detail-back" onClick={onBack}>Volver</button>}
      </div>
    </section>
  );
};
