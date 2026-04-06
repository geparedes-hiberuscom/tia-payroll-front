/**
 * DTOs para Reportes IR/INEC
 * Screen: ReporteIRINECDialog.zul
 */

export interface CreateReporteIRINECRequest {
  empresaId: number;
  tipo: string;
  anio: number;
  estado?: string;
}

export interface UpdateReporteIRINECRequest {
  estado?: string;
  observaciones?: string;
}

export interface GenerarReporteIRINECRequest {
  empresaId: number;
  tipo: string;
  anio: number;
  formato?: string;
}

export interface ReporteIRINECResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  tipo: string;
  anio: number;
  estado?: string;
  fechaGeneracion?: string;
}

export interface ReporteIRINECFilterParams {
  empresaId?: number;
  tipo?: string;
}

export interface ReporteIRINECListResponse {
  items: ReporteIRINECResponse[];
  total: number;
}

export interface ProcesoResponse {
  success: boolean;
  message: string;
  registrosGenerados?: number;
  archivoUrl?: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
