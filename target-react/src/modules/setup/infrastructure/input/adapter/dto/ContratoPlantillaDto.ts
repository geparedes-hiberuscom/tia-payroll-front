/**
 * DTOs para Plantillas de Contratos
 * Screen: contratoPlantilla.zul / contratoPlantillaDialog.zul
 */

export interface CreateContratoPlantillaRequest {
  descripcion: string;
  nombreArchivo?: string;
  nombreArchivo2?: string;
}

export interface UpdateContratoPlantillaRequest {
  descripcion?: string;
  nombreArchivo?: string;
  nombreArchivo2?: string;
}

export interface ContratoPlantillaResponse {
  id: number;
  descripcion: string;
  nombreArchivo?: string;
  nombreArchivo2?: string;
  usuarioIngreso?: string;
  fechaIngreso?: string;
  usuarioModificacion?: string;
  fechaModificacion?: string;
}

export interface ContratoPlantillaFilterParams {
  page?: number;
  size?: number;
  nombre?: string;
  descripcion?: string;
}

export interface ContratoPlantillaPageResponse {
  content: ContratoPlantillaResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface ArchivoPlantillaUploadRequest {
  archivo: File;
  tipo: 'PRINCIPAL' | 'SECUNDARIO';
}

export interface ArchivoPlantillaUploadResponse {
  success: boolean;
  nombreArchivo: string;
  message: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
