import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DimensionItem,
  ErrorBanner,
  Form,
  SectionCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useDimensiones,
  useEmpresas,
} from '@shared/index';
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTab,
  RubrosRubrosdialogFormFieldErrors,
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
import { useRubrosCatalogs } from '../hooks/useRubrosCatalogs';

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
  const [fieldErrors, setFieldErrors] =
    useState<RubrosRubrosdialogFormFieldErrors>({});
  const [cargos, setCargos] = useState<DimensionItem[]>([]);
  const [roles, setRoles] = useState<DimensionItem[]>([]);

  const { items: clasesRubrosItems } = useClasesrubro();
  const { items: empresasItems } = useEmpresas();
  const { procedimientos, loading: loadingProcedimientos } = useRubrosCatalogs({
    loadRubros: false,
    loadProcedimientos: true,
  });
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
    const nextFieldErrors: RubrosRubrosdialogFormFieldErrors = {};

    const add = (
      message: string,
      field?: keyof RubrosRubrosdialogFormValues,
    ) => {
      nextErrors.push(message);
      if (field && !nextFieldErrors[field]) {
        nextFieldErrors[field] = message;
      }
    };

    const parseNumberField = (
      value: string,
      label: string,
      field: keyof RubrosRubrosdialogFormValues,
      options?: { integer?: boolean; min?: number },
    ): number | undefined => {
      const trimmed = value.trim();
      if (!trimmed) {
        add(`${label} es obligatorio.`, field);
        return undefined;
      }

      const parsed = Number(trimmed);
      if (Number.isNaN(parsed)) {
        add(`${label} debe ser un numero valido.`, field);
        return undefined;
      }

      if (options?.integer && !Number.isInteger(parsed)) {
        add(`${label} debe ser un numero entero.`, field);
        return undefined;
      }

      if (options?.min !== undefined && parsed < options.min) {
        add(`${label} debe ser mayor o igual a ${options.min}.`, field);
        return undefined;
      }

      return parsed;
    };

    if (
      !isEditMode &&
      !/^[A-Za-z0-9_-]{2,30}$/.test(formValues.idRubro.trim())
    ) {
      add(
        "El ID de rubro debe tener entre 2 y 30 caracteres alfanumericos.",
        "idRubro",
      );
    }

    if (!formValues.idRubro.trim()) {
      add("El ID de rubro es obligatorio.", "idRubro");
    }

    if (!formValues.nombre.trim()) {
      add("El nombre es obligatorio.", "nombre");
    }

    if (formValues.nombre.trim().length > 120) {
      add("El nombre no puede exceder 120 caracteres.", "nombre");
    }

    if (formValues.carta.trim().length > 10) {
      add("Carta no puede exceder 10 caracteres.");
    }

    if (formValues.ambito === "-1") {
      add("Ambito es obligatorio.", "ambito");
    }

    if (formValues.efecto === "-1") {
      add("Efecto es obligatorio.", "efecto");
    }

    if (!formValues.procedimientoCalculo.trim()) {
      add("Procedimiento es obligatorio.", "procedimientoCalculo");
    }

    parseNumberField(
      formValues.rubroHistorico,
      "Id Rubro Homologacion",
      "rubroHistorico",
    );
    parseNumberField(
      formValues.secuenciaImpresion,
      "Secuencia Impresion",
      "secuenciaImpresion",
      {
        integer: true,
        min: 0,
      },
    );
    parseNumberField(
      formValues.secuenciaSobregiro,
      "Secuencia Sobregiro",
      "secuenciaSobregiro",
      {
        integer: true,
        min: 0,
      },
    );

    if (formValues.ambito === "PTM") {
      setActiveTab("parametros");

      if (formValues.iidempresa === "-1") {
        add("Empresa es obligatoria para ambito PTM.", "iidempresa");
      }

      const antiguedad = parseNumberField(
        formValues.antiguedadMinima,
        "Antiguedad Laboral",
        "antiguedadMinima",
        {
          integer: true,
          min: 0,
        },
      );
      if (antiguedad !== undefined && antiguedad <= 6) {
        add("Antiguedad Laboral debe ser mayor a 6 meses.", "antiguedadMinima");
      }

      const plazoMinimo = parseNumberField(
        formValues.plazoMinimo,
        "Plazo Minimo",
        "plazoMinimo",
        {
          integer: true,
          min: 1,
        },
      );
      const plazoMaximo = parseNumberField(
        formValues.plazoMaximo,
        "Plazo Maximo",
        "plazoMaximo",
        {
          integer: true,
          min: 1,
        },
      );
      if (
        plazoMinimo !== undefined &&
        plazoMaximo !== undefined &&
        plazoMinimo >= plazoMaximo
      ) {
        add("Plazo Minimo siempre debe ser menor a Plazo Maximo.", "plazoMinimo");
      }

      parseNumberField(
        formValues.montoMaximo,
        "Monto Maximo",
        "montoMaximo",
        {
          min: 0,
        },
      );

      if (
        formValues.cargosQueAplican.length === 0 &&
        formValues.rolesQueAplican.length === 0
      ) {
        add(
          "Debes seleccionar al menos un cargo o un grupo de empleados que aplica.",
          "cargosQueAplican",
        );
      }

      const numAprobaciones = parseNumberField(
        formValues.numAprobaciones,
        "Numero Aprobaciones",
        "numAprobaciones",
        {
          integer: true,
          min: 1,
        },
      );
      const numAprobacionesNoLocales = parseNumberField(
        formValues.numAprobacionesNoLocales,
        "Numero Aprobaciones No Locales",
        "numAprobacionesNoLocales",
        {
          integer: true,
          min: 1,
        },
      );

      const totalAprobadoresAlmacen = formValues.cargosQueApruebanAlmacen.length;
      const totalAprobadoresOficina = formValues.cargosQueApruebanOficina.length;

      if (totalAprobadoresAlmacen < 2) {
        add(
          "Debes elegir al menos dos cargos de aprobacion en almacen.",
          "cargosQueApruebanAlmacen",
        );
      }

      if (totalAprobadoresOficina < 2) {
        add(
          "Debes elegir al menos dos cargos de aprobacion en oficina.",
          "cargosQueApruebanOficina",
        );
      }

      if (
        numAprobaciones !== undefined &&
        numAprobaciones !== totalAprobadoresAlmacen
      ) {
        add(
          "Numero Aprobaciones debe coincidir con la cantidad de cargos que aprueban en almacen.",
          "numAprobaciones",
        );
      }

      if (
        numAprobacionesNoLocales !== undefined &&
        numAprobacionesNoLocales !== totalAprobadoresOficina
      ) {
        add(
          "Numero Aprobaciones No Locales debe coincidir con la cantidad de cargos que aprueban en oficina.",
          "numAprobacionesNoLocales",
        );
      }
    }

    setFieldErrors(nextFieldErrors);
    return nextErrors;
  };

  const handleSubmit = (formValues: RubrosRubrosdialogFormValues) => {
    if (isReadOnlyMode) {
      return;
    }

    const nextErrors = validate(formValues);
    if (nextErrors.length > 0) {
      return;
    }
    setFieldErrors({});

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
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mt-1 text-sm text-slate-500">
            Configura datos base, comportamiento y parametros operativos del rubro.
          </p>
        </div>
        {isReadOnlyMode ? (
          <div
            data-testid="rubros-rubrosdialog-readonly-badge"
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
          >
            Solo lectura
          </div>
        ) : null}
      </div>

      {error ? <ErrorBanner message={error} /> : null}

      <Form
        methods={methods}
        onSubmit={handleSubmit}
        data-testid="rubros-rubrosdialog-form"
        className="grid gap-4"
      >
        <SectionCard className="w-full"
          title="Configuracion del rubro"
          description="Completa la informacion base en Detalle y, cuando aplique, parametros de aprobacion para Préstamos."
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList aria-label="Secciones del formulario de rubros">
              <TabsTrigger value="detalle">Detalle</TabsTrigger>
              {showParametrosTab ? (
                <TabsTrigger value="parametros">Parametros</TabsTrigger>
              ) : null}
            </TabsList>

            <TabsContent value="detalle">
              <RubrosRubrosdialogDetalleTab
                methods={methods}
                isEditMode={isEditMode}
                loading={Boolean(loading) || Boolean(loadingProcedimientos) || isReadOnlyMode}
                clases={clasesRubrosItems}
                procedimientos={procedimientos}
                fieldErrors={fieldErrors}
              />
            </TabsContent>

            {showParametrosTab ? (
              <TabsContent value="parametros">
                <RubrosRubrosdialogParametrosTab
                  methods={methods}
                  loading={Boolean(loading) || isReadOnlyMode}
                  empresas={empresasItems}
                  cargos={cargos}
                  roles={roles}
                  fieldErrors={fieldErrors}
                />
              </TabsContent>
            ) : null}
          </Tabs>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          {!isReadOnlyMode ? (
            <Button
              type="submit"
              testId="rubros-rubrosdialog-submit"
              label={loading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
              isLoading={loading}
            />
          ) : null}
          {isReadOnlyMode && isEditMode ? (
            <Button
              type="button"
              testId="rubros-rubrosdialog-enable-edit"
              label="Editar"
              variant="secondary"
              onClick={() => setIsReadOnlyMode(false)}
              disabled={loading}
            />
          ) : null}
          {onCancel ? (
            <Button
              type="button"
              testId="rubros-rubrosdialog-cancel"
              label="Cancelar"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            />
          ) : null}
        </div>
      </Form>
    </div>
  );
};
