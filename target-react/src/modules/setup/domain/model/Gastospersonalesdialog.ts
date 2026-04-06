/**
 * Modelo de Dominio: GastosPersonalesDialog.zul (GastosPersonalesDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: GastosPersonalesListResponseDTO — Lista de configuración de gastos personales
// Fuente: GastosPersonalesResponseDTO — Detalle de configuración de gasto personal deducible
// Fuente: GastosPersonalesCreateDTO — Datos para crear configuración de gasto personal
// Fuente: GastosPersonalesUpdateDTO — Datos para actualizar configuración de gasto personal
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Gastospersonalesdialog {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  descripcion: string;
  montoMaximo?: number;
  porcentaje?: number;
  estado?: string;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateGastospersonalesdialog = Omit<Gastospersonalesdialog, 'id' | 'empresaNombre'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateGastospersonalesdialog = Partial<Omit<Gastospersonalesdialog, 'id' | 'empresaId' | 'anio' | 'empresaNombre'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface GastospersonalesdialogFilter {
  page?: number;
  size?: number;
  empresaId?: number;
  anio?: number;
}

/**
 * Resultado paginado del dominio
 */
export interface GastospersonalesdialogPageResult {
  items: Gastospersonalesdialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
