import React, { useState, useEffect } from 'react';
import { CreateRubroplantillacontabledialogRequest, UpdateRubroplantillacontabledialogRequest, RubroplantillacontabledialogResponse } from '../../dto/RubroplantillacontabledialogDto';
import { UIButton, UIInput } from '../../components/ui-kit';

interface RubroplantillacontabledialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: RubroplantillacontabledialogResponse;
  onSubmit: (data: CreateRubroplantillacontabledialogRequest | UpdateRubroplantillacontabledialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: rubroplantillaContableDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 */
export const RubroplantillacontabledialogForm: React.FC<RubroplantillacontabledialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  error,
}) => {
  const isEditMode = !!initialData;

  // Estados para campos de creación/edición
  const [procesoId, setProcesoId] = useState(initialData?.procesoId?.toString() || '');
  const [rubroId, setRubroId] = useState(initialData?.rubroId || '');
  const [cuenta, setCuenta] = useState(initialData?.cuenta || '');
  const [debeHaber, setDebeHaber] = useState(initialData?.debeHaber || 'D');
  const [subcuenta, setSubcuenta] = useState(initialData?.subcuenta || '');
  const [auxiliar, setAuxiliar] = useState(initialData?.auxiliar || '');
  const [distribucionCosto, setDistribucionCosto] = useState(initialData?.distribucionCosto || '');
  const [dimensionId, setDimensionId] = useState(initialData?.dimensionId?.toString() || '');

  useEffect(() => {
    if (initialData) {
      setProcesoId(initialData.procesoId?.toString() || '');
      setRubroId(initialData.rubroId || '');
      setCuenta(initialData.cuenta || '');
      setDebeHaber(initialData.debeHaber || 'D');
      setSubcuenta(initialData.subcuenta || '');
      setAuxiliar(initialData.auxiliar || '');
      setDistribucionCosto(initialData.distribucionCosto || '');
      setDimensionId(initialData.dimensionId?.toString() || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!procesoId || !rubroId || !cuenta || !debeHaber) {
      alert('Por favor completa todos los campos requeridos (Proceso, Rubro, Cuenta, Debe/Haber)');
      return;
    }

    const data: CreateRubroplantillacontabledialogRequest | UpdateRubroplantillacontabledialogRequest = isEditMode
      ? {
          cuenta,
          debeHaber,
          subcuenta: subcuenta || undefined,
          auxiliar: auxiliar || undefined,
          distribucionCosto: distribucionCosto || undefined,
          dimensionId: dimensionId ? Number(dimensionId) : undefined,
        }
      : {
          procesoId: Number(procesoId),
          rubroId,
          cuenta,
          debeHaber,
          subcuenta: subcuenta || undefined,
          auxiliar: auxiliar || undefined,
          distribucionCosto: distribucionCosto || undefined,
          dimensionId: dimensionId ? Number(dimensionId) : undefined,
        };

    onSubmit(data);
  };

  const fieldContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  };

  const twoColumnStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  };

  const getButtonText = () => {
    if (loading) return 'Guardando...';
    if (isEditMode) return 'Actualizar';
    return 'Crear';
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="rubroplantillacontabledialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
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

      {!isEditMode && (
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            Información requerida (Creación)
          </legend>

          <div style={twoColumnStyle}>
            <UIInput
              id="procesoId"
              label="Proceso"
              type="number"
              value={procesoId}
              onChange={(e) => setProcesoId(e.target.value)}
              required
              disabled={loading || isEditMode}
              placeholder="Ej: 1"
              fullWidth
            />

            <UIInput
              id="rubroId"
              label="Rubro"
              type="text"
              value={rubroId}
              onChange={(e) => setRubroId(e.target.value)}
              required
              disabled={loading || isEditMode}
              placeholder="Ej: RUB001"
              fullWidth
            />
          </div>
        </fieldset>
      )}

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información contable
        </legend>

        <div style={fieldContainerStyle}>
          <UIInput
            id="cuenta"
            label="Cuenta"
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            required
            disabled={loading}
            placeholder="Ej: 2101"
            fullWidth
          />
        </div>

        <div style={twoColumnStyle}>
          <UIInput
            id="debeHaber"
            label="Debe/Haber"
            value={debeHaber}
            onChange={(e) => setDebeHaber(e.target.value)}
            required
            disabled={loading}
            fullWidth
            as="select"
          >
            <option value="D">Debe (D)</option>
            <option value="H">Haber (H)</option>
          </UIInput>

          <UIInput
            id="dimensionId"
            label="Dimensión"
            type="number"
            value={dimensionId}
            onChange={(e) => setDimensionId(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información adicional (opcional)
        </legend>

        <div style={twoColumnStyle}>
          <UIInput
            id="subcuenta"
            label="Subcuenta"
            type="text"
            value={subcuenta}
            onChange={(e) => setSubcuenta(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />

          <UIInput
            id="auxiliar"
            label="Auxiliar"
            type="text"
            value={auxiliar}
            onChange={(e) => setAuxiliar(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
        </div>

        <div style={fieldContainerStyle}>
          <UIInput
            id="distribucionCosto"
            label="Distribución de Costo"
            type="text"
            value={distribucionCosto}
            onChange={(e) => setDistribucionCosto(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
        </div>
      </fieldset>

      <div style={buttonContainerStyle}>
        <UIButton
          variant="primary"
          size="medium"
          disabled={loading}
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
        >
          {getButtonText()}
        </UIButton>
        {onCancel && (
          <UIButton
            variant="secondary"
            size="medium"
            disabled={loading}
            onClick={onCancel}
          >
            Cancelar
          </UIButton>
        )}
      </div>
    </form>
  );
};
