/**
 * Application Service: Procedimientos
 * Orquesta la logica de negocio entre puertos y adaptadores
 */

import { ProcedimientosUseCase } from '@shared/application/port/input/ProcedimientosUseCase';
import {
  Procedimiento,
  ProcedimientosFilter,
  ProcedimientosPageResult,
} from '@shared/domain/model/Procedimientos';
import {
  ProcedimientosNotFoundError,
  ProcedimientosValidationError,
} from '@shared/domain/exception/ProcedimientosError';
import { ProcedimientosGatewayAdapter } from '@shared/infrastructure/output/adapter/api/ProcedimientosGatewayAdapter';
import { ProcedimientosViewMapper } from '@shared/infrastructure/input/adapter/mapper/ProcedimientosViewMapper';

export class ProcedimientosApplicationService implements ProcedimientosUseCase {
  constructor(private readonly gatewayAdapter: ProcedimientosGatewayAdapter) {}

  async listAll(filter?: ProcedimientosFilter): Promise<ProcedimientosPageResult> {
    const dtoFilter = ProcedimientosViewMapper.toFilterDto(filter);
    const response = await this.gatewayAdapter.findAll(dtoFilter);
    return ProcedimientosViewMapper.toPageResult(response);
  }

  async getById(id: string | number): Promise<Procedimiento> {
    if (!id && id !== 0) {
      throw new ProcedimientosValidationError('El id de procedimiento es requerido', 'id');
    }

    const response = await this.gatewayAdapter.findById(id);
    if (!response) {
      throw new ProcedimientosNotFoundError(id);
    }

    return ProcedimientosViewMapper.toItem(response);
  }

  async remove(id: string | number): Promise<void> {
    if (!id && id !== 0) {
      throw new ProcedimientosValidationError('El id de procedimiento es requerido', 'id');
    }

    await this.gatewayAdapter.remove(id);
  }
}
