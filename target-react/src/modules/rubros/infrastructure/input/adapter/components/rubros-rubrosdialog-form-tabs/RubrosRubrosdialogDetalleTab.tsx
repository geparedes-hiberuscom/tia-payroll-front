import React from "react";
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTabProps,
} from "./types";
import {
  Field,
  checkboxClassName,
  inputClassName,
  textAreaClassName,
  MultiSelectList,
} from "@shared/infrastructure/input/adapter/components/ui/molecules";

export const RubrosRubrosdialogDetalleTab: React.FC<
  RubrosRubrosdialogDetalleTabProps
> = ({
  methods,
  isEditMode,
  loading,
  clases = [],
  procedimientos = [],
  fieldErrors = {},
}) => {
  const formValues = methods.watch();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="ID Rubro" error={fieldErrors.idRubro}>
        <input
          className={inputClassName(Boolean(fieldErrors.idRubro))}
          data-testid="rubros-rubrosdialog-field-idrubro"
          value={formValues.idRubro}
          onChange={(event) => methods.setValue("idRubro", event.target.value)}
          required={!isEditMode}
          pattern="[A-Za-z0-9_-]{2,30}"
          disabled={loading || isEditMode}
        />
      </Field>

      <Field label="Nombre" error={fieldErrors.nombre}>
        <input
          className={inputClassName(Boolean(fieldErrors.nombre))}
          data-testid="rubros-rubrosdialog-field-nombre"
          value={formValues.nombre}
          onChange={(event) => methods.setValue("nombre", event.target.value)}
          maxLength={120}
          disabled={loading}
        />
      </Field>

      <Field label="Ambito" error={fieldErrors.ambito}>
        <select
          className={inputClassName(Boolean(fieldErrors.ambito))}
          data-testid="rubros-rubrosdialog-field-ambito"
          value={formValues.ambito}
          onChange={(event) =>
            methods.setValue("ambito", event.target.value as AmbitoSelectValue)
          }
          required
          disabled={loading}
        >
          <option value="-1"> </option>
          <option value="NA">No Aplica</option>
          <option value="IDO">Ingreso Deduccion Otros</option>
          <option value="PTM">Prestamos</option>
        </select>
      </Field>

      <Field label="Efecto" error={fieldErrors.efecto}>
        <select
          className={inputClassName(Boolean(fieldErrors.efecto))}
          data-testid="rubros-rubrosdialog-field-efecto"
          value={formValues.efecto}
          onChange={(event) =>
            methods.setValue("efecto", event.target.value as EfectoSelectValue)
          }
          required
          disabled={loading}
        >
          <option value="-1"> </option>
          <option value="ING">Ingreso</option>
          <option value="EGR">Egreso</option>
          <option value="NA">Ninguno</option>
        </select>
      </Field>

      <Field
        label="Secuencia Impresion"
        error={fieldErrors.secuenciaImpresion}
      >
        <input
          className={inputClassName(Boolean(fieldErrors.secuenciaImpresion))}
          data-testid="rubros-rubrosdialog-field-secuencia-impresion"
          type="number"
          value={formValues.secuenciaImpresion}
          onChange={(event) =>
            methods.setValue("secuenciaImpresion", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <Field
        label="Secuencia Sobregiro"
        error={fieldErrors.secuenciaSobregiro}
      >
        <input
          className={inputClassName(Boolean(fieldErrors.secuenciaSobregiro))}
          data-testid="rubros-rubrosdialog-field-secuencia-sobregiro"
          type="number"
          value={formValues.secuenciaSobregiro}
          onChange={(event) =>
            methods.setValue("secuenciaSobregiro", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <Field
        label="Procedimiento"
        error={fieldErrors.procedimientoCalculo}
      >
        <select
          className={inputClassName(Boolean(fieldErrors.procedimientoCalculo))}
          data-testid="rubros-rubrosdialog-field-procedimientoCalculo"
          value={formValues.procedimientoCalculo}
          onChange={(event) =>
            methods.setValue("procedimientoCalculo", event.target.value)
          }
          disabled={loading}
        >
          <option value="">Selecciona procedimiento</option>
          {procedimientos.map((procedimiento) => (
            <option key={procedimiento.value} value={procedimiento.value}>
              {procedimiento.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Id Rubro Homologacion" error={fieldErrors.rubroHistorico}>
        <input
          className={inputClassName(Boolean(fieldErrors.rubroHistorico))}
          data-testid="rubros-rubrosdialog-field-rubro-historico"
          type="number"
          value={formValues.rubroHistorico}
          onChange={(event) =>
            methods.setValue("rubroHistorico", event.target.value)
          }
          disabled={loading}
        />
      </Field>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
        <p className="text-sm font-medium text-slate-700">
          Opciones de integracion
        </p>
        <div className="mt-3 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              className={checkboxClassName()}
              data-testid="rubros-rubrosdialog-field-aplica-interfaz"
              type="checkbox"
              checked={formValues.aplicaInterfaz}
              onChange={(event) =>
                methods.setValue("aplicaInterfaz", event.target.checked)
              }
              disabled={loading}
            />
            Aplica Interfaz
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              className={checkboxClassName()}
              data-testid="rubros-rubrosdialog-field-inserta-en-lote"
              type="checkbox"
              checked={formValues.insertaEnLote}
              onChange={(event) =>
                methods.setValue("insertaEnLote", event.target.checked)
              }
              disabled={loading}
            />
            Inserta En Lote
          </label>
        </div>
      </div>

      <Field
        label="Observaciones"
        hint="Describe reglas o notas operativas del rubro."
        error={fieldErrors.observaciones}
        className="col-span-full"
      >
        <textarea
          className={textAreaClassName(Boolean(fieldErrors.observaciones))}
          data-testid="rubros-rubrosdialog-field-observaciones"
          value={formValues.observaciones}
          onChange={(event) =>
            methods.setValue("observaciones", event.target.value)
          }
          maxLength={255}
          disabled={loading}
        />
      </Field>

      <div className="md:col-span-2">
        <MultiSelectList
          label="Clases"
          options={clases.map((clase) => ({
            id: clase.id,
            label: clase.nombre,
          }))}
          selectedIds={formValues.clases}
          onChange={(selectedIds) =>
            methods.setValue("clases", selectedIds as number[])
          }
          disabled={loading}
          testId="rubros-rubrosdialog-field-clases"
        />
        {fieldErrors.clases ? (
          <p className="mt-2 text-xs font-medium text-rose-600">{fieldErrors.clases}</p>
        ) : null}
      </div>
    </div>
  );
};
