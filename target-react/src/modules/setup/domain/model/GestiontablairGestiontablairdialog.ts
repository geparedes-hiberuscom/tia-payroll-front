/**
 * Modelo de Dominio: gestionTablaIR.zul / gestionTablaIRDialog.zul (gestionTablaIR_gestionTablaIRDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 5
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 */

// Fuente: TablaIRPageResponseDTO — Lista paginada de rangos de la tabla IR
// Fuente: TablaIRResponseDTO — Detalle de un rango de la tabla IR
// Fuente: TablaIRCreateDTO — Datos para crear un nuevo rango IR
// Fuente: TablaIRUpdateDTO — Datos para actualizar un rango IR existente
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface GestiontablairGestiontablairdialog {
  id: number;
  anio: number;
  nivel: number;
  tipo: string;
  valorMinimo: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateGestiontablairGestiontablairdialog = Omit<GestiontablairGestiontablairdialog, 'id'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateGestiontablairGestiontablairdialog = Partial<Omit<GestiontablairGestiontablairdialog, 'id'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface GestiontablairGestiontablairdialogFilter {
  page?: number;
  size?: number;
  anio?: number;
  tipo?: string;
}

/**
 * Resultado paginado del dominio
 */
export interface GestiontablairGestiontablairdialogPageResult {
  content: GestiontablairGestiontablairdialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
