/**
 * Modelo de Dominio: parametros.zul / parametrosDialog.zul (parametros_parametrosDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ParametroPageResponseDTO — Lista paginada de parámetros del sistema
// Fuente: ParametroResponseDTO — Detalle completo de un parámetro del sistema
// Fuente: ParametroCreateDTO — Datos para crear un nuevo parámetro
// Fuente: ParametroUpdateDTO — Datos para actualizar un parámetro existente
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface ParametrosParametrosdialog {
  id: string;
  entorno: string;
  idParametro: string;
  parametro: string;
  datoCadena?: string;
  datoCadena2?: string;
  datoNumero?: number;
  datoNumero2?: number;
  datoFechaInicio?: Date;
  datoFechaFin?: Date;
  usuarioIngreso?: string;
  fechaIngreso?: Date;
  usuarioModificacion?: string;
  fechaModificacion?: Date;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateParametrosParametrosdialog = Omit<ParametrosParametrosdialog, 'id' | 'usuarioIngreso' | 'fechaIngreso' | 'usuarioModificacion' | 'fechaModificacion'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateParametrosParametrosdialog = Partial<Omit<ParametrosParametrosdialog, 'id' | 'entorno' | 'idParametro' | 'usuarioIngreso' | 'fechaIngreso' | 'usuarioModificacion' | 'fechaModificacion'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface ParametrosParametrosdialogFilter {
  page?: number;
  size?: number;
  idParametro?: string;
  nombre?: string;
  observaciones?: string;
}

/**
 * Resultado paginado del dominio
 */
export interface ParametrosParametrosdialogPageResult {
  content: ParametrosParametrosdialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
