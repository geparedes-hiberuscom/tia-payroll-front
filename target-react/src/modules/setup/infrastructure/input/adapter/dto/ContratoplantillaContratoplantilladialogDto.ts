/**
 * DTOs para funcionalidad: contratoPlantilla.zul / contratoPlantillaDialog.zul (contratoPlantilla_contratoPlantillaDialog)
 * Entidades fuente: 7
 * Controladores fuente: 6
 */

// ─── Request DTOs ───

export interface CreateContratoplantillaContratoplantilladialogRequest {
  vdescplantilla: string;
  vnombrearchivo?: string;
  vnombrearchivo2?: string;
}

export interface UpdateContratoplantillaContratoplantilladialogRequest {
  vdescplantilla?: string;
  vnombrearchivo?: string;
  vnombrearchivo2?: string;
}

export interface ContratoplantillaContratoplantilladialogFilterParams {
  page?: number;
  size?: number;
  descripcion?: string;
}

// ─── Response DTOs ───

export interface ContratoplantillaContratoplantilladialogResponse {
  id: string;
  descripcion: string;
  nombreArchivo?: string;
  nombreArchivo2?: string;
  usuarioIngreso?: string;
  fechaIngreso?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
}

export interface ContratoplantillaContratoplantilladialogListResponse {
  content: ContratoplantillaContratoplantilladialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface ContratoplantillaContratoplantilladialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
