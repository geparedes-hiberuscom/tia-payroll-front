import React, { useEffect, useState } from 'react';
import { CreateRubrosidocargaxproceso, Rubrosidocargaxproceso, UpdateRubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoFormProps {
  initialData?: Rubrosidocargaxproceso;
  onSubmit: (data: CreateRubrosidocargaxproceso | UpdateRubrosidocargaxproceso) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const RubrosidocargaxprocesoForm: React.FC<RubrosidocargaxprocesoFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [empresaId, setEmpresaId] = useState('');
  const [rubroId, setRubroId] = useState('');
  const [procesoId, setProcesoId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [accion, setAccion] = useState('');
  const [fechaAplica, setFechaAplica] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    if (!initialData) return;
    setEmpresaId(String(initialData.empresaId));
    setProcesoId(initialData.procesoId);
    setDescripcion(initialData.descripcion ?? '');
    setEstado(initialData.estado);
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditMode) {
      onSubmit({ accion: accion.trim() || undefined, fechaAplica: fechaAplica || undefined, estado: estado.trim() || undefined });
      return;
    }
    onSubmit({ empresaId: Number(empresaId), rubroId: rubroId.trim(), procesoId: procesoId ? Number(procesoId) : undefined, descripcion: descripcion.trim() || undefined });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="rubrosidocargaxproceso-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar ejecución' : 'Nueva ejecución'}</h3>
      {!isEditMode && (
        <>
          <label>Empresa ID<input data-testid="rubrosidocargaxproceso-field-empresaid" value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} disabled={loading} required /></label>
          <label>Rubro ID<input data-testid="rubrosidocargaxproceso-field-rubroid" value={rubroId} onChange={(e) => setRubroId(e.target.value)} disabled={loading} required /></label>
          <label>Proceso ID<input data-testid="rubrosidocargaxproceso-field-procesoid" value={procesoId} onChange={(e) => setProcesoId(e.target.value)} disabled={loading} /></label>
          <label>Descripcion<input data-testid="rubrosidocargaxproceso-field-descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={loading} /></label>
        </>
      )}
      {isEditMode && (
        <>
          <label>Accion<input data-testid="rubrosidocargaxproceso-field-accion" value={accion} onChange={(e) => setAccion(e.target.value)} disabled={loading} /></label>
          <label>Fecha Aplica<input data-testid="rubrosidocargaxproceso-field-fechaaplica" type="date" value={fechaAplica} onChange={(e) => setFechaAplica(e.target.value)} disabled={loading} /></label>
          <label>Estado<input data-testid="rubrosidocargaxproceso-field-estado" value={estado} onChange={(e) => setEstado(e.target.value)} disabled={loading} /></label>
        </>
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosidocargaxproceso-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosidocargaxproceso-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </form>
  );
};
