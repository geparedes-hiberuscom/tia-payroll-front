import React, { useState } from "react";
import { RubrosRubrosdialogFilterParams } from "../dto/RubrosRubrosdialogDto";

type AmbitoFilterValue = NonNullable<RubrosRubrosdialogFilterParams["ambito"]> | "";
type EfectoFilterValue = NonNullable<RubrosRubrosdialogFilterParams["efecto"]> | "";

interface RubrosRubrosdialogFilterProps {
  loading?: boolean;
  onApply: (params: RubrosRubrosdialogFilterParams) => void;
  onClear: () => void;
}

export const RubrosRubrosdialogFilter: React.FC<RubrosRubrosdialogFilterProps> = ({
  loading,
  onApply,
  onClear,
}) => {
  const [idRubro, setIdRubro] = useState("");
  const [nombre, setNombre] = useState("");
  const [efecto, setEfecto] = useState<EfectoFilterValue>("");
  const [ambito, setAmbito] = useState<AmbitoFilterValue>("");

  const handleApply = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      page: 0,
      idRubro: idRubro.trim() || undefined,
      nombre: nombre.trim() || undefined,
      efecto: efecto || undefined,
      ambito: ambito || undefined,
    });
  };

  const handleClear = () => {
    setIdRubro("");
    setNombre("");
    setEfecto("");
    setAmbito("");
    onClear();
  };

  return (
    <form
      onSubmit={handleApply}
      data-testid="rubros-rubrosdialog-filter"
      style={{
        display: "grid",
        gap: "0.75rem",
        marginBottom: "1rem",
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <strong>Filtros</strong>

      <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <label>
          ID Rubro
          <input
            data-testid="rubros-rubrosdialog-filter-idrubro"
            value={idRubro}
            onChange={(event) => setIdRubro(event.target.value)}
            disabled={loading}
          />
        </label>

        <label>
          Nombre
          <input
            data-testid="rubros-rubrosdialog-filter-nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            disabled={loading}
          />
        </label>

        <label>
          Efecto
          <select
            data-testid="rubros-rubrosdialog-filter-efecto"
            value={efecto}
            onChange={(event) => setEfecto(event.target.value as EfectoFilterValue)}
            disabled={loading}
          >
            <option value="">Todos</option>
            <option value="ING">Ingreso</option>
            <option value="EGR">Egreso</option>
            <option value="NA">Ninguno</option>
          </select>
        </label>

        <label>
          Ambito
          <select
            data-testid="rubros-rubrosdialog-filter-ambito"
            value={ambito}
            onChange={(event) => setAmbito(event.target.value as AmbitoFilterValue)}
            disabled={loading}
          >
            <option value="">Todos</option>
            <option value="NA">No Aplica</option>
            <option value="IDO">Ingreso Deduccion Otros</option>
            <option value="PTM">Prestamos</option>
          </select>
        </label>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" disabled={loading} data-testid="rubros-rubrosdialog-filter-apply">
          Buscar
        </button>
        <button type="button" disabled={loading} onClick={handleClear} data-testid="rubros-rubrosdialog-filter-clear">
          Limpiar
        </button>
      </div>
    </form>
  );
};
