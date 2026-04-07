import { UseFormReturn } from 'react-hook-form';
import { AmbitoRubro, EfectoRubro } from "../../../../../domain/model/RubrosRubrosdialog";

export type AmbitoSelectValue = AmbitoRubro | "-1";
export type EfectoSelectValue = EfectoRubro | "-1";

export interface RubrosRubrosdialogFormValues {
  idRubro: string;
  nombre: string;
  ambito: AmbitoSelectValue;
  efecto: EfectoSelectValue;
  observaciones: string;
  procedimientoCalculo: string;
  rubroHistorico: string;
  secuenciaImpresion: string;
  secuenciaSobregiro: string;
  aplicaInterfaz: boolean;
  insertaEnLote: boolean;
  carta: string;
  antiguedadMinima: string;
  numAprobaciones: string;
  numAprobacionesNoLocales: string;
  plazoMaximo: string;
  plazoMinimo: string;
  montoMaximo: string;
  verificaEndeudamiento: boolean;
  acumulable: boolean;
}

export interface RubrosRubrosdialogDetalleTabProps {
  methods: UseFormReturn<RubrosRubrosdialogFormValues>;
  isEditMode: boolean;
  loading?: boolean;
}

export interface RubrosRubrosdialogParametrosTabProps {
  methods: UseFormReturn<RubrosRubrosdialogFormValues>;
  loading?: boolean;
}
