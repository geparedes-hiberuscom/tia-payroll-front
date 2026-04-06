/**
 * DTOs para Tabla IR (Impuesto a la Renta)
 * Screen: gestionTablaIR.zul / gestionTablaIRDialog.zul
 */

export interface CreateTablaIRRequest {
  anio: number;
  nivel: number;
  tipo: string;
  valorMinimo: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface UpdateTablaIRRequest {
  anio?: number;
  nivel?: number;
  tipo?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface TablaIRResponse {
  id: number;
  anio: number;
  nivel: number;
  tipo: string;
  valorMinimo: number;
  valorMaximo?: number;
  fraccionBasica?: number;
  porcentajeExcedente?: number;
}

export interface TablaIRFilterParams {
  page?: number;
  size?: number;
  anio?: number;
  tipo?: string;
}

export interface TablaIRPageResponse {
  content: TablaIRResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
