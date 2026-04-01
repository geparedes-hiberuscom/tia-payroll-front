import React from "react";
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTabProps,
} from "./types";

export const RubrosRubrosdialogDetalleTab: React.FC<
  RubrosRubrosdialogDetalleTabProps
> = ({
  isEditMode,
  loading,
  idRubro,
  setIdRubro,
  nombre,
  setNombre,
  ambito,
  setAmbito,
  efecto,
  setEfecto,
  observaciones,
  setObservaciones,
  tipoCalculo,
  setTipoCalculo,
  secuenciaImpresion,
  setSecuenciaImpresion,
  secuenciaSobregiro,
  setSecuenciaSobregiro,
  carta,
  setCarta,
  rubroHistorico,
  setRubroHistorico,
  aplicaInterfaz,
  setAplicaInterfaz,
  insertaEnLote,
  setInsertaEnLote,
  acumulable,
  setAcumulable,
}) => {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <label>
        ID Rubro
        <input
          data-testid="rubros-rubrosdialog-field-idrubro"
          value={idRubro}
          onChange={(event) => setIdRubro(event.target.value)}
          required={!isEditMode}
          pattern="[A-Za-z0-9_-]{2,30}"
          disabled={loading || isEditMode}
        />
      </label>

      <label>
        Nombre
        <input
          data-testid="rubros-rubrosdialog-field-nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          required
          maxLength={120}
          disabled={loading}
        />
      </label>

      <label>
        Ambito
        <select
          data-testid="rubros-rubrosdialog-field-ambito"
          value={ambito}
          onChange={(event) => setAmbito(event.target.value as AmbitoSelectValue)}
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
          value={efecto}
          onChange={(event) => setEfecto(event.target.value as EfectoSelectValue)}
          disabled={loading}
        >
          <option value="-1"> </option>
          <option value="ING">Ingreso</option>
          <option value="EGR">Egreso</option>
          <option value="NA">Ninguno</option>
        </select>
      </label>

      <label>
        Tipo Calculo
        <input
          data-testid="rubros-rubrosdialog-field-tipocalculo"
          value={tipoCalculo}
          onChange={(event) => setTipoCalculo(event.target.value)}
          maxLength={50}
          disabled={loading}
        />
      </label>

      <label>
        Secuencia Impresion
        <input
          data-testid="rubros-rubrosdialog-field-secuencia-impresion"
          type="number"
          value={secuenciaImpresion}
          onChange={(event) => setSecuenciaImpresion(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Secuencia Sobregiro
        <input
          data-testid="rubros-rubrosdialog-field-secuencia-sobregiro"
          type="number"
          value={secuenciaSobregiro}
          onChange={(event) => setSecuenciaSobregiro(event.target.value)}
          min={0}
          disabled={loading}
        />
      </label>

      <label>
        Carta
        <input
          data-testid="rubros-rubrosdialog-field-carta"
          value={carta}
          onChange={(event) => setCarta(event.target.value)}
          maxLength={10}
          disabled={loading}
        />
      </label>

      <div className="flex flex-wrap gap-x-lg">
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            data-testid="rubros-rubrosdialog-field-rubro-historico"
            type="checkbox"
            checked={rubroHistorico}
            onChange={(event) => setRubroHistorico(event.target.checked)}
            disabled={loading}
          />
          Rubro Historico
        </label>

        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            data-testid="rubros-rubrosdialog-field-aplica-interfaz"
            type="checkbox"
            checked={aplicaInterfaz}
            onChange={(event) => setAplicaInterfaz(event.target.checked)}
            disabled={loading}
          />
          Aplica Interfaz
        </label>

        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            data-testid="rubros-rubrosdialog-field-inserta-en-lote"
            type="checkbox"
            checked={insertaEnLote}
            onChange={(event) => setInsertaEnLote(event.target.checked)}
            disabled={loading}
          />
          Inserta En Lote
        </label>

        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            data-testid="rubros-rubrosdialog-field-acumulable"
            type="checkbox"
            checked={acumulable}
            onChange={(event) => setAcumulable(event.target.checked)}
            disabled={loading}
          />
          Acumulable
        </label>
      </div>

      <label>
        Observaciones
        <textarea
          data-testid="rubros-rubrosdialog-field-observaciones"
          value={observaciones}
          onChange={(event) => setObservaciones(event.target.value)}
          maxLength={255}
          disabled={loading}
        />
      </label>
    </div>
  );
};
