/**
 * Modelo de Dominio: comparativoNominas.zul (comparativoNominas)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ComparativoNominasPageResponseDTO — Lista paginada de comparativos de nóminas
// Fuente: ComparativoNominasResponseDTO — Detalle de un registro comparativo de nómina
// Fuente: ComparativoNominasCreateDTO — Datos para crear un comparativo de nóminas
// Fuente: ComparativoNominasUpdateDTO — Datos para actualizar el comparativo
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Comparativonominas {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateComparativonominas = Omit<Comparativonominas, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateComparativonominas = Partial<Omit<Comparativonominas, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface ComparativonominasFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface ComparativonominasPageResult {
  items: Comparativonominas[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
