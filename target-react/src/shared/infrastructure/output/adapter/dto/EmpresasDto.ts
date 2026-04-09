/**
 * DTOs de API: Empresas
 * Schemas Swagger:
 *  - EmpresaResponseDTO
 *  - PageResponseDTOEmpresaResponseDTO
 */

export interface EmpresaResponseDTO {
  iidempresa: number;
  cliId: number;
  vempresanl: string;
  vempresanc: string;
  vruc: string;
  vidacreditacion?: string;
  vidempresacl?: string;
  vruccontador?: string;
  vimagenempresa?: string;
  horaingresoAu?: string;
  usuarioingresoAu?: string;
  horamodificacionAu?: string;
  usuariomodificacionAu?: string;
}

export interface EmpresasFilterParamsDTO {
  page?: number;
  size?: number;
}

export interface PageResponseDTOEmpresaResponseDTO {
  content: EmpresaResponseDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Alias de compatibilidad
export type EmpresasListResponseDTO = PageResponseDTOEmpresaResponseDTO;
