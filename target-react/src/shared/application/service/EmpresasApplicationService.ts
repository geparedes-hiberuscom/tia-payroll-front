/**
 * Application Service: Empresas
 * Orquesta la lógica de negocio entre puertos y adaptadores
 */

import { EmpresasUseCase } from '@shared/application/port/input/EmpresasUseCase';
import { EmpresasGatewayAdapter } from '@shared/infrastructure/output/adapter/api/EmpresasGatewayAdapter';
import { Empresa, EmpresasFilter, EmpresasPageResult } from '@shared/domain/model/Empresas';
import {
  EmpresasNotFoundError,
  EmpresasValidationError,
} from '@shared/domain/exception/EmpresasError';
import { EmpresasViewMapper } from '@shared/infrastructure/input/adapter/mapper/EmpresasViewMapper';

export class EmpresasApplicationService implements EmpresasUseCase {
  constructor(private readonly gatewayAdapter: EmpresasGatewayAdapter) {}

  async listAll(filter?: EmpresasFilter): Promise<EmpresasPageResult> {
    const response = await this.gatewayAdapter.findAll(filter);
    return EmpresasViewMapper.toPageResult(response);
  }

  async getById(id: string | number): Promise<Empresa> {
    if (!id) {
      throw new EmpresasValidationError('El id de empresa es requerido', 'id');
    }

    const response = await this.gatewayAdapter.findById(id);
    if (!response) {
      throw new EmpresasNotFoundError(id);
    }

    return EmpresasViewMapper.toItem(response);
  }
}
