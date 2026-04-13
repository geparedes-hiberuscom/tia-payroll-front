/**
 * Dominio: Empresas
 * Tipos y modelos de negocio
 */

export interface Empresa {
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

export interface EmpresasFilter {
  page?: number;
  size?: number;
}

export interface EmpresasPageResult {
  items: Empresa[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
