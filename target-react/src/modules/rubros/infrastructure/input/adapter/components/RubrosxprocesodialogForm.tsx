import React, { useEffect, useState } from 'react';
import { CreateRubrosxprocesodialog, Rubrosxprocesodialog, UpdateRubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';

interface RubrosxprocesodialogFormProps {
  initialData?: Rubrosxprocesodialog;
  onSubmit: (data: CreateRubrosxprocesodialog | UpdateRubrosxprocesodialog) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const RubrosxprocesodialogForm: React.FC<RubrosxprocesodialogFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [rubroId, setRubroId] = useState('');
  const [procesoId, setProcesoId] = useState('');
  const [secuencia, setSecuencia] = useState('');
  const [frecuenciaEjecucion, setFrecuenciaEjecucion] = useState('');
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (!initialData) return;
    setRubroId(initialData.rubroId);
    setProcesoId(String(initialData.procesoId));
    setSecuencia(initialData.secuencia ? String(initialData.secuencia) : '');
    setFrecuenciaEjecucion(initialData.frecuenciaEjecucion ?? '');
    setActivo(Boolean(initialData.activo));
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditMode) {
      onSubmit({
        secuencia: secuencia ? Number(secuencia) : undefined,
        frecuenciaEjecucion: frecuenciaEjecucion.trim() || undefined,
        activo,
      });
      return;
    }
    onSubmit({
      rubroId: rubroId.trim(),
      procesoId: Number(procesoId),
      secuencia: secuencia ? Number(secuencia) : undefined,
      frecuenciaEjecucion: frecuenciaEjecucion.trim() || undefined,
      activo,
    });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="rubrosxprocesodialog-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar asignación' : 'Nueva asignación'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro ID<input data-testid="rubrosxprocesodialog-field-rubroid" value={rubroId} onChange={(e) => setRubroId(e.target.value)} disabled={loading} required /></label>
          <label>Proceso ID<input data-testid="rubrosxprocesodialog-field-procesoid" value={procesoId} onChange={(e) => setProcesoId(e.target.value)} disabled={loading} required /></label>
        </>
      )}
      <label>Secuencia<input data-testid="rubrosxprocesodialog-field-secuencia" value={secuencia} onChange={(e) => setSecuencia(e.target.value)} disabled={loading} /></label>
      <label>Frecuencia<input data-testid="rubrosxprocesodialog-field-frecuencia" value={frecuenciaEjecucion} onChange={(e) => setFrecuenciaEjecucion(e.target.value)} disabled={loading} /></label>
      <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input data-testid="rubrosxprocesodialog-field-activo" type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} disabled={loading} />
        Activo
      </label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosxprocesodialog-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosxprocesodialog-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </form>
  );
};
