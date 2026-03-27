/**
 * Modelo de Dominio: acumulados.zul (acumulados)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: AcumuladoPageResponseDTO — Lista paginada de acumulados de nómina
// Fuente: AcumuladoResponseDTO — Detalle de un acumulado de nómina (vista av_py_acumulados_v)
// Fuente: AcumuladoCreateDTO — Datos para crear un acumulado de nómina
// Fuente: AcumuladoUpdateDTO — Datos para actualizar el acumulado
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Acumulados {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateAcumulados = Omit<Acumulados, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateAcumulados = Partial<Omit<Acumulados, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface AcumuladosFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface AcumuladosPageResult {
  items: Acumulados[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
