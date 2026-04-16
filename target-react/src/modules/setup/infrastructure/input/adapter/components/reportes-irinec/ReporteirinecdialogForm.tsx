import React, { useEffect, useState } from 'react';
import { UIButton, UIInput, UICombobox } from '../../components/ui-kit';
import { GenerarReporteirinecdialogRequest, UpdateReporteirinecdialogRequest, ReporteirinecdialogResponse } from '../../dto/ReporteirinecdialogDto';
import { EmpresasGatewayAdapter, EmpresaOption } from '../../../../output/adapter/api/EmpresasGatewayAdapter';

interface ReporteirinecdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ReporteirinecdialogResponse;
  onSubmit: (data: GenerarReporteirinecdialogRequest | UpdateReporteirinecdialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: ReporteIRINECDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: ReporteIRINECDialog.zul
 */
export const ReporteirinecdialogForm: React.FC<ReporteirinecdialogFormProps> = ({
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
  const [tipo, setTipo] = useState(initialData?.tipo || '');
  const [anio, setAnio] = useState(initialData?.anio?.toString() || '');
  const [formato, setFormato] = useState(initialData?.formato || '');
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
      setTipo(initialData.tipo || '');
      setAnio(initialData.anio?.toString() || '');
      setFormato(initialData.formato || '');
      setEstado(initialData.estado || '');
    }
  }, [initialData]);

  const validate = (): string | null => {
    const empresaIdNum = Number(empresaId);
    const anioNum = Number(anio);

    if (!empresaId || !tipo.trim() || !anio) {
      return 'Completa los campos obligatorios: Empresa, Tipo y Año.';
    }
    if (Number.isNaN(empresaIdNum) || empresaIdNum < 1) {
      return 'El ID de empresa debe ser un número válido.';
    }
    if (Number.isNaN(anioNum) || anioNum < 2000 || anioNum > 2099) {
      return 'El año debe estar entre 2000 y 2099.';
    }
    return null;
  };

  const getButtonLabel = (): string => {
    if (loading) return 'Guardando...';
    return isEditMode ? 'Actualizar' : 'Generar';
  };

  const empresasOptions = empresas.map(e => {
    const label = e.ruc ? `${e.nombre} (${e.ruc})` : e.nombre;
    return { value: e.id.toString(), label };
  });

  const tipoOptions = [
    { value: 'IR', label: 'Impuesto a la Renta (IR)' },
    { value: 'INEC', label: 'INEC' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError(null);

    const payload: GenerarReporteirinecdialogRequest | UpdateReporteirinecdialogRequest = isEditMode
      ? {
          estado: estado.trim() || undefined,
          formato: formato.trim() || undefined,
        }
      : {
          empresaId: Number(empresaId),
          tipo: tipo.trim(),
          anio: Number(anio),
          formato: formato.trim() || undefined,
        };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="reporteirinecdialog-form"
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

      <h3 style={{ margin: 0 }}>{isEditMode ? 'Editar' : 'Generar'} Reporte IR/INEC</h3>

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
        <UICombobox
          id="tipo"
          label="Tipo"
          value={tipo}
          onChange={(value) => setTipo(value)}
          options={tipoOptions}
          required
          disabled={loading || isEditMode}
          placeholder="Selecciona tipo"
          fullWidth
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
        <UIInput
          id="formato"
          label="Formato"
          type="text"
          value={formato}
          onChange={(e) => setFormato(e.target.value)}
          disabled={loading}
          placeholder="Opcional (PDF, Excel, etc)"
          fullWidth
        />
      </div>

      {isEditMode && (
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
