import React from "react";
import { RubrosRubrosdialogParametrosTabProps } from "./types";

export const RubrosRubrosdialogParametrosTab: React.FC<
  RubrosRubrosdialogParametrosTabProps
> = ({
  loading,
  antiguedadMinima,
  setAntiguedadMinima,
  numAprobaciones,
  setNumAprobaciones,
  numAprobacionesNoLocales,
  setNumAprobacionesNoLocales,
  plazoMaximo,
  setPlazoMaximo,
  plazoMinimo,
  setPlazoMinimo,
  montoMaximo,
  setMontoMaximo,
  verificaEndeudamiento,
  setVerificaEndeudamiento,
}) => {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <label>
        Antiguedad Minima
        <input
          data-testid="rubros-rubrosdialog-field-antiguedad-minima"
          type="number"
          value={antiguedadMinima}
          onChange={(event) => setAntiguedadMinima(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Numero Aprobaciones
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones"
          type="number"
          value={numAprobaciones}
          onChange={(event) => setNumAprobaciones(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Numero Aprobaciones No Locales
        <input
          data-testid="rubros-rubrosdialog-field-num-aprobaciones-no-locales"
          type="number"
          value={numAprobacionesNoLocales}
          onChange={(event) => setNumAprobacionesNoLocales(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Plazo Maximo
        <input
          data-testid="rubros-rubrosdialog-field-plazo-maximo"
          type="number"
          value={plazoMaximo}
          onChange={(event) => setPlazoMaximo(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Plazo Minimo
        <input
          data-testid="rubros-rubrosdialog-field-plazo-minimo"
          type="number"
          value={plazoMinimo}
          onChange={(event) => setPlazoMinimo(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Monto Maximo
        <input
          data-testid="rubros-rubrosdialog-field-monto-maximo"
          type="number"
          value={montoMaximo}
          onChange={(event) => setMontoMaximo(event.target.value)}
          min={0}
          step="0.01"
          disabled={loading}
        />
      </label>

      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          data-testid="rubros-rubrosdialog-field-verifica-endeudamiento"
          type="checkbox"
          checked={verificaEndeudamiento}
          onChange={(event) => setVerificaEndeudamiento(event.target.checked)}
          disabled={loading}
        />
        Verifica Endeudamiento
      </label>
    </div>
  );
};
