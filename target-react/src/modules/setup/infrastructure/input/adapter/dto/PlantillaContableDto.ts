/**
 * DTOs para Plantillas Contables
 * Screen: plantillaContable.zul / plantillaContableDialog.zul
 */

export interface CreatePlantillaContableRequest {
  procesoId: number;
  rubroId: string;
  cuenta: string;
  subcuenta?: string;
  auxiliar?: string;
  debeHaber: string;
  distribucionCosto?: string;
  rpt?: string;
  tcDmCentroCosto?: string;
  tcDmLocalidad?: string;
  agrupacionCC?: string;
  agrupacionLoc?: string;
  dimensionId?: number;
}

export interface UpdatePlantillaContableRequest {
  cuenta?: string;
  subcuenta?: string;
  auxiliar?: string;
  debeHaber?: string;
  distribucionCosto?: string;
  rpt?: string;
  tcDmCentroCosto?: string;
  tcDmLocalidad?: string;
  agrupacionCC?: string;
  agrupacionLoc?: string;
  dimensionId?: number;
}

export interface PlantillaContableResponse {
  id: number;
  procesoId: number;
  procesoNombre?: string;
  rubroId: string;
  rubroNombre?: string;
  cuenta: string;
  subcuenta?: string;
  auxiliar?: string;
  debeHaber: string;
  distribucionCosto?: string;
  rpt?: string;
  tcDmCentroCosto?: string;
  tcDmLocalidad?: string;
  agrupacionCC?: string;
  agrupacionLoc?: string;
  dimensionId?: number;
  dimensionNombre?: string;
}

export interface PlantillaContableFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  rubroId?: string;
  cuenta?: string;
  localidadId?: number;
}

export interface PlantillaContablePageResponse {
  content: PlantillaContableResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}
