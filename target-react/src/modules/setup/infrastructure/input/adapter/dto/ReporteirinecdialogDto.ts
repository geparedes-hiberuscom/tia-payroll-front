/**
 * DTOs para funcionalidad: ReporteIRINECDialog.zul (ReporteIRINECDialog)
 * Entidades fuente: 6
 * Controladores fuente: 5
 *
 */

// ─── Request DTOs ───

export interface GenerarReporteirinecdialogRequest {
  empresaId: number;
  tipo: string;
  anio: number;
  formato?: string;
}

export interface UpdateReporteirinecdialogRequest {
  estado?: string;
  formato?: string;
}

export interface ReporteirinecdialogFilterParams {
  page?: number;
  size?: number;
  empresaId?: number;
  tipo?: string;
}

// ─── Response DTOs ───

export interface ReporteirinecdialogResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  tipo: string;
  anio: number;
  estado?: string;
  fechaGeneracion?: string;
  formato?: string;
  archivoUrl?: string;
}

export interface ProcesoReporteirinecdialogResponse {
  success: boolean;
  message: string;
  registrosGenerados: number;
}

export interface ReporteirinecdialogListResponse {
  content: ReporteirinecdialogResponse[];
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
