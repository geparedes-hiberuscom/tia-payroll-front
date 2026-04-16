/**
 * DTOs para funcionalidad: parametros.zul / parametrosDialog.zul (parametros_parametrosDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 *
 */

// ─── Request DTOs ───

export interface CreateParametrosParametrosdialogRequest {
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

export interface UpdateParametrosParametrosdialogRequest {
  parametro?: string;
  datoCadena?: string;
  datoCadena2?: string;
  datoNumero?: number;
  datoNumero2?: number;
  datoFechaInicio?: string;
  datoFechaFin?: string;
}

export interface ParametrosParametrosdialogFilterParams {
  page?: number;
  size?: number;
  idParametro?: string;
  parametro?: string;
}

// ─── Response DTOs ───

export interface ParametrosParametrosdialogResponse {
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

export interface ParametrosParametrosdialogListResponse {
  content: ParametrosParametrosdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ParametrosParametrosdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
