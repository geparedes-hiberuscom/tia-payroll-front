import { ParametrosParametrosdialogResponse, ParametrosParametrosdialogListResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest } from '../../../input/adapter/dto/ParametrosParametrosdialogDto';

/**
 * API Mapper: parametros.zul / parametrosDialog.zul
 */
export class ParametrosParametrosdialogApiMapper {

  /**
   * Convierte una fecha a formato LocalDateTime (ISO 8601) que espera el backend
   * @param date - String, Date o undefined
   * @returns String en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS) o undefined
   */
  private static toLocalDateTime(date?: string | Date): string | undefined {
    if (!date) return undefined;
    
    if (typeof date === 'string') {
      // Si es string y ya tiene hora, retornar como está
      if (date.includes('T')) {
        return date;
      }
      // Si es solo fecha (YYYY-MM-DD), agregar hora 00:00:00
      return `${date}T00:00:00`;
    }
    
    // Si es Date object, convertir a ISO string
    if (date instanceof Date) {
      return date.toISOString().split('.')[0]; // Remover milisegundos
    }
    
    return undefined;
  }

  static toResponse(raw: any): ParametrosParametrosdialogResponse {
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

  static toListResponse(raw: any): ParametrosParametrosdialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(ParametrosParametrosdialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreateParametrosParametrosdialogRequest): Record<string, unknown> {
    return { 
      entorno: request.entorno,
      idParametro: request.idParametro,
      parametro: request.parametro,
      datoCadena: request.datoCadena,
      datoCadena2: request.datoCadena2,
      datoNumero: request.datoNumero,
      datoNumero2: request.datoNumero2,
      datoFechaInicio: this.toLocalDateTime(request.datoFechaInicio),
      datoFechaFin: this.toLocalDateTime(request.datoFechaFin),
    };
  }

  static toUpdatePayload(request: UpdateParametrosParametrosdialogRequest): Record<string, unknown> {
    return {
      parametro: request.parametro,
      datoCadena: request.datoCadena,
      datoCadena2: request.datoCadena2,
      datoNumero: request.datoNumero,
      datoNumero2: request.datoNumero2,
      datoFechaInicio: this.toLocalDateTime(request.datoFechaInicio),
      datoFechaFin: this.toLocalDateTime(request.datoFechaFin),
    };
  }
}
