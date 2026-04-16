import React, { useState } from 'react';
import { UIButton } from '../../components/ui-kit';
import { CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogResponse } from '../../dto/ParametrosParametrosdialogDto';

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
      datoNumero: datoNumero ? Number.parseFloat(datoNumero) : undefined,
      datoNumero2: datoNumero2 ? Number.parseFloat(datoNumero2) : undefined,
      datoFechaInicio: datoFechaInicio || undefined,
      datoFechaFin: datoFechaFin || undefined,
    };

    onSubmit(data);
  };

  const buttonLabel = isEditMode ? 'Actualizar' : 'Crear';

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
  } as const;

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: 500,
    color: '#333',
  } as const;

  const fieldContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="parametros-parametrosdialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {isEditMode && (
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            Información de identificación
          </legend>
          <div style={fieldContainerStyle}>
            <label htmlFor="entorno" style={labelStyle}>
              Entorno <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="entorno"
              type="text"
              value={entorno}
              onChange={(e) => setEntorno(e.target.value)}
              required
              disabled={true}
              style={inputStyle}
            />
          </div>
        </fieldset>
      )}

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información requerida
        </legend>

        <div style={fieldContainerStyle}>
          <label htmlFor="idParametro" style={labelStyle}>
            ID Parámetro <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="idParametro"
            type="text"
            value={idParametro}
            onChange={(e) => setIdParametro(e.target.value)}
            required
            disabled={loading || isEditMode}
            placeholder="Ej: PARAM_001"
            style={inputStyle}
          />
        </div>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="parametro" style={labelStyle}>
            Nombre Parámetro <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="parametro"
            type="text"
            value={parametro}
            onChange={(e) => setParametro(e.target.value)}
            required
            disabled={loading}
            placeholder="Ej: Parámetro de configuración"
            style={inputStyle}
          />
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Datos adicionales
        </legend>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="datoNumero" style={labelStyle}>
            Dato Número 1
          </label>
          <input
            id="datoNumero"
            type="number"
            value={datoNumero}
            onChange={(e) => setDatoNumero(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="datoNumero2" style={labelStyle}>
            Dato Número 2
          </label>
          <input
            id="datoNumero2"
            type="number"
            value={datoNumero2}
            onChange={(e) => setDatoNumero2(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="datoFechaInicio" style={labelStyle}>
            Fecha Inicio
          </label>
          <input
            id="datoFechaInicio"
            type="date"
            value={datoFechaInicio}
            onChange={(e) => setDatoFechaInicio(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="datoFechaFin" style={labelStyle}>
            Fecha Fin
          </label>
          <input
            id="datoFechaFin"
            type="date"
            value={datoFechaFin}
            onChange={(e) => setDatoFechaFin(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
        </div>
      </fieldset>

      <div style={buttonContainerStyle}>
        {onCancel && (
          <UIButton
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </UIButton>
        )}
        <UIButton
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Guardando...' : buttonLabel}
        </UIButton>
      </div>
    </form>
  );
};
