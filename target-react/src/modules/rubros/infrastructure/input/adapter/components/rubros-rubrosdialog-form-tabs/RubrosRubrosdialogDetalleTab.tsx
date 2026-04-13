import React from "react";
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTabProps,
} from "./types";
import { MultiSelectList } from "@shared/infrastructure/input/adapter/components/MultiSelectList";

export const RubrosRubrosdialogDetalleTab: React.FC<
  RubrosRubrosdialogDetalleTabProps
> = ({ methods, isEditMode, loading, clases=[] }) => {
  const formValues = methods.watch();

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <label>
        ID Rubro
        <input
          data-testid="rubros-rubrosdialog-field-idrubro"
          value={formValues.idRubro}
          onChange={(event) => methods.setValue("idRubro", event.target.value)}
          required={!isEditMode}
          pattern="[A-Za-z0-9_-]{2,30}"
          disabled={loading || isEditMode}
        />
      </label>

      <label>
        Nombre
        <input
          data-testid="rubros-rubrosdialog-field-nombre"
          value={formValues.nombre}
          onChange={(event) => methods.setValue("nombre", event.target.value)}
          required
          maxLength={120}
          disabled={loading}
        />
      </label>

      <label>
        Ambito
        <select
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
      </label>

      <label>
        Efecto
        <select
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
      </label>

      <label>
        Secuencia Impresion
        <input
          data-testid="rubros-rubrosdialog-field-secuencia-impresion"
          type="number"
          value={formValues.secuenciaImpresion}
          onChange={(event) =>
            methods.setValue("secuenciaImpresion", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Secuencia Sobregiro
        <input
          data-testid="rubros-rubrosdialog-field-secuencia-sobregiro"
          type="number"
          value={formValues.secuenciaSobregiro}
          onChange={(event) =>
            methods.setValue("secuenciaSobregiro", event.target.value)
          }
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Procedimiento
        <input
          data-testid="rubros-rubrosdialog-field-procedimientoCalculo"
          value={formValues.procedimientoCalculo}
          onChange={(event) =>
            methods.setValue("procedimientoCalculo", event.target.value)
          }
          maxLength={50}
          disabled={loading}
        />
      </label>

      <label>
        Id Rubro Homologacion
        <input
          data-testid="rubros-rubrosdialog-field-rubro-historico"
          type="number"
          value={formValues.rubroHistorico}
          onChange={(event) =>
            methods.setValue("rubroHistorico", event.target.value)
          }
          disabled={loading}
        />
      </label>

      <div className="flex flex-wrap gap-x-lg">
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
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

        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
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

      <label>
        Observaciones
        <textarea
          data-testid="rubros-rubrosdialog-field-observaciones"
          value={formValues.observaciones}
          onChange={(event) =>
            methods.setValue("observaciones", event.target.value)
          }
          maxLength={255}
          disabled={loading}
        />
      </label>

      <MultiSelectList
        label="Clases"
        options={clases.map((clase) => ({ id: clase.id, label: clase.nombre }))}
        selectedIds={formValues.clases}
        onChange={(selectedIds) =>
          methods.setValue("clases", selectedIds as number[])
        }
        disabled={loading}
        testId="rubros-rubrosdialog-field-clases"
      />
    </div>
  );
};
