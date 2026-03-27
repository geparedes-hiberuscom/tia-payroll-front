/**
 * Modelo de Dominio: nominaresumenGralxRubro.zul (nominaresumenGralxRubro)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ResumenPorRubroPageResponseDTO — Lista paginada del resumen de nómina por rubro
// Fuente: ResumenPorRubroResponseDTO — Resumen detallado de un rubro en la nómina
// Fuente: ColaboradorRubroPageResponseDTO — Lista paginada de colaboradores con un rubro específico
// Fuente: ExportarResumenRubroDTO — Parámetros para la exportación del resumen por rubro
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Nominaresumengralxrubro {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateNominaresumengralxrubro = Omit<Nominaresumengralxrubro, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateNominaresumengralxrubro = Partial<Omit<Nominaresumengralxrubro, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface NominaresumengralxrubroFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface NominaresumengralxrubroPageResult {
  items: Nominaresumengralxrubro[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
