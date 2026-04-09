import { UseFormReturn } from 'react-hook-form';
import { AmbitoRubro, EfectoRubro } from "../../../../../domain/model/RubrosRubrosdialog";
import { DragDropItem } from "@shared/infrastructure/input/adapter/components/DragDropListWithOrder";
import { Clasesrubro } from '@modules/rubros/domain/model';
import { DimensionItem, Empresa } from '@shared/index';

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
  // Nuevos campos (arrays en form, pueden ser string/number en modelo)
  clases: number[];
  iidempresa: string;
  cargosQueAplican: number[];
  rolesQueAplican: number[];
  cargosQueApruebanAlmacen: DragDropItem[];
  cargosQueApruebanOficina: DragDropItem[];
}

export interface RubrosRubrosdialogDetalleTabProps {
  methods: UseFormReturn<RubrosRubrosdialogFormValues>;
  isEditMode: boolean;
  loading?: boolean;
  clases?: Clasesrubro[];
}

export interface RubrosRubrosdialogParametrosTabProps {
  methods: UseFormReturn<RubrosRubrosdialogFormValues>;
  loading?: boolean;
  empresas?: Empresa[];
  cargos?: DimensionItem[];
  roles?: DimensionItem[];
}
