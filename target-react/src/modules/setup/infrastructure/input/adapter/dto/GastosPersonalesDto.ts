/**
 * DTOs para Gastos Personales deducibles
 * Screen: GastosPersonalesDialog.zul
 */

export interface CreateGastosPersonalesRequest {
  empresaId: number;
  anio: number;
  descripcion: string;
  montoMaximo?: number;
  porcentaje?: number;
}

export interface UpdateGastosPersonalesRequest {
  descripcion?: string;
  montoMaximo?: number;
  porcentaje?: number;
}

export interface GastosPersonalesResponse {
  id: number;
  empresaId: number;
  empresaNombre?: string;
  anio: number;
  descripcion: string;
  montoMaximo?: number;
  porcentaje?: number;
  estado?: string;
}

export interface GastosPersonalesFilterParams {
  empresaId?: number;
  anio?: number;
}

export interface GastosPersonalesListResponse {
  items: GastosPersonalesResponse[];
  total: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
