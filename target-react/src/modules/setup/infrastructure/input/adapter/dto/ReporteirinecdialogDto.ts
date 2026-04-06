/**
 * DTOs para funcionalidad: ReporteIRINECDialog.zul (ReporteIRINECDialog)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 * TODO: Copilot — Completa los campos basándote en los schemas de la API y las entidades fuente.
 */

// Fuente: ReporteIRINECListResponseDTO — Lista de reportes IR/INEC disponibles
// Fuente: ReporteIRINECResponseDTO — Detalle de un reporte IR/INEC
// Fuente: GenerarReporteIRINECDTO — Datos para generar un reporte IR/INEC
// Fuente: ProcesoResponseDTO — Resultado de la generación del reporte
// Fuente: ReporteIRINECUpdateDTO — Datos para actualizar un reporte
// Fuente: DeleteResponseDTO — Confirmación de eliminación

// ─── Request DTOs ───

export interface CreateReporteirinecdialogRequest {
  // TODO: Campos del formulario de creación
}

export interface UpdateReporteirinecdialogRequest {
  // TODO: Campos del formulario de actualización
}

export interface ReporteirinecdialogFilterParams {
  page?: number;
  size?: number;
  // TODO: Filtros de búsqueda
}

// ─── Response DTOs ───

export interface ReporteirinecdialogResponse {
  id: string;
  // TODO: Campos de la respuesta del servidor
}

export interface ReporteirinecdialogListResponse {
  data: ReporteirinecdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ReporteirinecdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
