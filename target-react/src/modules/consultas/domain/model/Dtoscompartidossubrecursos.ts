/**
 * Modelo de Dominio: DTOs compartidos (subrecursos) (DTOscompartidossubrecursos)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: RubroHistoricoDTO — Detalle de un rubro histórico de nómina (av_py_rubroslhis)
// Fuente: RubroPreLiquidadoDTO — Detalle de un rubro preliquidado de nómina (av_py_rubroslpre)
// Fuente: ClaseRubroListDTO — Lista de clases de rubros
// Fuente: ClaseRubroResumenDTO — Detalle de una clase de rubro (av_py_clasesrubros)
// Fuente: EstructuraOrganizacionalDTO — Detalle de un nodo de la estructura organizacional

export interface Dtoscompartidossubrecursos {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateDtoscompartidossubrecursos = Omit<Dtoscompartidossubrecursos, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateDtoscompartidossubrecursos = Partial<Omit<Dtoscompartidossubrecursos, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface DtoscompartidossubrecursosFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface DtoscompartidossubrecursosPageResult {
  items: Dtoscompartidossubrecursos[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
