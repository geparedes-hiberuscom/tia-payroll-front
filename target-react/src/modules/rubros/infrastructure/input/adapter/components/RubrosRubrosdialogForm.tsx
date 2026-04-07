import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../../shared";
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTab,
  RubrosRubrosdialogFormValues,
  RubrosRubrosdialogParametrosTab,
} from "./rubros-rubrosdialog-form-tabs";
import {
  AmbitoRubro,
  CreateRubrosRubrosdialog,
  EfectoRubro,
  RubrosRubrosdialog,
  UpdateRubrosRubrosdialog,
} from "../../../../domain/model/RubrosRubrosdialog";

interface RubrosRubrosdialogFormProps {
  initialData?: RubrosRubrosdialog;
  onSubmit: (data: CreateRubrosRubrosdialog | UpdateRubrosRubrosdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
  readOnly?: boolean;
}

const defaultFormValues: RubrosRubrosdialogFormValues = {
  idRubro: "",
  nombre: "",
  ambito: "-1",
  efecto: "-1",
  observaciones: "",
  procedimientoCalculo: "",
  rubroHistorico: '',
  secuenciaImpresion: "",
  secuenciaSobregiro: "",
  aplicaInterfaz: false,
  insertaEnLote: false,
  carta: "",
  antiguedadMinima: "",
  numAprobaciones: "",
  numAprobacionesNoLocales: "",
  plazoMaximo: "",
  plazoMinimo: "",
  montoMaximo: "",
  verificaEndeudamiento: false,
  acumulable: false,
};

export const RubrosRubrosdialogForm: React.FC<RubrosRubrosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  readOnly = false,
}) => {
  const isEditMode = Boolean(initialData);
  const [activeTab, setActiveTab] = useState("detalle");
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(readOnly);
  const methods = useForm<RubrosRubrosdialogFormValues>({
    defaultValues: defaultFormValues,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setIsReadOnlyMode(readOnly);
  }, [readOnly]);

  useEffect(() => {
    if (!initialData) {
      methods.reset(defaultFormValues);
      return;
    }

    methods.reset({
      idRubro: initialData.idRubro,
      nombre: initialData.nombre,
      ambito: initialData.ambito ?? "-1",
      efecto: initialData.efecto ?? "-1",
      observaciones: initialData.observaciones ?? "",
      procedimientoCalculo: initialData.procedimientoCalculo ?? "",
      rubroHistorico: initialData.rubroHistorico !== undefined ? String(initialData.rubroHistorico) : "",
      secuenciaImpresion:
        initialData.secuenciaImpresion !== undefined
          ? String(initialData.secuenciaImpresion)
          : "",
      secuenciaSobregiro:
        initialData.secuenciaSobregiro !== undefined
          ? String(initialData.secuenciaSobregiro)
          : "",
      aplicaInterfaz: Boolean(initialData.aplicaInterfaz),
      insertaEnLote: Boolean(initialData.insertaEnLote),
      carta: initialData.carta ?? "",
      antiguedadMinima:
        initialData.antiguedadMinima !== undefined
          ? String(initialData.antiguedadMinima)
          : "",
      numAprobaciones:
        initialData.numAprobaciones !== undefined
          ? String(initialData.numAprobaciones)
          : "",
      numAprobacionesNoLocales:
        initialData.numAprobacionesNoLocales !== undefined
          ? String(initialData.numAprobacionesNoLocales)
          : "",
      plazoMaximo:
        initialData.plazoMaximo !== undefined
          ? String(initialData.plazoMaximo)
          : "",
      plazoMinimo:
        initialData.plazoMinimo !== undefined
          ? String(initialData.plazoMinimo)
          : "",
      montoMaximo:
        initialData.montoMaximo !== undefined
          ? String(initialData.montoMaximo)
          : "",
      verificaEndeudamiento: Boolean(initialData.verificaEndeudamiento),
      acumulable: Boolean(initialData.acumulable),
    });
  }, [initialData, methods]);

  const parseOptionalNumber = (value: string): number | undefined => {
    if (!value.trim()) {
      return undefined;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const parseEfecto = (value: EfectoSelectValue): EfectoRubro | undefined => {
    return value === "-1" ? undefined : value;
  };

  const parseAmbito = (value: AmbitoSelectValue): AmbitoRubro | undefined => {
    return value === "-1" ? undefined : value;
  };

  const ambito = methods.watch("ambito");
  const showParametrosTab = ambito === "PTM";

  useEffect(() => {
    if (!showParametrosTab && activeTab === "parametros") {
      setActiveTab("detalle");
    }
  }, [activeTab, showParametrosTab]);

  const validate = (formValues: RubrosRubrosdialogFormValues): string[] => {
    const nextErrors: string[] = [];
    if (!isEditMode && !/^[A-Za-z0-9_-]{2,30}$/.test(formValues.idRubro.trim())) {
      nextErrors.push(
        "El ID de rubro debe tener entre 2 y 30 caracteres alfanumericos.",
      );
    }
    if (!formValues.nombre.trim()) {
      nextErrors.push("El nombre es obligatorio.");
    }
    if (formValues.nombre.trim().length > 120) {
      nextErrors.push("El nombre no puede exceder 120 caracteres.");
    }
    if (formValues.carta.trim().length > 10) {
      nextErrors.push("Carta no puede exceder 10 caracteres.");
    }
    return nextErrors;
  };

  const handleSubmit = (formValues: RubrosRubrosdialogFormValues) => {
    if (isReadOnlyMode) {
      return;
    }

    const nextErrors = validate(formValues);
    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      return;
    }

    if (isEditMode) {
      onSubmit({
        nombre: formValues.nombre.trim(),
        ambito: parseAmbito(formValues.ambito),
        efecto: parseEfecto(formValues.efecto),
        observaciones: formValues.observaciones.trim() || undefined,
        procedimientoCalculo: formValues.procedimientoCalculo.trim() || undefined,
        rubroHistorico: parseOptionalNumber(formValues.rubroHistorico),
        secuenciaImpresion: parseOptionalNumber(formValues.secuenciaImpresion),
        secuenciaSobregiro: parseOptionalNumber(formValues.secuenciaSobregiro),
        aplicaInterfaz: formValues.aplicaInterfaz,
        insertaEnLote: formValues.insertaEnLote,
        carta: formValues.carta.trim() || undefined,
        antiguedadMinima: parseOptionalNumber(formValues.antiguedadMinima),
        numAprobaciones: parseOptionalNumber(formValues.numAprobaciones),
        numAprobacionesNoLocales: parseOptionalNumber(formValues.numAprobacionesNoLocales),
        plazoMaximo: parseOptionalNumber(formValues.plazoMaximo),
        plazoMinimo: parseOptionalNumber(formValues.plazoMinimo),
        montoMaximo: parseOptionalNumber(formValues.montoMaximo),
        verificaEndeudamiento: formValues.verificaEndeudamiento,
        acumulable: formValues.acumulable,
      });
      return;
    }

    onSubmit({
      idRubro: formValues.idRubro.trim(),
      nombre: formValues.nombre.trim(),
      ambito: parseAmbito(formValues.ambito),
      efecto: parseEfecto(formValues.efecto),
      observaciones: formValues.observaciones.trim() || undefined,
      procedimientoCalculo: formValues.procedimientoCalculo.trim() || undefined,
      rubroHistorico: parseOptionalNumber(formValues.rubroHistorico),
      secuenciaImpresion: parseOptionalNumber(formValues.secuenciaImpresion),
      secuenciaSobregiro: parseOptionalNumber(formValues.secuenciaSobregiro),
      aplicaInterfaz: formValues.aplicaInterfaz,
      insertaEnLote: formValues.insertaEnLote,
      carta: formValues.carta.trim() || undefined,
      antiguedadMinima: parseOptionalNumber(formValues.antiguedadMinima),
      numAprobaciones: parseOptionalNumber(formValues.numAprobaciones),
      numAprobacionesNoLocales: parseOptionalNumber(formValues.numAprobacionesNoLocales),
      plazoMaximo: parseOptionalNumber(formValues.plazoMaximo),
      plazoMinimo: parseOptionalNumber(formValues.plazoMinimo),
      montoMaximo: parseOptionalNumber(formValues.montoMaximo),
      verificaEndeudamiento: formValues.verificaEndeudamiento,
      acumulable: formValues.acumulable,
    });
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      data-testid="rubros-rubrosdialog-form"
      style={{
        display: "grid",
        gap: "0.75rem",
        maxWidth: 640,
        marginBottom: "1rem",
      }}
    >
      <h3>{isEditMode ? "Editar rubro" : "Crear rubro"}</h3>
      {isReadOnlyMode && (
        <div
          data-testid="rubros-rubrosdialog-readonly-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            padding: "0.2rem 0.6rem",
            borderRadius: 999,
            backgroundColor: "#e5e7eb",
            color: "#374151",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          Solo lectura
        </div>
      )}
      {errors.length > 0 && (
        <ul
          data-testid="rubros-rubrosdialog-form-errors"
          style={{ color: "#b91c1c", margin: 0 }}
        >
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Secciones del formulario de rubros">
          <TabsTrigger value="detalle">Detalle</TabsTrigger>
          {showParametrosTab && <TabsTrigger value="parametros">Parametros</TabsTrigger>}
        </TabsList>

        <TabsContent value="detalle">
          <RubrosRubrosdialogDetalleTab
            methods={methods}
            isEditMode={isEditMode}
            loading={Boolean(loading) || isReadOnlyMode}
          />
        </TabsContent>

        {showParametrosTab && (
          <TabsContent value="parametros">
            <RubrosRubrosdialogParametrosTab
              methods={methods}
              loading={Boolean(loading) || isReadOnlyMode}
            />
          </TabsContent>
        )}
      </Tabs>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {!isReadOnlyMode && (
          <button
            type="submit"
            data-testid="rubros-rubrosdialog-submit"
            disabled={loading}
          >
            {loading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
          </button>
        )}
        {isReadOnlyMode && isEditMode && (
          <button
            type="button"
            data-testid="rubros-rubrosdialog-enable-edit"
            onClick={() => setIsReadOnlyMode(false)}
            disabled={loading}
          >
            Editar
          </button>
        )}
        {onCancel && (
          <button
            type="button"
            data-testid="rubros-rubrosdialog-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        )}
      </div>
    </Form>
  );
};
