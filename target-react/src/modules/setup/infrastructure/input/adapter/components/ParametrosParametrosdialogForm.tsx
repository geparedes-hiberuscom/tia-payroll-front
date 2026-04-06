import React, { useState, useEffect } from 'react';
import { CreateParametrosParametrosdialog, UpdateParametrosParametrosdialog, ParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';

interface ParametrosParametrosdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ParametrosParametrosdialog;
  onSubmit: (data: CreateParametrosParametrosdialog | UpdateParametrosParametrosdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * Componente Formulario: parametros.zul / parametrosDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: parametros.zul, parametrosDialog.zul
 * Renderers fuente: N/A
 *
 * TODO: Copilot — Completar con los campos reales del formulario (basarse en el domain model).
 */
export const ParametrosParametrosdialogForm: React.FC<ParametrosParametrosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditMode = !!initialData;
  const [entorno, setEntorno] = useState(initialData?.entorno || '');
  const [idParametro, setIdParametro] = useState(initialData?.idParametro || '');
  const [parametro, setParametro] = useState(initialData?.parametro || '');
  const [datoCadena, setDatoCadena] = useState(initialData?.datoCadena || '');
  const [datoCadena2, setDatoCadena2] = useState(initialData?.datoCadena2 || '');
  const [datoNumero, setDatoNumero] = useState(initialData?.datoNumero?.toString() || '');
  const [datoNumero2, setDatoNumero2] = useState(initialData?.datoNumero2?.toString() || '');
  const [datoFechaInicio, setDatoFechaInicio] = useState(
    initialData?.datoFechaInicio ? initialData.datoFechaInicio.toISOString().split('T')[0] : ''
  );
  const [datoFechaFin, setDatoFechaFin] = useState(
    initialData?.datoFechaFin ? initialData.datoFechaFin.toISOString().split('T')[0] : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entorno || !idParametro || !parametro) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    const data: CreateParametrosParametrosdialog | UpdateParametrosParametrosdialog = {
      entorno,
      idParametro,
      parametro,
      datoCadena: datoCadena || undefined,
      datoCadena2: datoCadena2 || undefined,
      datoNumero: datoNumero ? parseFloat(datoNumero) : undefined,
      datoNumero2: datoNumero2 ? parseFloat(datoNumero2) : undefined,
      datoFechaInicio: datoFechaInicio ? new Date(datoFechaInicio) : undefined,
      datoFechaFin: datoFechaFin ? new Date(datoFechaFin) : undefined,
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="parametros-parametrosdialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}
    >
      <h3>{isEditMode ? 'Editar' : 'Crear'} Parámetro</h3>

      <label>
        Entorno <span style={{ color: 'red' }}>*</span>
        <input
          type="text"
          value={entorno}
          onChange={(e) => setEntorno(e.target.value)}
          required
          disabled={loading || isEditMode}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        ID Parámetro <span style={{ color: 'red' }}>*</span>
        <input
          type="text"
          value={idParametro}
          onChange={(e) => setIdParametro(e.target.value)}
          required
          disabled={loading || isEditMode}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Nombre Parámetro <span style={{ color: 'red' }}>*</span>
        <input
          type="text"
          value={parametro}
          onChange={(e) => setParametro(e.target.value)}
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Dato Texto 1
        <input
          type="text"
          value={datoCadena}
          onChange={(e) => setDatoCadena(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Dato Texto 2
        <input
          type="text"
          value={datoCadena2}
          onChange={(e) => setDatoCadena2(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Dato Número 1
        <input
          type="number"
          value={datoNumero}
          onChange={(e) => setDatoNumero(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Dato Número 2
        <input
          type="number"
          value={datoNumero2}
          onChange={(e) => setDatoNumero2(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Fecha Inicio
        <input
          type="date"
          value={datoFechaInicio}
          onChange={(e) => setDatoFechaInicio(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label>
        Fecha Fin
        <input
          type="date"
          value={datoFechaFin}
          onChange={(e) => setDatoFechaFin(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
