import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DimensionItem,
  Field,
  Form,
  SectionCard,
  getDominioList,
  inputClassName,
  textAreaClassName,
  useDimensiones,
  useEmpresas,
  useProcedimientos,
} from "@shared/index";
import {
  CreateProcesosProcesosdialog,
  UpdateProcesosProcesosdialog,
  ProcesosProcesosdialog,
} from "@modules/procesos/domain/model/ProcesosProcesosdialog";

interface ProcesosProcesosdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ProcesosProcesosdialog;
  onSubmit: (
    data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog,
  ) => void;
  onCancel?: () => void;
  loading?: boolean;
  readOnly?: boolean;
}

interface ProcesosProcesosdialogFormValues {
  empresaId: string;
  procesoId: string;
  rolId: string;
  tipoProceso: string;
  tipoProcesoIc: string;
  storedProcEjecucion: string;
  storedProcReversion: string;
  storedProcContabilizacion: string;
  storedProcSalvarHistoricos: string;
  frecuenciaId: string;
  busquedaCpr: string;
  aplicaSobreMesAnterior: boolean;
}

export const ProcesosProcesosdialogForm: React.FC<
  ProcesosProcesosdialogFormProps
> = ({ initialData, onSubmit, onCancel, loading, readOnly = false }) => {
  const isEditMode = !!initialData;
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(readOnly);
  const [rolesOptions, setRolesOptions] = useState<DimensionItem[]>([]);
  const [frecuenciaOptions] = useState<DimensionItem[]>(
    getDominioList("FRECEJECUCIONPROCESOS").map((item) => ({
      id: item.id,
      codigoDimension: "FRECEJECUCIONPROCESOS",
      codigo: item.domId,
      descripcion: item.domText,
    })),
  );

  const { items: empresas, loading: loadingEmpresas } = useEmpresas();
  const { fetchItems, loading: loadingDimensiones } = useDimensiones();
  const { items: procedimientos, loading: loadingProcedimientos } =
    useProcedimientos();
  const buildProcedureOptions = (
  ) => {
    const options = new Map<string, string>();
    procedimientos.forEach((procedimiento) => {
      const value = procedimiento.nombreProcedimiento?.trim();
      if (!value) {
        return;
      }

      const label = procedimiento.tipo
        ? `${procedimiento.tipo} - ${value}`
        : value;

      options.set(value, label);
    });

    return Array.from(options.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  };

  const procedimientoOptions = buildProcedureOptions();

  const methods = useForm<ProcesosProcesosdialogFormValues>({
    defaultValues: {
      empresaId: "",
      procesoId: "",
      rolId: "",
      tipoProceso: "",
      tipoProcesoIc: "",
      storedProcEjecucion: "",
      storedProcReversion: "",
      storedProcContabilizacion: "",
      storedProcSalvarHistoricos: "",
      frecuenciaId: "",
      busquedaCpr: "",
      aplicaSobreMesAnterior: false,
    },
  });

  useEffect(() => {
    setIsReadOnlyMode(readOnly);
  }, [readOnly]);

  useEffect(() => {
    let isMounted = true;

    const loadCatalogs = async () => {
      const rolesResponse = await fetchItems("DMRO");

      if (!isMounted) {
        return;
      }

      setRolesOptions(rolesResponse?.items ?? []);
    };

    void loadCatalogs();

    return () => {
      isMounted = false;
    };
  }, [fetchItems]);

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        empresaId: "",
        procesoId: "",
        rolId: "",
        tipoProceso: "",
        tipoProcesoIc: "",
        storedProcEjecucion: "",
        storedProcReversion: "",
        storedProcContabilizacion: "",
        storedProcSalvarHistoricos: "",
        frecuenciaId: "",
        busquedaCpr: "",
        aplicaSobreMesAnterior: false,
      });
      return;
    }

    methods.reset({
      empresaId: String(initialData.empresaId),
      procesoId: String(initialData.procesoId)??1,
      rolId: initialData.rolId !== undefined ? String(initialData.rolId) : "",
      tipoProceso: initialData.tipoProceso,
      tipoProcesoIc: initialData.tipoProcesoIc ?? "",
      storedProcEjecucion: initialData.storedProcEjecucion ?? "",
      storedProcReversion: initialData.storedProcReversion ?? "",
      storedProcContabilizacion: initialData.storedProcContabilizacion ?? "",
      storedProcSalvarHistoricos: initialData.storedProcSalvarHistoricos ?? "",
      frecuenciaId: initialData.frecuenciaId ?? "",
      busquedaCpr: initialData.busquedaCpr ?? "",
      aplicaSobreMesAnterior: initialData.aplicaSobreMesAnterior ?? false,
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: ProcesosProcesosdialogFormValues) => {
    if (isReadOnlyMode) {
      return;
    }

    const baseData = {
      empresaId: Number(formValues.empresaId),
      procesoId: Number(formValues.procesoId),
      tipoProceso: formValues.tipoProceso.trim(),
      rolId: formValues.rolId ? Number(formValues.rolId) : undefined,
      tipoProcesoIc: formValues.tipoProcesoIc.trim() || undefined,
      storedProcEjecucion: formValues.storedProcEjecucion.trim() || undefined,
      storedProcReversion: formValues.storedProcReversion.trim() || undefined,
      storedProcContabilizacion:
        formValues.storedProcContabilizacion.trim() || undefined,
      storedProcSalvarHistoricos:
        formValues.storedProcSalvarHistoricos.trim() || undefined,
      frecuenciaId: formValues.frecuenciaId.trim() || undefined,
      busquedaCpr: formValues.busquedaCpr.trim() || undefined,
      aplicaSobreMesAnterior: formValues.aplicaSobreMesAnterior,
    };

    if (isEditMode) {
      onSubmit(baseData as UpdateProcesosProcesosdialog);
      return;
    }

    onSubmit(baseData as CreateProcesosProcesosdialog);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mt-1 text-sm text-slate-500">
            Define identificadores, procedimientos asociados y reglas operativas del proceso.
          </p>
        </div>
        {isReadOnlyMode ? (
          <div
            data-testid="procesos-procesosdialog-readonly-badge"
            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
          >
            Solo lectura
          </div>
        ) : null}
      </div>

      <Form
        methods={methods}
        onSubmit={handleSubmit}
        data-testid="procesos-procesosdialog-form"
        className="grid gap-4"
      >
        <SectionCard
          title="Datos principales"
          description="Captura la identificación del proceso y su configuración base."
          className="w-full"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Empresa"
              error={methods.formState.errors.empresaId?.message}
            >
              <select
                className={inputClassName(Boolean(methods.formState.errors.empresaId))}
                data-testid="procesos-procesosdialog-empresaid"
                {...methods.register("empresaId", {
                  required: "Empresa es obligatoria",
                  validate: (value) =>
                    !Number.isNaN(Number(value)) || "Debe ser un numero",
                })}
                disabled={Boolean(loading) || Boolean(loadingEmpresas) || isReadOnlyMode}
              >
                <option value="">Selecciona empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.iidempresa} value={empresa.iidempresa}>
                    {empresa.vempresanl}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Proceso"
              error={methods.formState.errors.tipoProcesoIc?.message}
            >
              <input
                className={inputClassName(Boolean(methods.formState.errors.tipoProcesoIc))}
                data-testid="procesos-procesosdialog-tipoProcesoIc"
                {...methods.register("tipoProcesoIc", {
                  required: "Proceso es obligatorio",
                  validate: (value) =>
                    !Number.isNaN(Number(value)) || "Debe ser un numero",
                })}
                disabled={Boolean(loading) || isReadOnlyMode}
              />
            </Field>

            <Field label="Rol" error={methods.formState.errors.rolId?.message}>
              <select
                className={inputClassName(Boolean(methods.formState.errors.rolId))}
                data-testid="procesos-procesosdialog-rolid"
                {...methods.register("rolId", {
                  required: "Rol es obligatorio",
                  validate: (value) =>
                    !value || !Number.isNaN(Number(value)) || "Debe ser un numero",
                })}
                disabled={Boolean(loading) || Boolean(loadingDimensiones) || isReadOnlyMode}
              >
                <option value="">Selecciona rol</option>
                {rolesOptions.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.descripcion}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Frecuencia de ejecución" error={methods.formState.errors.frecuenciaId?.message}>
              <select
                className={inputClassName()}
                data-testid="procesos-procesosdialog-frecuenciaid"
                {...methods.register("frecuenciaId")}
                disabled={Boolean(loading) || Boolean(loadingDimensiones) || isReadOnlyMode}
              >
                <option value="">Selecciona frecuencia</option>
                {frecuenciaOptions.map((frecuencia) => (
                  <option key={frecuencia.id} value={frecuencia.codigo}>
                    {frecuencia.descripcion}
                  </option>
                ))}
              </select>
            </Field>

          </div>
        </SectionCard>

        <SectionCard
          title="Procedimientos"
          description="Relaciona los stored procedures que participan en la ejecución y reversión del proceso."
          className="w-full"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Proceso de Ejecución">
              <select
                className={inputClassName()}
                data-testid="procesos-procesosdialog-storedprocejec"
                {...methods.register("storedProcEjecucion")}
                disabled={
                  Boolean(loading) ||
                  Boolean(loadingProcedimientos) ||
                  isReadOnlyMode
                }
              >
                <option value="">Selecciona procedimiento</option>
                {procedimientoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Proceso de Reversión">
              <select
                className={inputClassName()}
                data-testid="procesos-procesosdialog-storedprocrev"
                {...methods.register("storedProcReversion")}
                disabled={
                  Boolean(loading) ||
                  Boolean(loadingProcedimientos) ||
                  isReadOnlyMode
                }
              >
                <option value="">Selecciona procedimiento</option>
                {procedimientoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Proceso de Contabilización">
              <select
                className={inputClassName()}
                data-testid="procesos-procesosdialog-storedproccont"
                {...methods.register("storedProcContabilizacion")}
                disabled={
                  Boolean(loading) ||
                  Boolean(loadingProcedimientos) ||
                  isReadOnlyMode
                }
              >
                <option value="">Selecciona procedimiento</option>
                {procedimientoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Proceso para Salvar Historicos">
              <select
                className={inputClassName()}
                data-testid="procesos-procesosdialog-storedprocsalv"
                {...methods.register("storedProcSalvarHistoricos")}
                disabled={
                  Boolean(loading) ||
                  Boolean(loadingProcedimientos) ||
                  isReadOnlyMode
                }
              >
                <option value="">Selecciona procedimiento</option>
                {procedimientoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <div className="md:col-span-2">
              <Field
                label="Observaciones"
                error={methods.formState.errors.busquedaCpr?.message}
              >
                <textarea
                  className={textAreaClassName(
                    Boolean(methods.formState.errors.busquedaCpr),
                  )}
                  data-testid="procesos-procesosdialog-busquedacpr"
                  {...methods.register("busquedaCpr", {
                    maxLength: {
                      value: 10,
                      message: "Maximo 10 caracteres",
                    },
                  })}
                  maxLength={10}
                  disabled={Boolean(loading) || isReadOnlyMode}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          {!isReadOnlyMode ? (
            <Button
              type="submit"
              label={loading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
              isLoading={loading}
            />
          ) : null}
          {isReadOnlyMode && isEditMode ? (
            <Button
              type="button"
              testId="procesos-procesosdialog-enable-edit"
              label="Editar"
              variant="secondary"
              onClick={() => setIsReadOnlyMode(false)}
              disabled={loading}
            />
          ) : null}
          {onCancel ? (
            <Button
              type="button"
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
