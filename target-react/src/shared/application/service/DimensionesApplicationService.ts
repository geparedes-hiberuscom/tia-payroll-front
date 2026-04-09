/**
 * Application Service: Dimensiones
 * Orquesta la lógica de negocio entre puertos y adaptadores
 */

import { DimensionesUseCase } from '@shared/application/port/input/DimensionesUseCase';
import { DimensionesGatewayAdapter } from '@shared/infrastructure/output/adapter/api/DimensionesGatewayAdapter';
import {
  DimensionType,
  DimensionItem,
  DimensionesFilter,
  DimensionesPageResult,
} from '@shared/domain/model/Dimensiones';
import {
  DimensionesNotFoundError,
  DimensionesValidationError,
} from '@shared/domain/exception/DimensionesError';
import { DimensionesViewMapper } from '@shared/infrastructure/input/adapter/mapper/DimensionesViewMapper';

export class DimensionesApplicationService implements DimensionesUseCase {
  constructor(private readonly gatewayAdapter: DimensionesGatewayAdapter) {}

  async listTypes(): Promise<DimensionType[]> {
    const response = await this.gatewayAdapter.listTypes();
    return response.map((dto) => ({
      codigo: dto.codigo,
      nombre: dto.nombre,
    }));
  }

  async listItems(
    dimensionCode: string,
    filter?: DimensionesFilter,
  ): Promise<DimensionesPageResult> {
    if (!dimensionCode || !dimensionCode.trim()) {
      throw new DimensionesValidationError('El código de dimensión es requerido', 'dimensionCode');
    }

    const response = await this.gatewayAdapter.listItems(dimensionCode);
    return DimensionesViewMapper.toPageResult(response);
  }

  async getItemById(dimensionCode: string, id: string | number): Promise<DimensionItem> {
    if (!dimensionCode || !dimensionCode.trim()) {
      throw new DimensionesValidationError('El código de dimensión es requerido', 'dimensionCode');
    }

    if (!id) {
      throw new DimensionesValidationError('El id del item es requerido', 'id');
    }

    const response = await this.gatewayAdapter.getItemById(dimensionCode, id);
    if (!response) {
      throw new DimensionesNotFoundError(id);
    }

    return DimensionesViewMapper.toItem(response);
  }
}
