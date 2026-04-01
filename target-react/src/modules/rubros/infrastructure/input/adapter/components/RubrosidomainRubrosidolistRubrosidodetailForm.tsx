import React, { useEffect, useState } from 'react';
import { CreateRubrosidomainRubrosidolistRubrosidodetail, RubrosidomainRubrosidolistRubrosidodetail, UpdateRubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';

interface RubrosidomainRubrosidolistRubrosidodetailFormProps {
  initialData?: RubrosidomainRubrosidolistRubrosidodetail;
  onSubmit: (data: CreateRubrosidomainRubrosidolistRubrosidodetail | UpdateRubrosidomainRubrosidolistRubrosidodetail) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const RubrosidomainRubrosidolistRubrosidodetailForm: React.FC<RubrosidomainRubrosidolistRubrosidodetailFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [rubroId, setRubroId] = useState('');
  const [colaboradorId, setColaboradorId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [tipoComportamiento, setTipoComportamiento] = useState('');
  const [valor01, setValor01] = useState('');
  const [valor02, setValor02] = useState('');
  const [valor03, setValor03] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  useEffect(() => {
    if (!initialData) return;
    setRubroId(initialData.rubroId);
    setColaboradorId(String(initialData.colaboradorId));
    setEmpresaId(String(initialData.empresaId));
    setTipoComportamiento(initialData.tipoComportamiento ? String(initialData.tipoComportamiento) : '');
    setValor01(initialData.valor01 ? String(initialData.valor01) : '');
    setValor02(initialData.valor02 ? String(initialData.valor02) : '');
    setValor03(initialData.valor03 ? String(initialData.valor03) : '');
    setEstado(initialData.estado ?? '');
    setFechaDesde(initialData.fechaDesde ?? '');
    setFechaHasta(initialData.fechaHasta ?? '');
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditMode) {
      onSubmit({
        tipoComportamiento: tipoComportamiento ? Number(tipoComportamiento) : undefined,
        valor01: valor01 ? Number(valor01) : undefined,
        valor02: valor02 ? Number(valor02) : undefined,
        valor03: valor03 ? Number(valor03) : undefined,
        estado: estado.trim() || undefined,
        fechaHasta: fechaHasta || undefined,
      });
      return;
    }

    onSubmit({
      rubroId: rubroId.trim(),
      colaboradorId: Number(colaboradorId),
      empresaId: Number(empresaId),
      tipoComportamiento: tipoComportamiento ? Number(tipoComportamiento) : undefined,
      valor01: valor01 ? Number(valor01) : undefined,
      valor02: valor02 ? Number(valor02) : undefined,
      valor03: valor03 ? Number(valor03) : undefined,
      estado: estado.trim() || undefined,
      fechaDesde: fechaDesde || undefined,
      fechaHasta: fechaHasta || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="rubrosidomain-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar rubro IDO' : 'Nuevo rubro IDO'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro ID<input data-testid="rubrosidomain-field-rubroid" value={rubroId} onChange={(e) => setRubroId(e.target.value)} disabled={loading} required /></label>
          <label>Colaborador ID<input data-testid="rubrosidomain-field-colaboradorid" value={colaboradorId} onChange={(e) => setColaboradorId(e.target.value)} disabled={loading} required /></label>
          <label>Empresa ID<input data-testid="rubrosidomain-field-empresaid" value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} disabled={loading} required /></label>
          <label>Fecha Desde<input data-testid="rubrosidomain-field-fechadesde" type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} disabled={loading} /></label>
        </>
      )}
      <label>Tipo Comportamiento<input data-testid="rubrosidomain-field-tipocomportamiento" value={tipoComportamiento} onChange={(e) => setTipoComportamiento(e.target.value)} disabled={loading} /></label>
      <label>Valor 01<input data-testid="rubrosidomain-field-valor01" value={valor01} onChange={(e) => setValor01(e.target.value)} disabled={loading} /></label>
      <label>Valor 02<input data-testid="rubrosidomain-field-valor02" value={valor02} onChange={(e) => setValor02(e.target.value)} disabled={loading} /></label>
      <label>Valor 03<input data-testid="rubrosidomain-field-valor03" value={valor03} onChange={(e) => setValor03(e.target.value)} disabled={loading} /></label>
      <label>Estado<input data-testid="rubrosidomain-field-estado" value={estado} onChange={(e) => setEstado(e.target.value)} disabled={loading} /></label>
      <label>Fecha Hasta<input data-testid="rubrosidomain-field-fechahasta" type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} disabled={loading} /></label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosidomain-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosidomain-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </form>
  );
};
