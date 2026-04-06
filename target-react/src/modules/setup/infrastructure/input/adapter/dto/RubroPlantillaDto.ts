/**
 * DTOs para Rubros de Plantillas Contables
 * Screen: rubroplantillaContableDialog.zul
 */

export interface CreateRubroPlantillaRequest {
  rubroId: string;
  cuenta: string;
  subcuenta?: string;
  debeHaber: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
}

export interface UpdateRubroPlantillaRequest {
  cuenta?: string;
  subcuenta?: string;
  debeHaber?: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
}

export interface RubroPlantillaResponse {
  plantillaId: number;
  rubroId: string;
  rubroNombre?: string;
  cuenta: string;
  subcuenta?: string;
  debeHaber: string;
  auxiliar?: string;
  distribucionCosto?: string;
  dimensionId?: number;
  dimensionNombre?: string;
}

export interface RubroPlantillaFilterParams {
  plantillaId: number;
}

export interface RubroPlantillaListResponse {
  items: RubroPlantillaResponse[];
  total: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
