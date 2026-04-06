/**
 * Modelo de Dominio: ReporteIRINECDialog.zul (ReporteIRINECDialog)
 * Vertical Slice: 🔧 Setup y Configuración
 * Entidades fuente: 6
 *
 * Representa la entidad de negocio pura, sin dependencias de infraestructura.
 * Los campos deben reflejar los atributos reales del negocio.
 *
 * TODO: Copilot — Completa los atributos basándote en las entidades fuente y los schemas de la API.
 */

// Fuente: ReporteIRINECListResponseDTO — Lista de reportes IR/INEC disponibles
// Fuente: ReporteIRINECResponseDTO — Detalle de un reporte IR/INEC
// Fuente: GenerarReporteIRINECDTO — Datos para generar un reporte IR/INEC
// Fuente: ProcesoResponseDTO — Resultado de la generación del reporte
// Fuente: ReporteIRINECUpdateDTO — Datos para actualizar un reporte
// Fuente: DeleteResponseDTO — Confirmación de eliminación

export interface Reporteirinecdialog {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  tipo: string;
  anio: number;
  estado?: string;
  fechaGeneracion?: Date;
  formato?: string;
  archivoUrl?: string;
}

/**
 * Tipo para creación (sin id, generado por el backend)
 */
export type CreateReporteirinecdialog = Omit<Reporteirinecdialog, 'id' | 'empresaNombre' | 'fechaGeneracion' | 'archivoUrl'>;

/**
 * Tipo para actualización parcial
 */
export type UpdateReporteirinecdialog = Partial<Omit<Reporteirinecdialog, 'id' | 'empresaId' | 'anio' | 'empresaNombre' | 'fechaGeneracion'>>;

/**
 * Tipo para filtros de búsqueda del dominio
 */
export interface ReporteirinecdialogFilter {
  page?: number;
  size?: number;
  empresaId?: number;
  tipo?: string;
}

/**
 * Resultado paginado del dominio
 */
export interface ReporteirinecdialogPageResult {
  data: Reporteirinecdialog[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
