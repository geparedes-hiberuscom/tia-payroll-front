/**
 * Modelo de Dominio: nominaxColabList.zul (nominaxColabList)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: NominaHistoricoColabPageResponseDTO — Lista paginada de totales de nómina histórica por colaborador
// Fuente: NominaHistoricoColabResponseDTO — Totales de nómina histórica de un colaborador (vista av_py_rubroslhisttotales_v)
// Fuente: RubroHistoricoListDTO — Lista de rubros históricos de un colaborador
// Fuente: ExportarNominaHistoricoDTO — Filtros para la exportación de nómina histórica
// Fuente: ExportarResponseDTO — Resultado de la exportación
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Nominaxcolablist {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateNominaxcolablist = Omit<Nominaxcolablist, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateNominaxcolablist = Partial<Omit<Nominaxcolablist, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface NominaxcolablistFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface NominaxcolablistPageResult {
  items: Nominaxcolablist[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
