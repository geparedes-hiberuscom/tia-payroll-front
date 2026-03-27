/**
 * Modelo de Dominio: nominaxColabPreList.zul / nominaxColabPreDialog.zul (nominaxColabPreList_nominaxColabPreDialog)
 * Vertical Slice: 👤 Consultas
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: NominaPreColabPageResponseDTO — Lista paginada de totales de nómina preliquidada por colaborador
// Fuente: NominaPreColabResponseDTO — Totales de nómina preliquidada de un colaborador (vista av_py_rubroslpretotales_v)
// Fuente: RubroPreLiquidadoListDTO — Lista de rubros preliquidados del colaborador
// Fuente: DetallePreColabResponseDTO — Detalle completo del colaborador en preliquidación con comparación histórica
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface NominaxcolabprelistNominaxcolabpredialog {
  id: string;
  // TODO: Agregar atributos del dominio de negocio
  // Basarse en las entidades fuente y los schemas del API
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateNominaxcolabprelistNominaxcolabpredialog = Omit<NominaxcolabprelistNominaxcolabpredialog, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateNominaxcolabprelistNominaxcolabpredialog = Partial<Omit<NominaxcolabprelistNominaxcolabpredialog, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface NominaxcolabprelistNominaxcolabpredialogFilter {
  page?: number;
  size?: number;
  // TODO: Agregar filtros de búsqueda del dominio
}

/**
 * Resultado paginado del dominio
 */
export interface NominaxcolabprelistNominaxcolabpredialogPageResult {
  items: NominaxcolabprelistNominaxcolabpredialog[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
