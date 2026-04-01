import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../../shared";
import {
  AmbitoSelectValue,
  EfectoSelectValue,
  RubrosRubrosdialogDetalleTab,
  RubrosRubrosdialogParametrosTab,
} from "./rubros-rubrosdialog-form-tabs";
import {
  AmbitoRubro,
  CreateRubrosRubrosdialog,
  EfectoRubro,
  RubrosRubrosdialog,
  UpdateRubrosRubrosdialog,
} from "../../../../domain/model/RubrosRubrosdialog";

interface RubrosRubrosdialogFormProps {
  initialData?: RubrosRubrosdialog;
  onSubmit: (data: CreateRubrosRubrosdialog | UpdateRubrosRubrosdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const RubrosRubrosdialogForm: React.FC<RubrosRubrosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditMode = Boolean(initialData);
  const [activeTab, setActiveTab] = useState("detalle");
  const [idRubro, setIdRubro] = useState("");
  const [nombre, setNombre] = useState("");
  const [ambito, setAmbito] = useState<AmbitoSelectValue>("-1");
  const [efecto, setEfecto] = useState<EfectoSelectValue>("-1");
  const [observaciones, setObservaciones] = useState("");
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [rubroHistorico, setRubroHistorico] = useState(false);
  const [secuenciaImpresion, setSecuenciaImpresion] = useState("");
  const [secuenciaSobregiro, setSecuenciaSobregiro] = useState("");
  const [aplicaInterfaz, setAplicaInterfaz] = useState(false);
  const [insertaEnLote, setInsertaEnLote] = useState(false);
  const [carta, setCarta] = useState("");
  const [antiguedadMinima, setAntiguedadMinima] = useState("");
  const [numAprobaciones, setNumAprobaciones] = useState("");
  const [numAprobacionesNoLocales, setNumAprobacionesNoLocales] = useState("");
  const [plazoMaximo, setPlazoMaximo] = useState("");
  const [plazoMinimo, setPlazoMinimo] = useState("");
  const [montoMaximo, setMontoMaximo] = useState("");
  const [verificaEndeudamiento, setVerificaEndeudamiento] = useState(false);
  const [acumulable, setAcumulable] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!initialData) {
      return;
    }
    setIdRubro(initialData.idRubro);
    setNombre(initialData.nombre);
    setAmbito(initialData.ambito ?? "-1");
    setEfecto(initialData.efecto ?? "-1");
    setObservaciones(initialData.observaciones ?? "");
    setTipoCalculo(initialData.tipoCalculo ?? "");
    setRubroHistorico(Boolean(initialData.rubroHistorico));
    setSecuenciaImpresion(
      initialData.secuenciaImpresion !== undefined
        ? String(initialData.secuenciaImpresion)
        : "",
    );
    setSecuenciaSobregiro(
      initialData.secuenciaSobregiro !== undefined
        ? String(initialData.secuenciaSobregiro)
        : "",
    );
    setAplicaInterfaz(Boolean(initialData.aplicaInterfaz));
    setInsertaEnLote(Boolean(initialData.insertaEnLote));
    setCarta(initialData.carta ?? "");
    setAntiguedadMinima(
      initialData.antiguedadMinima !== undefined
        ? String(initialData.antiguedadMinima)
        : "",
    );
    setNumAprobaciones(
      initialData.numAprobaciones !== undefined
        ? String(initialData.numAprobaciones)
        : "",
    );
    setNumAprobacionesNoLocales(
      initialData.numAprobacionesNoLocales !== undefined
        ? String(initialData.numAprobacionesNoLocales)
        : "",
    );
    setPlazoMaximo(
      initialData.plazoMaximo !== undefined
        ? String(initialData.plazoMaximo)
        : "",
    );
    setPlazoMinimo(
      initialData.plazoMinimo !== undefined
        ? String(initialData.plazoMinimo)
        : "",
    );
    setMontoMaximo(
      initialData.montoMaximo !== undefined
        ? String(initialData.montoMaximo)
        : "",
    );
    setVerificaEndeudamiento(Boolean(initialData.verificaEndeudamiento));
    setAcumulable(Boolean(initialData.acumulable));
  }, [initialData]);

  const parseOptionalNumber = (value: string): number | undefined => {
    if (!value.trim()) {
      return undefined;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const parseEfecto = (value: EfectoSelectValue): EfectoRubro | undefined => {
    return value === "-1" ? undefined : value;
  };

  const parseAmbito = (value: AmbitoSelectValue): AmbitoRubro | undefined => {
    return value === "-1" ? undefined : value;
  };

  const showParametrosTab = ambito === "PTM";

  useEffect(() => {
    if (!showParametrosTab && activeTab === "parametros") {
      setActiveTab("detalle");
    }
  }, [activeTab, showParametrosTab]);

  const validate = (): string[] => {
    const nextErrors: string[] = [];
    if (!isEditMode && !/^[A-Za-z0-9_-]{2,30}$/.test(idRubro.trim())) {
      nextErrors.push(
        "El ID de rubro debe tener entre 2 y 30 caracteres alfanumericos.",
      );
    }
    if (!nombre.trim()) {
      nextErrors.push("El nombre es obligatorio.");
    }
    if (nombre.trim().length > 120) {
      nextErrors.push("El nombre no puede exceder 120 caracteres.");
    }
    if (carta.trim().length > 10) {
      nextErrors.push("Carta no puede exceder 10 caracteres.");
    }
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      return;
    }

    if (isEditMode) {
      onSubmit({
        nombre: nombre.trim(),
        ambito: parseAmbito(ambito),
        efecto: parseEfecto(efecto),
        observaciones: observaciones.trim() || undefined,
        tipoCalculo: tipoCalculo.trim() || undefined,
        rubroHistorico,
        secuenciaImpresion: parseOptionalNumber(secuenciaImpresion),
        secuenciaSobregiro: parseOptionalNumber(secuenciaSobregiro),
        aplicaInterfaz,
        insertaEnLote,
        carta: carta.trim() || undefined,
        antiguedadMinima: parseOptionalNumber(antiguedadMinima),
        numAprobaciones: parseOptionalNumber(numAprobaciones),
        numAprobacionesNoLocales: parseOptionalNumber(numAprobacionesNoLocales),
        plazoMaximo: parseOptionalNumber(plazoMaximo),
        plazoMinimo: parseOptionalNumber(plazoMinimo),
        montoMaximo: parseOptionalNumber(montoMaximo),
        verificaEndeudamiento,
        acumulable,
      });
      return;
    }

    onSubmit({
      idRubro: idRubro.trim(),
      nombre: nombre.trim(),
      ambito: parseAmbito(ambito),
      efecto: parseEfecto(efecto),
      observaciones: observaciones.trim() || undefined,
      tipoCalculo: tipoCalculo.trim() || undefined,
      rubroHistorico,
      secuenciaImpresion: parseOptionalNumber(secuenciaImpresion),
      secuenciaSobregiro: parseOptionalNumber(secuenciaSobregiro),
      aplicaInterfaz,
      insertaEnLote,
      carta: carta.trim() || undefined,
      antiguedadMinima: parseOptionalNumber(antiguedadMinima),
      numAprobaciones: parseOptionalNumber(numAprobaciones),
      numAprobacionesNoLocales: parseOptionalNumber(numAprobacionesNoLocales),
      plazoMaximo: parseOptionalNumber(plazoMaximo),
      plazoMinimo: parseOptionalNumber(plazoMinimo),
      montoMaximo: parseOptionalNumber(montoMaximo),
      verificaEndeudamiento,
      acumulable,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="rubros-rubrosdialog-form"
      style={{
        display: "grid",
        gap: "0.75rem",
        maxWidth: 640,
        marginBottom: "1rem",
      }}
    >
      <h3>{isEditMode ? "Editar rubro" : "Crear rubro"}</h3>
      {errors.length > 0 && (
        <ul
          data-testid="rubros-rubrosdialog-form-errors"
          style={{ color: "#b91c1c", margin: 0 }}
        >
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList aria-label="Secciones del formulario de rubros">
          <TabsTrigger value="detalle">Detalle</TabsTrigger>
          {showParametrosTab && <TabsTrigger value="parametros">Parametros</TabsTrigger>}
        </TabsList>

        <TabsContent value="detalle">
          <RubrosRubrosdialogDetalleTab
            isEditMode={isEditMode}
            loading={loading}
            idRubro={idRubro}
            setIdRubro={setIdRubro}
            nombre={nombre}
            setNombre={setNombre}
            ambito={ambito}
            setAmbito={setAmbito}
            efecto={efecto}
            setEfecto={setEfecto}
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            tipoCalculo={tipoCalculo}
            setTipoCalculo={setTipoCalculo}
            secuenciaImpresion={secuenciaImpresion}
            setSecuenciaImpresion={setSecuenciaImpresion}
            secuenciaSobregiro={secuenciaSobregiro}
            setSecuenciaSobregiro={setSecuenciaSobregiro}
            carta={carta}
            setCarta={setCarta}
            rubroHistorico={rubroHistorico}
            setRubroHistorico={setRubroHistorico}
            aplicaInterfaz={aplicaInterfaz}
            setAplicaInterfaz={setAplicaInterfaz}
            insertaEnLote={insertaEnLote}
            setInsertaEnLote={setInsertaEnLote}
            acumulable={acumulable}
            setAcumulable={setAcumulable}
          />
        </TabsContent>

        {showParametrosTab && (
          <TabsContent value="parametros">
            <RubrosRubrosdialogParametrosTab
              loading={loading}
              antiguedadMinima={antiguedadMinima}
              setAntiguedadMinima={setAntiguedadMinima}
              numAprobaciones={numAprobaciones}
              setNumAprobaciones={setNumAprobaciones}
              numAprobacionesNoLocales={numAprobacionesNoLocales}
              setNumAprobacionesNoLocales={setNumAprobacionesNoLocales}
              plazoMaximo={plazoMaximo}
              setPlazoMaximo={setPlazoMaximo}
              plazoMinimo={plazoMinimo}
              setPlazoMinimo={setPlazoMinimo}
              montoMaximo={montoMaximo}
              setMontoMaximo={setMontoMaximo}
              verificaEndeudamiento={verificaEndeudamiento}
              setVerificaEndeudamiento={setVerificaEndeudamiento}
            />
          </TabsContent>
        )}
      </Tabs>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="submit"
          data-testid="rubros-rubrosdialog-submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
        </button>
        {onCancel && (
          <button
            type="button"
            data-testid="rubros-rubrosdialog-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
