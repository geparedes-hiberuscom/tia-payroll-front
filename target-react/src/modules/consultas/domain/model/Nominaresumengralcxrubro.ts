/**
 * Modelo de Dominio: nominaresumenGralCxRubro.zul (nominaresumenGralCxRubro)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ResumenClasificacionPageResponseDTO — Lista paginada del resumen de nómina por clasificación de rubro
// Fuente: ResumenClasificacionResponseDTO — Resumen detallado de una clasificación de rubro en la nómina
// Fuente: RubrosClasificacionListDTO — Lista de rubros de una clasificación
// Fuente: ExportarResumenClasificacionDTO — Parámetros para la exportación del resumen por clasificación
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Nominaresumengralcxrubro {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateNominaresumengralcxrubro = Omit<Nominaresumengralcxrubro, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateNominaresumengralcxrubro = Partial<Omit<Nominaresumengralcxrubro, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface NominaresumengralcxrubroFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface NominaresumengralcxrubroPageResult {
  items: Nominaresumengralcxrubro[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
