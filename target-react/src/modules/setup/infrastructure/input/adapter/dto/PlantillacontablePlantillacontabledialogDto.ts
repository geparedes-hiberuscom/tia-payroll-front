/**
 * DTOs para funcionalidad: plantillaContable.zul / plantillaContableDialog.zul (plantillaContable_plantillaContableDialog)
 * Entidades fuente: 5
 * Controladores fuente: 5
 */

// ─── Request DTOs ───

export interface CreatePlantillacontablePlantillacontabledialogRequest {
  rubroId: string;
  procesoId: number;
  cuenta: string;
  debeHaber: string;
  subcuenta?: string;
  auxiliar?: string;
  distribucionCosto?: string;
  rpt?: string;
  tcDmCentroCosto?: string;
  tcDmLocalidad?: string;
  agrupacionCC?: string;
  agrupacionLoc?: string;
  dimensionId?: number;
}

export interface UpdatePlantillacontablePlantillacontabledialogRequest {
  rubroId?: string;
  procesoId?: number;
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

export interface PlantillacontablePlantillacontabledialogFilterParams {
  page?: number;
  size?: number;
  procesoId?: number;
  rubroId?: string;
  cuenta?: string;
  dimensionId?: number;
}

// ─── Response DTOs ───

export interface PlantillacontablePlantillacontabledialogResponse {
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

export interface PlantillacontablePlantillacontabledialogListResponse {
  content: PlantillacontablePlantillacontabledialogResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── API Error DTO ───

export interface PlantillacontablePlantillacontabledialogErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path?: string;
}
