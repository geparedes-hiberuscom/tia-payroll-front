/**
 * Modelo de Dominio: conSueldo.zul (conSueldo)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ConsultaSueldoPageResponseDTO — Lista paginada de sueldos de colaboradores
// Fuente: ConsultaSueldoResponseDTO — Detalle del sueldo de un colaborador
// Fuente: EstructuraOrganizacionalListDTO — Lista de nodos de la estructura organizacional
// Fuente: ExportarConsultaSueldoDTO — Filtros para la exportación de sueldos
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Consueldo {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateConsueldo = Omit<Consueldo, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateConsueldo = Partial<Omit<Consueldo, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface ConsueldoFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface ConsueldoPageResult {
  items: Consueldo[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
