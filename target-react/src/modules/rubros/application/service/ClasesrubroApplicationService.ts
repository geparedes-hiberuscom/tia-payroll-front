import { ClasesrubroUseCase } from '../port/input/ClasesrubroUseCase';
import { ClasesrubroGatewayPort } from '../port/output/ClasesrubroGatewayPort';
import {
  Clasesrubro,
  ClasesrubroFilter,
  ClasesrubroPageResult,
} from '../../domain/model/Clasesrubro';
import {
  ClasesrubroNotFoundError,
  ClasesrubroValidationError,
} from '../../domain/exception/ClasesrubroError';
import { ClasesrubroViewMapper } from '../../infrastructure/input/adapter/mapper/ClasesrubroViewMapper';

export class ClasesrubroApplicationService implements ClasesrubroUseCase {
  constructor(private readonly gatewayPort: ClasesrubroGatewayPort) {}

  async findAll(filter?: ClasesrubroFilter): Promise<ClasesrubroPageResult> {
    const params = filter
      ? ClasesrubroViewMapper.toFilterParams(filter)
      : undefined;
    const response = await this.gatewayPort.findAll(params);
    return ClasesrubroViewMapper.toPageResult(response);
  }

  async findById(claseId: string): Promise<Clasesrubro> {
    if (!claseId || !claseId.trim()) {
      throw new ClasesrubroValidationError('El id es requerido', 'claseId');
    }

    const response = await this.gatewayPort.findById(claseId);
    if (!response) {
      throw new ClasesrubroNotFoundError(claseId);
    }

    return ClasesrubroViewMapper.toDomain(response);
  }
}
