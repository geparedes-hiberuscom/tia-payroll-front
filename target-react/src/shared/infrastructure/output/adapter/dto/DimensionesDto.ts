/**
 * DTOs de API: Dimensiones
 * Schemas Swagger:
 *  - DimensionesResponseDTO
 *  - DimensioneslResponseDTO
 */

export interface DimensionesResponseDTO {
  codigo: string;
  nombre: string;
}

export interface DimensioneslResponseDTO {
  id: number;
  codigoDimension: string;
  codigo: string;
  descripcion: string;
  descripcionAdicional?: string;
  area?: string;
  tipo?: string;
}

// Alias de compatibilidad
export type DimensionResponseDTO = DimensioneslResponseDTO;

export interface DimensionesFilterParamsDTO {
  dimensionCode?: string;
}
