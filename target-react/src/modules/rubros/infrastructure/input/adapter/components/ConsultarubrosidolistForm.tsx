import React, { useEffect, useState } from 'react';
import { Consultarubrosidolist, CreateConsultarubrosidolist, UpdateConsultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';

interface ConsultarubrosidolistFormProps {
  initialData?: Consultarubrosidolist;
  onSubmit: (data: CreateConsultarubrosidolist | UpdateConsultarubrosidolist) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ConsultarubrosidolistForm: React.FC<ConsultarubrosidolistFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [rubroId, setRubroId] = useState('');
  const [colaboradorId, setColaboradorId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  useEffect(() => {
    if (!initialData) return;
    setRubroId(initialData.rubroId);
    setColaboradorId(String(initialData.colaboradorId));
    setEmpresaId(initialData.empresaId ? String(initialData.empresaId) : '');
    setEstado(initialData.estado ?? '');
    setFechaDesde(initialData.fechaDesde ?? '');
    setFechaHasta(initialData.fechaHasta ?? '');
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditMode) {
      onSubmit({ estado: estado.trim() || undefined });
      return;
    }

    onSubmit({
      rubroId: rubroId.trim() || undefined,
      colaboradorId: colaboradorId ? Number(colaboradorId) : undefined,
      empresaId: empresaId ? Number(empresaId) : undefined,
      estado: estado.trim() || undefined,
      fechaDesde: fechaDesde || undefined,
      fechaHasta: fechaHasta || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="consultarubrosidolist-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar consulta' : 'Nueva consulta'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro ID<input data-testid="consultarubrosidolist-field-rubroid" value={rubroId} onChange={(e) => setRubroId(e.target.value)} disabled={loading} /></label>
          <label>Colaborador ID<input data-testid="consultarubrosidolist-field-colaboradorid" value={colaboradorId} onChange={(e) => setColaboradorId(e.target.value)} disabled={loading} /></label>
          <label>Empresa ID<input data-testid="consultarubrosidolist-field-empresaid" value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} disabled={loading} /></label>
          <label>Fecha Desde<input data-testid="consultarubrosidolist-field-fechadesde" type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} disabled={loading} /></label>
          <label>Fecha Hasta<input data-testid="consultarubrosidolist-field-fechahasta" type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} disabled={loading} /></label>
        </>
      )}
      <label>Estado<input data-testid="consultarubrosidolist-field-estado" value={estado} onChange={(e) => setEstado(e.target.value)} disabled={loading} /></label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="consultarubrosidolist-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="consultarubrosidolist-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </form>
  );
};
