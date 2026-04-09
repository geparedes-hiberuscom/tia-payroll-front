/**
 * Use Case: Dimensiones
 * Contrato de entrada para operaciones de dimensiones
 */

import {
  DimensionType,
  DimensionItem,
  DimensionesFilter,
  DimensionesPageResult,
} from '@shared/domain/model/Dimensiones';

export interface DimensionesUseCase {
  listTypes(): Promise<DimensionType[]>;
  listItems(dimensionCode: string, filter?: DimensionesFilter): Promise<DimensionesPageResult>;
  getItemById(dimensionCode: string, id: string | number): Promise<DimensionItem>;
}
