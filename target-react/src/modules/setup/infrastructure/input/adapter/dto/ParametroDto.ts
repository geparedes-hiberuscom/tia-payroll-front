/**
 * DTOs para Parámetros del sistema de nómina
 * Screen: parametros.zul / parametrosDialog.zul
 */

export interface CreateParametroRequest {
  entorno: string;
  idParametro: string;
  parametro: string;
  datoCadena?: string;
  datoCadena2?: string;
  datoNumero?: number;
  datoNumero2?: number;
  datoFechaInicio?: string;
  datoFechaFin?: string;
}

export interface UpdateParametroRequest {
  parametro?: string;
  datoCadena?: string;
  datoCadena2?: string;
  datoNumero?: number;
  datoNumero2?: number;
  datoFechaInicio?: string;
  datoFechaFin?: string;
}

export interface ParametroResponse {
  entorno: string;
  idParametro: string;
  parametro: string;
  datoCadena?: string;
  datoCadena2?: string;
  datoNumero?: number;
  datoNumero2?: number;
  datoFechaInicio?: string;
  datoFechaFin?: string;
  usuarioIngreso?: string;
  fechaIngreso?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
}

export interface ParametroFilterParams {
  page?: number;
  size?: number;
  idParametro?: string;
  nombre?: string;
  observaciones?: string;
}

export interface ParametroPageResponse {
  content: ParametroResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
