import React, { useState, useEffect } from 'react';
import { CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogResponse } from '../../dto/PlantillacontablePlantillacontabledialogDto';

interface PlantillacontablePlantillacontabledialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: PlantillacontablePlantillacontabledialogResponse;
  onSubmit: (data: CreatePlantillacontablePlantillacontabledialogRequest | UpdatePlantillacontablePlantillacontabledialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: plantillaContable.zul / plantillaContableDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: plantillaContable.zul, plantillaContableDialog.zul
 */
export const PlantillacontablePlantillacontabledialogForm: React.FC<PlantillacontablePlantillacontabledialogFormProps> = ({
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
  const [rpt, setRpt] = useState(initialData?.rpt || '');
  const [tcDmCentroCosto, setTcDmCentroCosto] = useState(initialData?.tcDmCentroCosto || '');
  const [tcDmLocalidad, setTcDmLocalidad] = useState(initialData?.tcDmLocalidad || '');
  const [agrupacionCC, setAgrupacionCC] = useState(initialData?.agrupacionCC || '');
  const [agrupacionLoc, setAgrupacionLoc] = useState(initialData?.agrupacionLoc || '');
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
      setRpt(initialData.rpt || '');
      setTcDmCentroCosto(initialData.tcDmCentroCosto || '');
      setTcDmLocalidad(initialData.tcDmLocalidad || '');
      setAgrupacionCC(initialData.agrupacionCC || '');
      setAgrupacionLoc(initialData.agrupacionLoc || '');
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

    const data: CreatePlantillacontablePlantillacontabledialogRequest | UpdatePlantillacontablePlantillacontabledialogRequest = {
      procesoId: Number(procesoId),
      rubroId,
      cuenta,
      debeHaber,
      subcuenta: subcuenta || undefined,
      auxiliar: auxiliar || undefined,
      distribucionCosto: distribucionCosto || undefined,
      rpt: rpt || undefined,
      tcDmCentroCosto: tcDmCentroCosto || undefined,
      tcDmLocalidad: tcDmLocalidad || undefined,
      agrupacionCC: agrupacionCC || undefined,
      agrupacionLoc: agrupacionLoc || undefined,
      dimensionId: dimensionId ? Number(dimensionId) : undefined,
    };

    onSubmit(data);
  };

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
      data-testid="plantillacontable-plantillacontabledialog-form"
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
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información requerida
        </legend>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="procesoId" style={labelStyle}>
              Proceso <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="procesoId"
              type="number"
              value={procesoId}
              onChange={(e) => setProcesoId(e.target.value)}
              required
              disabled={loading}
              placeholder="Ej: 1"
              style={inputStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="rubroId" style={labelStyle}>
              Rubro <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="rubroId"
              type="text"
              value={rubroId}
              onChange={(e) => setRubroId(e.target.value)}
              required
              disabled={loading}
              placeholder="Ej: RUB001"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ ...fieldContainerStyle, marginTop: '1rem' }}>
          <label htmlFor="cuenta" style={labelStyle}>
            Cuenta <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="cuenta"
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            required
            disabled={loading}
            placeholder="Ej: 2101"
            style={inputStyle}
          />
        </div>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="debeHaber" style={labelStyle}>
              Debe/Haber <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              id="debeHaber"
              value={debeHaber}
              onChange={(e) => setDebeHaber(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            >
              <option value="D">Debe (D)</option>
              <option value="H">Haber (H)</option>
            </select>
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="dimensionId" style={labelStyle}>
              Dimensión
            </label>
            <input
              id="dimensionId"
              type="number"
              value={dimensionId}
              onChange={(e) => setDimensionId(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información adicional (opcional)
        </legend>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="subcuenta" style={labelStyle}>
              Subcuenta
            </label>
            <input
              id="subcuenta"
              type="text"
              value={subcuenta}
              onChange={(e) => setSubcuenta(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="auxiliar" style={labelStyle}>
              Auxiliar
            </label>
            <input
              id="auxiliar"
              type="text"
              value={auxiliar}
              onChange={(e) => setAuxiliar(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="distribucionCosto" style={labelStyle}>
              Distribución de Costo
            </label>
            <input
              id="distribucionCosto"
              type="text"
              value={distribucionCosto}
              onChange={(e) => setDistribucionCosto(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="rpt" style={labelStyle}>
              RPT
            </label>
            <input
              id="rpt"
              type="text"
              value={rpt}
              onChange={(e) => setRpt(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="tcDmCentroCosto" style={labelStyle}>
              Centro de Costo (TC/DM)
            </label>
            <input
              id="tcDmCentroCosto"
              type="text"
              value={tcDmCentroCosto}
              onChange={(e) => setTcDmCentroCosto(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="tcDmLocalidad" style={labelStyle}>
              Localidad (TC/DM)
            </label>
            <input
              id="tcDmLocalidad"
              type="text"
              value={tcDmLocalidad}
              onChange={(e) => setTcDmLocalidad(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={twoColumnStyle}>
          <div style={fieldContainerStyle}>
            <label htmlFor="agrupacionCC" style={labelStyle}>
              Agrupación Centro de Costo
            </label>
            <input
              id="agrupacionCC"
              type="text"
              value={agrupacionCC}
              onChange={(e) => setAgrupacionCC(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>

          <div style={fieldContainerStyle}>
            <label htmlFor="agrupacionLoc" style={labelStyle}>
              Agrupación Localidad
            </label>
            <input
              id="agrupacionLoc"
              type="text"
              value={agrupacionLoc}
              onChange={(e) => setAgrupacionLoc(e.target.value)}
              disabled={loading}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>
        </div>
      </fieldset>

      <div style={buttonContainerStyle}>
        {(() => {
          const buttonText = getButtonText();
          return (
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#B1CBD5',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'background-color 0.2s',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7B8D95';
              }}
              onMouseLeave={(e) => {
                if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#B1CBD5';
              }}
            >
              {buttonText}
            </button>
          );
        })()}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background-color 0.2s',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#575757';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6c757d';
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
