import React, { useEffect, useState } from 'react';
import { UIButton, UIInput, UICombobox } from '../../components/ui-kit';
import { GenerarGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';
import { EmpresasGatewayAdapter, EmpresaOption } from '../../../../output/adapter/api/EmpresasGatewayAdapter';

interface GeningproyectadosFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: GeningproyectadosResponse;
  onSubmit: (data: GenerarGeningproyectadosRequest | UpdateGeningproyectadosRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: genIngProyectados.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: genIngProyectados.zul
 */
export const GeningproyectadosForm: React.FC<GeningproyectadosFormProps> = ({
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
  const [mesDesde, setMesDesde] = useState(initialData?.mes?.toString() || '');
  const [mesHasta, setMesHasta] = useState('');
  const [montoProyectado, setMontoProyectado] = useState(initialData?.montoProyectado?.toString() || '');
  const [estado, setEstado] = useState(initialData?.estado || '');
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
      setMontoProyectado(initialData.montoProyectado?.toString() || '');
      setEstado(initialData.estado || '');
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
    return isEditMode ? 'Actualizar' : 'Generar';
  };

  const empresasOptions = empresas.map(e => {
    const label = e.ruc ? `${e.nombre} (${e.ruc})` : e.nombre;
    return { value: e.id.toString(), label };
  });

  const validate = (): string | null => {
    const empresaIdNum = Number(empresaId);
    const anioNum = Number(anio);
    const mesDesdeNum = parseOptionalNumber(mesDesde);
    const mesHastaNum = parseOptionalNumber(mesHasta);
    const montoProyectadoNum = parseOptionalNumber(montoProyectado);

    if (!empresaId || !anio) {
      return 'Completa los campos obligatorios: Empresa y Año.';
    }
    if (Number.isNaN(empresaIdNum) || empresaIdNum < 1) {
      return 'El ID de empresa debe ser un número válido.';
    }
    if (Number.isNaN(anioNum) || anioNum < 2000 || anioNum > 2099) {
      return 'El año debe estar entre 2000 y 2099.';
    }
    if (mesDesdeNum !== undefined && (Number.isNaN(mesDesdeNum) || mesDesdeNum < 1 || mesDesdeNum > 12)) {
      return 'El mes desde debe estar entre 1 y 12.';
    }
    if (mesHastaNum !== undefined && (Number.isNaN(mesHastaNum) || mesHastaNum < 1 || mesHastaNum > 12)) {
      return 'El mes hasta debe estar entre 1 y 12.';
    }
    if (mesDesdeNum !== undefined && mesHastaNum !== undefined && mesDesdeNum > mesHastaNum) {
      return 'El mes desde no puede ser mayor que el mes hasta.';
    }
    if (montoProyectadoNum !== undefined && (Number.isNaN(montoProyectadoNum) || montoProyectadoNum < 0)) {
      return 'El monto proyectado debe ser mayor o igual a 0.';
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

    const payload: GenerarGeningproyectadosRequest | UpdateGeningproyectadosRequest = isEditMode
      ? {
          montoProyectado: parseOptionalNumber(montoProyectado),
          estado: estado.trim() || undefined,
        }
      : {
          empresaId: Number(empresaId),
          anio: Number(anio),
          mesDesde: parseOptionalNumber(mesDesde),
          mesHasta: parseOptionalNumber(mesHasta),
        };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="geningproyectados-form"
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

      <h3 style={{ margin: 0 }}>{isEditMode ? 'Editar' : 'Generar'} Ingresos Proyectados</h3>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <UIInput
          id="mesDesde"
          label="Mes desde"
          type="number"
          value={mesDesde}
          onChange={(e) => setMesDesde(e.target.value)}
          disabled={loading}
          placeholder="1-12 (Opcional)"
          fullWidth
        />
        <UIInput
          id="mesHasta"
          label="Mes hasta"
          type="number"
          value={mesHasta}
          onChange={(e) => setMesHasta(e.target.value)}
          disabled={loading}
          placeholder="1-12 (Opcional)"
          fullWidth
        />
      </div>

      {isEditMode && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <UIInput
            id="montoProyectado"
            label="Monto proyectado"
            type="number"
            value={montoProyectado}
            onChange={(e) => setMontoProyectado(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
          <UIInput
            id="estado"
            label="Estado"
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
        </div>
      )}

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
