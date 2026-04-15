import React, { useState } from "react";
import type { RubrosRubrosdialogFilter as RubrosRubrosdialogFilterModel } from "@modules/rubros/domain/model/RubrosRubrosdialog";
import { Button, Field, inputClassName } from '@shared/index';

type AmbitoFilterValue = NonNullable<RubrosRubrosdialogFilterModel["ambito"]> | "";
type EfectoFilterValue = NonNullable<RubrosRubrosdialogFilterModel["efecto"]> | "";

interface RubrosRubrosdialogFilterProps {
  loading?: boolean;
  onApply: (params: RubrosRubrosdialogFilterModel) => void;
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
      className="grid gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="ID Rubro">
          <input
            className={inputClassName()}
            data-testid="rubros-rubrosdialog-filter-idrubro"
            value={idRubro}
            onChange={(event) => setIdRubro(event.target.value)}
            disabled={loading}
          />
        </Field>

        <Field label="Nombre">
          <input
            className={inputClassName()}
            data-testid="rubros-rubrosdialog-filter-nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            disabled={loading}
          />
        </Field>

        <Field label="Efecto">
          <select
            className={inputClassName()}
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
        </Field>

        <Field label="Ambito">
          <select
            className={inputClassName()}
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
        </Field>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading} testId="rubros-rubrosdialog-filter-apply" label="Buscar" />
        <Button type="button" disabled={loading} onClick={handleClear} testId="rubros-rubrosdialog-filter-clear" label="Limpiar" variant="ghost" />
      </div>
    </form>
  );
};
