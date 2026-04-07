import React, { useState } from 'react';
import { CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogResponse } from '../dto/ParametrosParametrosdialogDto';

interface ParametrosParametrosdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ParametrosParametrosdialogResponse;
  onSubmit: (data: CreateParametrosParametrosdialogRequest | UpdateParametrosParametrosdialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * Componente Formulario: parametros.zul / parametrosDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: parametros.zul, parametrosDialog.zul
 * Renderers fuente: N/A
 *
 * Copilot — Completar con los campos reales del formulario (basarse en el domain model).
 */
export const ParametrosParametrosdialogForm: React.FC<ParametrosParametrosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditMode = !!initialData;
  const [entorno, setEntorno] = useState(initialData?.entorno || (isEditMode ? '' : 'G'));
  const [idParametro, setIdParametro] = useState(initialData?.idParametro || '');
  const [parametro, setParametro] = useState(initialData?.parametro || '');
  const [datoCadena, setDatoCadena] = useState(initialData?.datoCadena || '');
  const [datoCadena2, setDatoCadena2] = useState(initialData?.datoCadena2 || '');
  const [datoNumero, setDatoNumero] = useState(initialData?.datoNumero?.toString() || '');
  const [datoNumero2, setDatoNumero2] = useState(initialData?.datoNumero2?.toString() || '');
  const [datoFechaInicio, setDatoFechaInicio] = useState(
    initialData?.datoFechaInicio ? initialData.datoFechaInicio.split('T')[0] : ''
  );
  const [datoFechaFin, setDatoFechaFin] = useState(
    initialData?.datoFechaFin ? initialData.datoFechaFin.split('T')[0] : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entorno || !idParametro || !parametro) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    const data: CreateParametrosParametrosdialogRequest | UpdateParametrosParametrosdialogRequest = {
      entorno,
      idParametro,
      parametro,
      datoCadena: datoCadena || undefined,
      datoCadena2: datoCadena2 || undefined,
      datoNumero: datoNumero ? Number.parseFloat(datoNumero) : undefined,
      datoNumero2: datoNumero2 ? Number.parseFloat(datoNumero2) : undefined,
      datoFechaInicio: datoFechaInicio || undefined,
      datoFechaFin: datoFechaFin || undefined,
    };

    onSubmit(data);
  };

  const buttonLabel = isEditMode ? 'Actualizar' : 'Crear';
  const pageTitle = isEditMode ? 'Editar' : 'Crear';

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="parametros-parametrosdialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}
    >
      <h3>{pageTitle} Parámetro</h3>

      <label htmlFor="entorno" style={isEditMode ? {} : { display: 'none' }}>
        Entorno <span style={{ color: 'red' }}>*</span>
        <input
          id="entorno"
          type="text"
          value={entorno}
          onChange={(e) => setEntorno(e.target.value)}
          required
          disabled={loading || isEditMode}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label htmlFor="idParametro">
        ID Parámetro <span style={{ color: 'red' }}>*</span>
        <input
          id="idParametro"
          type="text"
          value={idParametro}
          onChange={(e) => setIdParametro(e.target.value)}
          required
          disabled={loading || isEditMode}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <label htmlFor="parametro">
        Nombre Parámetro <span style={{ color: 'red' }}>*</span>
        <input
          id="parametro"
          type="text"
          value={parametro}
          onChange={(e) => setParametro(e.target.value)}
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </label>

      <div>
        <label htmlFor="datoCadena">Dato Texto 1</label>
        <input
          id="datoCadena"
          type="text"
          value={datoCadena}
          onChange={(e) => setDatoCadena(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label htmlFor="datoCadena2">Dato Texto 2</label>
        <input
          id="datoCadena2"
          type="text"
          value={datoCadena2}
          onChange={(e) => setDatoCadena2(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label htmlFor="datoNumero">Dato Número 1</label>
        <input
          id="datoNumero"
          type="number"
          value={datoNumero}
          onChange={(e) => setDatoNumero(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label htmlFor="datoNumero2">Dato Número 2</label>
        <input
          id="datoNumero2"
          type="number"
          value={datoNumero2}
          onChange={(e) => setDatoNumero2(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label htmlFor="datoFechaInicio">Fecha Inicio</label>
        <input
          id="datoFechaInicio"
          type="date"
          value={datoFechaInicio}
          onChange={(e) => setDatoFechaInicio(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div>
        <label htmlFor="datoFechaFin">Fecha Fin</label>
        <input
          id="datoFechaFin"
          type="date"
          value={datoFechaFin}
          onChange={(e) => setDatoFechaFin(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : buttonLabel}
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
