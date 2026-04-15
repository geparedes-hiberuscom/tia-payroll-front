import React, { useState } from "react";
import { RubrosRubrosdialogParametrosTabProps } from "./types";
import { MultiSelectList } from "@shared/infrastructure/input/adapter/components/ui";
import { DragDropListWithOrder } from "@shared/infrastructure/input/adapter/components/DragDropListWithOrder";
import {
  Field,
  checkboxClassName,
  inputClassName,
} from "@shared/infrastructure/input/adapter/components/ui/molecules";

export const RubrosRubrosdialogParametrosTab: React.FC<
  RubrosRubrosdialogParametrosTabProps
> = ({ methods, loading, empresas = [], cargos = [], roles = [], fieldErrors = {} }) => {
  const formValues = methods.watch();
  const [selectedOption, setSelectedOption] = useState("DMCG");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Empresa" error={fieldErrors.iidempresa}>
        <select
          className={inputClassName(Boolean(fieldErrors.iidempresa))}
          data-testid="rubros-rubrosdialog-field-iidempresa"
          value={formValues.iidempresa}
          onChange={(event) =>
            methods.setValue("iidempresa", event.target.value)
          }
          disabled={loading}
        >
          <option value="-1"> </option>
          {empresas?.map((empresa) => (
            <option key={empresa.iidempresa} value={empresa.iidempresa}>
              {empresa.vempresanl}
            </option>
          ))}
        </select>
      </Field>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            className={checkboxClassName()}
            data-testid="rubros-rubrosdialog-field-verifica-endeudamiento"
            type="checkbox"
            checked={formValues.verificaEndeudamiento}
            onChange={(event) =>
              methods.setValue("verificaEndeudamiento", event.target.checked)
            }
            disabled={loading}
          />
          Endeudamientos (si/no)
        </label>
      </div>

      <Field
        label="Antiguedad Laboral (meses)"
        error={fieldErrors.antiguedadMinima}
      >
        <input
          className={inputClassName(Boolean(fieldErrors.antiguedadMinima))}
          data-testid="rubros-rubrosdialog-field-antiguedad-minima"
          type="number"
          value={formValues.antiguedadMinima}
          onChange={(event) =>
            methods.setValue("antiguedadMinima", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <Field label="Plazo Minimo (meses)" error={fieldErrors.plazoMinimo}>
        <input
          className={inputClassName(Boolean(fieldErrors.plazoMinimo))}
          data-testid="rubros-rubrosdialog-field-plazo-minimo"
          type="number"
          value={formValues.plazoMinimo}
          onChange={(event) =>
            methods.setValue("plazoMinimo", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <Field label="Plazo Maximo (meses)" error={fieldErrors.plazoMaximo}>
        <input
          className={inputClassName(Boolean(fieldErrors.plazoMaximo))}
          data-testid="rubros-rubrosdialog-field-plazo-maximo"
          type="number"
          value={formValues.plazoMaximo}
          onChange={(event) =>
            methods.setValue("plazoMaximo", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <Field label="Monto Maximo ($)" error={fieldErrors.montoMaximo}>
        <input
          className={inputClassName(Boolean(fieldErrors.montoMaximo))}
          data-testid="rubros-rubrosdialog-field-monto-maximo"
          type="number"
          value={formValues.montoMaximo}
          onChange={(event) =>
            methods.setValue("montoMaximo", event.target.value)
          }
          min={0}
          step="0.01"
          disabled={loading}
        />
      </Field>

      <div className="md:col-span-2">
        <Field
          label="Roles y Cargos que Aplican"
          error={fieldErrors.cargosQueAplican ?? fieldErrors.rolesQueAplican}
        >
          <select
            className={inputClassName(
              Boolean(fieldErrors.cargosQueAplican ?? fieldErrors.rolesQueAplican),
            )}
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            disabled={loading}
          >
            <option value="DMCG">Cargos</option>
            <option value="DMRO">Grupos de empleados</option>
          </select>
        </Field>

        {selectedOption === "DMCG" ? (
          <MultiSelectList
            label=""
            options={
              cargos?.map((cargo) => ({
                id: cargo.id,
                label: cargo.descripcion,
              })) || []
            }
            selectedIds={formValues.cargosQueAplican}
            onChange={(selectedIds) =>
              methods.setValue("cargosQueAplican", selectedIds as number[])
            }
            disabled={loading}
            testId="rubros-rubrosdialog-field-cargos-que-aplican"
          />
        ) : null}
        {fieldErrors.cargosQueAplican || fieldErrors.rolesQueAplican ? (
          <p className="mt-2 text-xs font-medium text-rose-600">
            {fieldErrors.cargosQueAplican ?? fieldErrors.rolesQueAplican}
          </p>
        ) : null}
      </div>
      {selectedOption === "DMRO" ? (
        <MultiSelectList
          label=""
          options={
            roles?.map((role) => ({ id: role.id, label: role.descripcion })) ||
            []
          }
          selectedIds={formValues.rolesQueAplican}
          onChange={(selectedIds) =>
            methods.setValue("rolesQueAplican", selectedIds as number[])
          }
          disabled={loading}
          testId="rubros-rubrosdialog-field-roles-que-aplican"
        />
      ) : null}

      <Field label="Numero Aprobaciones" error={fieldErrors.numAprobaciones}>
        <input
          className={inputClassName(Boolean(fieldErrors.numAprobaciones))}
          data-testid="rubros-rubrosdialog-field-num-aprobaciones"
          type="number"
          value={formValues.numAprobaciones}
          onChange={(event) =>
            methods.setValue("numAprobaciones", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>

      <div className="md:col-span-2">
        <DragDropListWithOrder
          label="Cargos que Aprueban en Almacen"
          items={formValues.cargosQueApruebanAlmacen}
          availableItems={
            cargos?.map((cargo) => ({
              id: cargo.id,
              label: cargo.descripcion,
            })) || []
          }
          onChange={(items) =>
            methods.setValue("cargosQueApruebanAlmacen", items)
          }
          disabled={loading}
          testId="rubros-rubrosdialog-field-cargos-aprueban-almacen"
        />
        {fieldErrors.cargosQueApruebanAlmacen ? (
          <p className="mt-2 text-xs font-medium text-rose-600">{fieldErrors.cargosQueApruebanAlmacen}</p>
        ) : null}
      </div>

      <Field
        label="Numero Aprobaciones No Locales"
        error={fieldErrors.numAprobacionesNoLocales}
      >
        <input
          className={inputClassName(Boolean(fieldErrors.numAprobacionesNoLocales))}
          data-testid="rubros-rubrosdialog-field-num-aprobaciones-no-locales"
          type="number"
          value={formValues.numAprobacionesNoLocales}
          onChange={(event) =>
            methods.setValue("numAprobacionesNoLocales", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </Field>
      <div className="md:col-span-2">
        <DragDropListWithOrder
          label="Cargos que Aprueban en Oficina"
          items={formValues.cargosQueApruebanOficina}
          availableItems={
            cargos?.map((cargo) => ({
              id: cargo.id,
              label: cargo.descripcion,
            })) || []
          }
          onChange={(items) =>
            methods.setValue("cargosQueApruebanOficina", items)
          }
          disabled={loading}
          testId="rubros-rubrosdialog-field-cargos-aprueban-oficina"
        />
        {fieldErrors.cargosQueApruebanOficina ? (
          <p className="mt-2 text-xs font-medium text-rose-600">{fieldErrors.cargosQueApruebanOficina}</p>
        ) : null}
      </div>
    </div>
  );
};
