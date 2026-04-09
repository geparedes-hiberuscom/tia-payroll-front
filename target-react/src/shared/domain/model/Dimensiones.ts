/**
 * Dominio: Dimensiones
 * Tipos y modelos de negocio
 */

export interface DimensionType {
  codigo: string;
  nombre: string;
}

export interface DimensionItem {
  id: number;
  codigoDimension: string;
  codigo: string;
  descripcion: string;
  descripcionAdicional?: string;
  area?: string;
  tipo?: string;
}

export interface DimensionesFilter {
  dimensionCode?: string;
}

export interface DimensionesPageResult {
  items: DimensionItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
