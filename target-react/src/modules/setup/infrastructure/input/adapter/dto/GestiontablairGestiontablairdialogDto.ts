/**
 * DTOs para funcionalidad: gestionTablaIR.zul / gestionTablaIRDialog.zul (gestionTablaIR_gestionTablaIRDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 */

// ─── Request DTOs ───

export interface CreateGestiontablairGestiontablairdialogRequest {
  anio: number;
  nivel: number;
  tipo: string;
  valorMinimo: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface UpdateGestiontablairGestiontablairdialogRequest {
  anio?: number;
  nivel?: number;
  tipo?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface GestiontablairGestiontablairdialogFilterParams {
  page?: number;
  size?: number;
  anio?: number;
  tipo?: string;
}

// ─── Response DTOs ───

export interface GestiontablairGestiontablairdialogResponse {
  id: number;
  anio: number;
  nivel: number;
  tipo: string;
  valorMinimo: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface GestiontablairGestiontablairdialogListResponse {
  content: GestiontablairGestiontablairdialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface GestiontablairGestiontablairdialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
