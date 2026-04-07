import React from "react";
import { RubrosRubrosdialogParametrosTabProps } from "./types";

export const RubrosRubrosdialogParametrosTab: React.FC<
  RubrosRubrosdialogParametrosTabProps
> = ({ methods, loading }) => {
  const formValues = methods.watch();

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      
      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          data-testid="rubros-rubrosdialog-field-verifica-endeudamiento"
          type="checkbox"
          checked={formValues.verificaEndeudamiento}
          onChange={(event) => methods.setValue("verificaEndeudamiento", event.target.checked)}
          disabled={loading}
        />
        Verifica Endeudamiento
      </label>
            <label>
        Antiguedad Laboral
        <input
          data-testid="rubros-rubrosdialog-field-antiguedad-minima"
          type="number"
          value={formValues.antiguedadMinima}
          onChange={(event) => methods.setValue("antiguedadMinima", event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>
      <label>
        Plazo Máximo
        <input
          data-testid="rubros-rubrosdialog-field-plazo-maximo"
          type="number"
          value={formValues.plazoMaximo}
          onChange={(event) => methods.setValue("plazoMaximo", event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Plazo Mínimo
        <input
          data-testid="rubros-rubrosdialog-field-plazo-minimo"
          type="number"
          value={formValues.plazoMinimo}
          onChange={(event) => methods.setValue("plazoMinimo", event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Monto Máximo
        <input
          data-testid="rubros-rubrosdialog-field-monto-maximo"
          type="number"
          value={formValues.montoMaximo}
          onChange={(event) => methods.setValue("montoMaximo", event.target.value)}
          min={0}
          step="0.01"
          disabled={loading}
        />
      </label>





      <label>
        Número Aprobaciones
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones"
          type="number"
          value={formValues.numAprobaciones}
          onChange={(event) => methods.setValue("numAprobaciones", event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Número Aprobaciones No Locales
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones-no-locales"
          type="number"
          value={formValues.numAprobacionesNoLocales}
          onChange={(event) => methods.setValue("numAprobacionesNoLocales", event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>
    </div>
  );
};

