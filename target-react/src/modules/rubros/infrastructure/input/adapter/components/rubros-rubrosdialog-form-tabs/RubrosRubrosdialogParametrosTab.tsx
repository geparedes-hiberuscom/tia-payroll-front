import React, { useState } from "react";
import { RubrosRubrosdialogParametrosTabProps } from "./types";
import { MultiSelectList } from "../../../../../../../shared/infrastructure/input/adapter/components/MultiSelectList";
import { DragDropListWithOrder } from "@shared/infrastructure/input/adapter/components/DragDropListWithOrder";

export const RubrosRubrosdialogParametrosTab: React.FC<
  RubrosRubrosdialogParametrosTabProps
> = ({ methods, loading, empresas = [], cargos = [], roles = [] }) => {
  const formValues = methods.watch();
  const [selectedOption, setSelectedOption] = useState("DMCG");

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <label>
        Empresa
        <select
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
      </label>

      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
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

      <label>
        Antiguedad Laboral (meses)
        <input
          data-testid="rubros-rubrosdialog-field-antiguedad-minima"
          type="number"
          value={formValues.antiguedadMinima}
          onChange={(event) =>
            methods.setValue("antiguedadMinima", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Plazo Mínimo (meses)
        <input
          data-testid="rubros-rubrosdialog-field-plazo-minimo"
          type="number"
          value={formValues.plazoMinimo}
          onChange={(event) =>
            methods.setValue("plazoMinimo", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Plazo Máximo (meses)
        <input
          data-testid="rubros-rubrosdialog-field-plazo-maximo"
          type="number"
          value={formValues.plazoMaximo}
          onChange={(event) =>
            methods.setValue("plazoMaximo", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Monto Máximo ($)
        <input
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
      </label>

      <div>
        <label>
          Roles y Cargos que Aplican
          <select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            disabled={loading}
          >
            <option value="DMCG">Cargos</option>
            <option value="DMRO">Grupos de empleados</option>
          </select>
        </label>

        {selectedOption === "DMCG" && (
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
        )}
      </div>
      {selectedOption === "DMRO" && (
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
      )}

      <label>
        Número Aprobaciones
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones"
          type="number"
          value={formValues.numAprobaciones}
          onChange={(event) =>
            methods.setValue("numAprobaciones", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

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

      <label>
        Número Aprobaciones No Locales
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones-no-locales"
          type="number"
          value={formValues.numAprobacionesNoLocales}
          onChange={(event) =>
            methods.setValue("numAprobacionesNoLocales", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>
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
    </div>
  );
};
