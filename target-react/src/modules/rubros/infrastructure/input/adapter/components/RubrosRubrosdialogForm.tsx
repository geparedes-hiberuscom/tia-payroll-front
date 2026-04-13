import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DimensionItem,
  ErrorBanner,
  Form,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useDimensiones,
  useEmpresas,
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
import { useClasesrubro } from "../hooks";

interface RubrosRubrosdialogFormProps {
  initialData?: RubrosRubrosdialog;
  onSubmit: (data: CreateRubrosRubrosdialog | UpdateRubrosRubrosdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
  readOnly?: boolean;
  error?: string;
}

const defaultFormValues: RubrosRubrosdialogFormValues = {
  idRubro: "",
  nombre: "",
  ambito: "-1",
  efecto: "-1",
  observaciones: "",
  procedimientoCalculo: "",
  rubroHistorico: "",
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
  clases: [],
  iidempresa: "-1",
  cargosQueAplican: [],
  rolesQueAplican: [],
  cargosQueApruebanAlmacen: [],
  cargosQueApruebanOficina: [],
};

export const RubrosRubrosdialogForm: React.FC<RubrosRubrosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  readOnly = false,
  error,
}) => {
  const isEditMode = Boolean(initialData);
  const [activeTab, setActiveTab] = useState("detalle");
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(readOnly);
  const methods = useForm<RubrosRubrosdialogFormValues>({
    defaultValues: defaultFormValues,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [cargos, setCargos] = useState<DimensionItem[]>([]);
  const [roles, setRoles] = useState<DimensionItem[]>([]);

  const { items: clasesRubrosItems } = useClasesrubro();
  const { items: empresasItems } = useEmpresas();
  const { fetchItems } = useDimensiones();

  useEffect(() => {
    function loadDimensiones() {
      fetchItems("DMCG").then((data) => {
        setCargos(data?.items ?? []);
      });
      fetchItems("DMRO").then((data) => {
        setRoles(data?.items ?? []);
      });
    }
    setIsReadOnlyMode(readOnly);
    loadDimensiones();
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
      rubroHistorico:
        initialData.rubroHistorico !== undefined
          ? String(initialData.rubroHistorico)
          : "",
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
      clases: initialData.clases
        ? initialData.clases.map((v) => Number(v)).filter((v) => !isNaN(v))
        : [],
      iidempresa:
        initialData.iidempresa !== undefined
          ? String(initialData.iidempresa)
          : "-1",
      cargosQueAplican: initialData.cargosQueAplican ?? [],
      rolesQueAplican: initialData.rolesQueAplican ?? [],
      cargosQueApruebanAlmacen: (
        initialData.cargosQueApruebanAlmacen ?? []
      ).map((item, index) => ({
        id: item,
        orden: index,
      })),
      cargosQueApruebanOficina: (
        initialData.cargosQueApruebanOficina ?? []
      ).map((item, index) => ({
        id: item,
        orden: index,
      })),
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
    if (
      !isEditMode &&
      !/^[A-Za-z0-9_-]{2,30}$/.test(formValues.idRubro.trim())
    ) {
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
        procedimientoCalculo:
          formValues.procedimientoCalculo.trim() || undefined,
        rubroHistorico: parseOptionalNumber(formValues.rubroHistorico),
        secuenciaImpresion: parseOptionalNumber(formValues.secuenciaImpresion),
        secuenciaSobregiro: parseOptionalNumber(formValues.secuenciaSobregiro),
        aplicaInterfaz: formValues.aplicaInterfaz,
        insertaEnLote: formValues.insertaEnLote,
        carta: formValues.carta.trim() || undefined,
        antiguedadMinima: parseOptionalNumber(formValues.antiguedadMinima),
        numAprobaciones: parseOptionalNumber(formValues.numAprobaciones),
        numAprobacionesNoLocales: parseOptionalNumber(
          formValues.numAprobacionesNoLocales,
        ),
        plazoMaximo: parseOptionalNumber(formValues.plazoMaximo),
        plazoMinimo: parseOptionalNumber(formValues.plazoMinimo),
        montoMaximo: parseOptionalNumber(formValues.montoMaximo),
        verificaEndeudamiento: formValues.verificaEndeudamiento,
        acumulable: formValues.acumulable,
        iidempresa:
          formValues.iidempresa !== "-1"
            ? parseOptionalNumber(formValues.iidempresa)
            : undefined,
        cargosQueAplican:
          formValues.cargosQueAplican.length > 0
            ? (formValues.cargosQueAplican as number[])
            : undefined,
        rolesQueAplican:
          formValues.rolesQueAplican.length > 0
            ? (formValues.rolesQueAplican as number[])
            : undefined,
        cargosQueApruebanAlmacen:
          formValues.cargosQueApruebanAlmacen.length > 0
            ? formValues.cargosQueApruebanAlmacen.map((item) => ({
                iiddimensionesl: item.id,
                iordenaprobacion: item.orden,
              }))
            : undefined,
        cargosQueApruebanOficina:
          formValues.cargosQueApruebanOficina.length > 0
            ? formValues.cargosQueApruebanOficina.map((item) => ({
                iiddimensionesl: item.id,
                iordenaprobacion: item.orden,
              }))
            : undefined,
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
      numAprobacionesNoLocales: parseOptionalNumber(
        formValues.numAprobacionesNoLocales,
      ),
      plazoMaximo: parseOptionalNumber(formValues.plazoMaximo),
      plazoMinimo: parseOptionalNumber(formValues.plazoMinimo),
      montoMaximo: parseOptionalNumber(formValues.montoMaximo),
      verificaEndeudamiento: formValues.verificaEndeudamiento,
      acumulable: formValues.acumulable,
      iidempresa:
        formValues.iidempresa !== "-1"
          ? parseOptionalNumber(formValues.iidempresa)
          : undefined,
      cargosQueAplican:
        formValues.cargosQueAplican.length > 0
          ? (formValues.cargosQueAplican as number[])
          : undefined,
      rolesQueAplican:
        formValues.rolesQueAplican.length > 0
          ? (formValues.rolesQueAplican as number[])
          : undefined,
      cargosQueApruebanAlmacen:
        formValues.cargosQueApruebanAlmacen.length > 0
          ? formValues.cargosQueApruebanAlmacen.map((item) => ({
              iiddimensionesl: item.id,
              iordenaprobacion: item.orden,
            }))
          : undefined,
      cargosQueApruebanOficina:
        formValues.cargosQueApruebanOficina.length > 0
          ? formValues.cargosQueApruebanOficina.map((item) => ({
              iiddimensionesl: item.id,
              iordenaprobacion: item.orden,
            }))
          : undefined,
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
          {showParametrosTab && (
            <TabsTrigger value="parametros">Parametros</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="detalle">
          <RubrosRubrosdialogDetalleTab
            methods={methods}
            isEditMode={isEditMode}
            loading={Boolean(loading) || isReadOnlyMode}
            clases={clasesRubrosItems}
          />
        </TabsContent>

        {showParametrosTab && (
          <TabsContent value="parametros">
            <RubrosRubrosdialogParametrosTab
              methods={methods}
              loading={Boolean(loading) || isReadOnlyMode}
              empresas={empresasItems}
              cargos={cargos}
              roles={roles}
            />
          </TabsContent>
        )}
      </Tabs>
      {error && <ErrorBanner message={error} />}
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
