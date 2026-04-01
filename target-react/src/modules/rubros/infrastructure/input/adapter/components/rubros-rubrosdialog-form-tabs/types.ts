import { AmbitoRubro, EfectoRubro } from "../../../../../domain/model/RubrosRubrosdialog";

export type AmbitoSelectValue = AmbitoRubro | "-1";
export type EfectoSelectValue = EfectoRubro | "-1";

export interface RubrosRubrosdialogDetalleTabProps {
  isEditMode: boolean;
  loading?: boolean;
  idRubro: string;
  setIdRubro: (value: string) => void;
  nombre: string;
  setNombre: (value: string) => void;
  ambito: AmbitoSelectValue;
  setAmbito: (value: AmbitoSelectValue) => void;
  efecto: EfectoSelectValue;
  setEfecto: (value: EfectoSelectValue) => void;
  observaciones: string;
  setObservaciones: (value: string) => void;
  tipoCalculo: string;
  setTipoCalculo: (value: string) => void;
  secuenciaImpresion: string;
  setSecuenciaImpresion: (value: string) => void;
  secuenciaSobregiro: string;
  setSecuenciaSobregiro: (value: string) => void;
  carta: string;
  setCarta: (value: string) => void;
  rubroHistorico: boolean;
  setRubroHistorico: (value: boolean) => void;
  aplicaInterfaz: boolean;
  setAplicaInterfaz: (value: boolean) => void;
  insertaEnLote: boolean;
  setInsertaEnLote: (value: boolean) => void;
  acumulable: boolean;
  setAcumulable: (value: boolean) => void;
}

export interface RubrosRubrosdialogParametrosTabProps {
  loading?: boolean;
  antiguedadMinima: string;
  setAntiguedadMinima: (value: string) => void;
  numAprobaciones: string;
  setNumAprobaciones: (value: string) => void;
  numAprobacionesNoLocales: string;
  setNumAprobacionesNoLocales: (value: string) => void;
  plazoMaximo: string;
  setPlazoMaximo: (value: string) => void;
  plazoMinimo: string;
  setPlazoMinimo: (value: string) => void;
  montoMaximo: string;
  setMontoMaximo: (value: string) => void;
  verificaEndeudamiento: boolean;
  setVerificaEndeudamiento: (value: boolean) => void;
}
