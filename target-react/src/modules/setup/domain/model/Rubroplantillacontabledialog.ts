/**
 * Modelo de Dominio: rubroplantillaContableDialog.zul (rubroplantillaContableDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 */

// Fuente: RubroPlantillaListResponseDTO — Lista de rubros asociados a la plantilla contable
// Fuente: RubroPlantillaResponseDTO — Detalle de un rubro asignado a la plantilla contable
// Fuente: RubroPlantillaCreateDTO — Datos para asociar un rubro a la plantilla contable
// Fuente: RubroPlantillaUpdateDTO — Datos para actualizar la asociación rubro-plantilla
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Rubroplantillacontabledialog {
  plantillaId: number;
  rubroId: string;
  rubroNombre?: string;
  cuenta: string;
  subcuenta?: string;
  debeHaber: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
  dimensionNombre?: string;
}

/**
 * Tipo para creación (sin id, plantillaId + rubroId son claves)
 */
export type CreateRubroplantillacontabledialog = Omit<Rubroplantillacontabledialog, 'rubroNombre' | 'dimensionNombre'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateRubroplantillacontabledialog = Partial<Omit<Rubroplantillacontabledialog, 'plantillaId' | 'rubroId' | 'rubroNombre' | 'dimensionNombre'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface RubroplantillacontabledialogFilter {
  page?: number;
  size?: number;
  plantillaId?: number;
  rubroId?: string;
}

/**
 * Resultado paginado del dominio
 */
export interface RubroplantillacontabledialogPageResult {
  content: Rubroplantillacontabledialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
