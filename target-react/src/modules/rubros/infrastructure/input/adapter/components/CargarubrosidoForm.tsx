import React, { useEffect, useState } from 'react';
import { Cargarubrosido, CreateCargarubrosido, UpdateCargarubrosido } from '../../../../domain/model/Cargarubrosido';

interface CargarubrosidoFormProps {
  initialData?: Cargarubrosido;
  onSubmit: (data: CreateCargarubrosido | UpdateCargarubrosido) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const CargarubrosidoForm: React.FC<CargarubrosidoFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [empresaId, setEmpresaId] = useState('');
  const [rubroId, setRubroId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!initialData) return;
    setEmpresaId(initialData.empresaId ? String(initialData.empresaId) : '');
    setDescripcion(initialData.descripcion ?? '');
    setEstado(initialData.estado ?? '');
  }, [initialData]);

  const validate = (): string[] => {
    const next: string[] = [];
    if (!isEditMode && !archivo) next.push('Debe seleccionar un archivo.');
    if (!isEditMode && (!empresaId || Number.isNaN(Number(empresaId)))) next.push('Empresa ID es obligatorio y numérico.');
    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;

    if (isEditMode) {
      onSubmit({
        estado: estado.trim() || undefined,
        descripcion: descripcion.trim() || undefined,
      });
      return;
    }

    onSubmit({
      archivo: archivo as File,
      empresaId: Number(empresaId),
      rubroId: rubroId.trim() || undefined,
      descripcion: descripcion.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="cargarubrosido-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar carga masiva' : 'Nueva carga masiva'}</h3>
      {errors.length > 0 && (
        <ul data-testid="cargarubrosido-form-errors" style={{ color: '#b91c1c', margin: 0 }}>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      )}

      {!isEditMode && (
        <label>
          Archivo
          <input data-testid="cargarubrosido-field-archivo" type="file" onChange={(e) => setArchivo(e.target.files?.[0] ?? null)} disabled={loading} />
        </label>
      )}

      {!isEditMode && (
        <label>
          Empresa ID
          <input data-testid="cargarubrosido-field-empresaid" value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} disabled={loading} required />
        </label>
      )}

      {!isEditMode && (
        <label>
          Rubro ID
          <input data-testid="cargarubrosido-field-rubroid" value={rubroId} onChange={(e) => setRubroId(e.target.value)} disabled={loading} />
        </label>
      )}

      <label>
        Descripcion
        <input data-testid="cargarubrosido-field-descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={loading} />
      </label>

      {isEditMode && (
        <label>
          Estado
          <input data-testid="cargarubrosido-field-estado" value={estado} onChange={(e) => setEstado(e.target.value)} disabled={loading} />
        </label>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="cargarubrosido-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="cargarubrosido-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </form>
  );
};
