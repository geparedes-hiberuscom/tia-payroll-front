/**
 * API Mapper para Parámetros
 * Transforma JSON del backend ↔ DTOs tipados
 */

import {
  CreateParametroRequest,
  UpdateParametroRequest,
  ParametroResponse,
  ParametroPageResponse,
} from '../../../input/adapter/dto/ParametroDto';

export class ParametroApiMapper {
  static toResponse(raw: any): ParametroResponse {
    return {
      entorno: raw.entorno,
      idParametro: raw.idParametro,
      parametro: raw.parametro,
      datoCadena: raw.datoCadena,
      datoCadena2: raw.datoCadena2,
      datoNumero: raw.datoNumero,
      datoNumero2: raw.datoNumero2,
      datoFechaInicio: raw.datoFechaInicio,
      datoFechaFin: raw.datoFechaFin,
      usuarioIngreso: raw.usuarioIngreso,
      fechaIngreso: raw.fechaIngreso,
      usuarioModificacion: raw.usuarioModificacion,
      fechaModificacion: raw.fechaModificacion,
    };
  }

  static toListResponse(raw: any): ParametroPageResponse {
    return {
      content: (raw.content || []).map((item: any) => this.toResponse(item)),
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 0,
    };
  }

  static toCreatePayload(request: CreateParametroRequest): any {
    return {
      entorno: request.entorno,
      idParametro: request.idParametro,
      parametro: request.parametro,
      datoCadena: request.datoCadena,
      datoCadena2: request.datoCadena2,
      datoNumero: request.datoNumero,
      datoNumero2: request.datoNumero2,
      datoFechaInicio: request.datoFechaInicio,
      datoFechaFin: request.datoFechaFin,
    };
  }

  static toUpdatePayload(request: UpdateParametroRequest): any {
    return {
      parametro: request.parametro,
      datoCadena: request.datoCadena,
      datoCadena2: request.datoCadena2,
      datoNumero: request.datoNumero,
      datoNumero2: request.datoNumero2,
      datoFechaInicio: request.datoFechaInicio,
      datoFechaFin: request.datoFechaFin,
    };
  }
}
