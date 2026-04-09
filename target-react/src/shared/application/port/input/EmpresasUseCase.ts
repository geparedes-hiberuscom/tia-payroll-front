/**
 * Use Case: Empresas
 * Contrato de entrada para operaciones de empresas
 */

import { Empresa, EmpresasFilter, EmpresasPageResult } from '@shared/domain/model/Empresas';

export interface EmpresasUseCase {
  listAll(filter?: EmpresasFilter): Promise<EmpresasPageResult>;
  getById(id: string | number): Promise<Empresa>;
}
