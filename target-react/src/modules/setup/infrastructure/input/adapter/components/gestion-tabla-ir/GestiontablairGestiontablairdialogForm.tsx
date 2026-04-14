import React, { useEffect, useState } from 'react';
import { UIButton, UIInput } from '../../components/ui-kit';
import { CreateGestiontablairGestiontablairdialog, UpdateGestiontablairGestiontablairdialog, GestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';

interface GestiontablairGestiontablairdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: GestiontablairGestiontablairdialog;
  onSubmit: (data: CreateGestiontablairGestiontablairdialog | UpdateGestiontablairGestiontablairdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: gestionTablaIR.zul, gestionTablaIRDialog.zul
 * Renderers fuente: N/A
 */
export const GestiontablairGestiontablairdialogForm: React.FC<GestiontablairGestiontablairdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  error,
}) => {
  const isEditMode = !!initialData;

  const [anio, setAnio] = useState(initialData?.anio?.toString() || '');
  const [nivel, setNivel] = useState(initialData?.nivel?.toString() || '');
  const [tipo, setTipo] = useState(initialData?.tipo || '');
  const [valorMinimo, setValorMinimo] = useState(initialData?.valorMinimo?.toString() || '');
  const [valorMaximo, setValorMaximo] = useState(initialData?.valorMaximo?.toString() || '');
  const [fraccionBasica, setFraccionBasica] = useState(initialData?.fraccionBasica?.toString() || '');
  const [porcentajeExcedente, setPorcentajeExcedente] = useState(initialData?.porcentajeExcedente?.toString() || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const getButtonLabel = (): string => {
    if (loading) return 'Guardando...';
    return isEditMode ? 'Actualizar' : 'Crear';
  };

  useEffect(() => {
    if (initialData) {
      setAnio(initialData.anio?.toString() || '');
      setNivel(initialData.nivel?.toString() || '');
      setTipo(initialData.tipo || '');
      setValorMinimo(initialData.valorMinimo?.toString() || '');
      setValorMaximo(initialData.valorMaximo?.toString() || '');
      setFraccionBasica(initialData.fraccionBasica?.toString() || '');
      setPorcentajeExcedente(initialData.porcentajeExcedente?.toString() || '');
    }
  }, [initialData]);

  const parseOptionalNumber = (value: string): number | undefined => {
    if (!value.trim()) {
      return undefined;
    }
    return Number(value);
  };

  const validate = (): string | null => {
    const anioNum = Number(anio);
    const nivelNum = Number(nivel);
    const valorMinimoNum = Number(valorMinimo);
    const valorMaximoNum = parseOptionalNumber(valorMaximo);
    const fraccionBasicaNum = parseOptionalNumber(fraccionBasica);
    const porcentajeExcedenteNum = parseOptionalNumber(porcentajeExcedente);

    if (!anio || !nivel || !tipo.trim() || !valorMinimo) {
      return 'Completa los campos obligatorios: Año, Nivel, Tipo y Valor mínimo.';
    }
    if (Number.isNaN(anioNum) || anioNum < 2000 || anioNum > 2099) {
      return 'El año debe estar entre 2000 y 2099.';
    }
    if (Number.isNaN(nivelNum) || nivelNum < 1 || nivelNum > 5) {
      return 'El nivel debe estar entre 1 y 5.';
    }
    if (Number.isNaN(valorMinimoNum) || valorMinimoNum < 0) {
      return 'El valor mínimo debe ser mayor o igual a 0.';
    }
    if (valorMaximoNum !== undefined && (Number.isNaN(valorMaximoNum) || valorMaximoNum < 0 || valorMaximoNum > 999999.9999)) {
      return 'El valor máximo debe estar entre 0 y 999999.9999.';
    }
    if (fraccionBasicaNum !== undefined && (Number.isNaN(fraccionBasicaNum) || fraccionBasicaNum < 0 || fraccionBasicaNum > 100)) {
      return 'La fracción básica debe estar entre 0 y 100.';
    }
    if (porcentajeExcedenteNum !== undefined && (Number.isNaN(porcentajeExcedenteNum) || porcentajeExcedenteNum < 0 || porcentajeExcedenteNum > 100)) {
      return 'El porcentaje excedente debe estar entre 0 y 100.';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError(null);

    const payload: CreateGestiontablairGestiontablairdialog | UpdateGestiontablairGestiontablairdialog = {
      anio: Number(anio),
      nivel: Number(nivel),
      tipo: tipo.trim(),
      valorMinimo: Number(valorMinimo),
      valorMaximo: parseOptionalNumber(valorMaximo),
      fraccionBasica: parseOptionalNumber(fraccionBasica),
      porcentajeExcedente: parseOptionalNumber(porcentajeExcedente),
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="gestiontablair-gestiontablairdialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {validationError && (
        <div
          style={{
            backgroundColor: '#fff7ed',
            border: '1px solid #fdba74',
            borderRadius: 4,
            padding: '1rem',
            color: '#9a3412',
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          ⚠️ {validationError}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: 4,
            padding: '1rem',
            color: '#c33',
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <h3 style={{ margin: 0 }}>{isEditMode ? 'Editar' : 'Crear'} Rango Tabla IR</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UIInput
          id="anio"
          label="Año"
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
          disabled={loading}
          placeholder="Ej: 2026"
          fullWidth
        />
        <UIInput
          id="nivel"
          label="Nivel"
          type="number"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          required
          disabled={loading}
          placeholder="1 a 5"
          fullWidth
        />
      </div>

      <UIInput
        id="tipo"
        label="Tipo"
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        required
        disabled={loading}
        placeholder="Tipo de rango"
        fullWidth
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UIInput
          id="valorMinimo"
          label="Valor mínimo"
          type="number"
          value={valorMinimo}
          onChange={(e) => setValorMinimo(e.target.value)}
          required
          disabled={loading}
          placeholder="0"
          fullWidth
        />
        <UIInput
          id="valorMaximo"
          label="Valor máximo"
          type="number"
          value={valorMaximo}
          onChange={(e) => setValorMaximo(e.target.value)}
          disabled={loading}
          placeholder="Opcional"
          fullWidth
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UIInput
          id="fraccionBasica"
          label="Fracción básica"
          type="number"
          value={fraccionBasica}
          onChange={(e) => setFraccionBasica(e.target.value)}
          disabled={loading}
          placeholder="0 a 100"
          fullWidth
        />
        <UIInput
          id="porcentajeExcedente"
          label="Porcentaje excedente"
          type="number"
          value={porcentajeExcedente}
          onChange={(e) => setPorcentajeExcedente(e.target.value)}
          disabled={loading}
          placeholder="0 a 100"
          fullWidth
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <UIButton variant="primary" type="submit" disabled={loading}>
          {getButtonLabel()}
        </UIButton>
        {onCancel && (
          <UIButton variant="outline" type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </UIButton>
        )}
      </div>
    </form>
  );
};
