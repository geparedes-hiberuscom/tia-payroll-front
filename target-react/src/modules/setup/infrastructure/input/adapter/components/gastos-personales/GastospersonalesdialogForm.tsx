import React, { useEffect, useState } from 'react';
import { UIButton, UIInput, UICombobox } from '../../components/ui-kit';
import { CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogResponse } from '../../dto/GastospersonalesdialogDto';
import { EmpresasGatewayAdapter, EmpresaOption } from '../../../../output/adapter/api/EmpresasGatewayAdapter';

interface GastospersonalesdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: GastospersonalesdialogResponse;
  onSubmit: (data: CreateGastospersonalesdialogRequest | UpdateGastospersonalesdialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: GastosPersonalesDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: GastosPersonalesDialog.zul
 */
export const GastospersonalesdialogForm: React.FC<GastospersonalesdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  error,
}) => {
  const isEditMode = !!initialData;

  const [empresaId, setEmpresaId] = useState(initialData?.empresaId?.toString() || '');
  const [empresas, setEmpresas] = useState<EmpresaOption[]>([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);
  const [anio, setAnio] = useState(initialData?.anio?.toString() || '');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
  const [montoMaximo, setMontoMaximo] = useState(initialData?.montoMaximo?.toString() || '');
  const [porcentaje, setPorcentaje] = useState(initialData?.porcentaje?.toString() || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar empresas al montar
    const cargarEmpresas = async () => {
      setLoadingEmpresas(true);
      const adapter = new EmpresasGatewayAdapter();
      const opciones = await adapter.obtenerEmpresas();
      setEmpresas(opciones);
      setLoadingEmpresas(false);
    };
    cargarEmpresas();
  }, []);

  useEffect(() => {
    if (initialData) {
      setEmpresaId(initialData.empresaId?.toString() || '');
      setAnio(initialData.anio?.toString() || '');
      setDescripcion(initialData.descripcion || '');
      setMontoMaximo(initialData.montoMaximo?.toString() || '');
      setPorcentaje(initialData.porcentaje?.toString() || '');
    }
  }, [initialData]);

  const parseOptionalNumber = (value: string): number | undefined => {
    if (!value.trim()) {
      return undefined;
    }
    return Number(value);
  };

  const getButtonLabel = (): string => {
    if (loading) return 'Guardando...';
    return isEditMode ? 'Actualizar' : 'Crear';
  };

  const empresasOptions = empresas.map(e => {
    const label = e.ruc ? `${e.nombre} (${e.ruc})` : e.nombre;
    return { value: e.id.toString(), label };
  });

  const validate = (): string | null => {
    const empresaIdNum = Number(empresaId);
    const anioNum = Number(anio);
    const montoMaximoNum = parseOptionalNumber(montoMaximo);
    const porcentajeNum = parseOptionalNumber(porcentaje);

    if (!empresaId || !anio || !descripcion.trim()) {
      return 'Completa los campos obligatorios: Empresa, Año y Descripción.';
    }
    if (Number.isNaN(empresaIdNum) || empresaIdNum < 1) {
      return 'El ID de empresa debe ser un número válido.';
    }
    if (Number.isNaN(anioNum) || anioNum < 2000 || anioNum > 2099) {
      return 'El año debe estar entre 2000 y 2099.';
    }
    if (montoMaximoNum !== undefined && (Number.isNaN(montoMaximoNum) || montoMaximoNum < 0 || montoMaximoNum > 999999.9999)) {
      return 'El monto máximo debe estar entre 0 y 999999.9999.';
    }
    if (porcentajeNum !== undefined && (Number.isNaN(porcentajeNum) || porcentajeNum < 0 || porcentajeNum > 100)) {
      return 'El porcentaje debe estar entre 0 y 100.';
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

    const payload: CreateGastospersonalesdialogRequest | UpdateGastospersonalesdialogRequest = isEditMode
      ? {
          descripcion: descripcion.trim(),
          montoMaximo: parseOptionalNumber(montoMaximo),
          porcentaje: parseOptionalNumber(porcentaje),
        }
      : {
          empresaId: Number(empresaId),
          anio: Number(anio),
          descripcion: descripcion.trim(),
          montoMaximo: parseOptionalNumber(montoMaximo),
          porcentaje: parseOptionalNumber(porcentaje),
        };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="gastospersonalesdialog-form"
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

      <h3 style={{ margin: 0 }}>{isEditMode ? 'Editar' : 'Crear'} Gasto Personal</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UICombobox
          id="empresaId"
          label="Empresa"
          value={empresaId}
          onChange={(value) => setEmpresaId(value)}
          options={empresasOptions}
          loadingOptions={loadingEmpresas}
          required
          disabled={loading || isEditMode}
          placeholder="Selecciona una empresa"
          fullWidth
        />
        <UIInput
          id="anio"
          label="Año"
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
          disabled={loading || isEditMode}
          placeholder="Ej: 2026"
          fullWidth
        />
      </div>

      <UIInput
        id="descripcion"
        label="Descripción"
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        disabled={loading}
        placeholder="Descripción del gasto"
        fullWidth
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UIInput
          id="montoMaximo"
          label="Monto máximo"
          type="number"
          value={montoMaximo}
          onChange={(e) => setMontoMaximo(e.target.value)}
          disabled={loading}
          placeholder="Opcional"
          fullWidth
        />
        <UIInput
          id="porcentaje"
          label="Porcentaje"
          type="number"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
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
