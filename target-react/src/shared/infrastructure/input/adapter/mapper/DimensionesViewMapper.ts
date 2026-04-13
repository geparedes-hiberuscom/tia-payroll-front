/**
 * View Mapper: Dimensiones
 * Transforma DTOs de API → modelos de dominio
 */

import {
  DimensionItem,
  DimensionesPageResult,
} from '@shared/domain/model/Dimensiones';
import { DimensioneslResponseDTO } from '@shared/infrastructure/output/adapter/dto/DimensionesDto';

export class DimensionesViewMapper {
  static toItem(dto: DimensioneslResponseDTO): DimensionItem {
    return {
      id: dto.id,
      codigoDimension: dto.codigoDimension,
      codigo: dto.codigo,
      descripcion: dto.descripcion,
      descripcionAdicional: dto.descripcionAdicional,
      area: dto.area,
      tipo: dto.tipo,
    };
  }

  static toPageResult(items: DimensioneslResponseDTO[]): DimensionesPageResult {
    const total = items.length;
    const pageSize = 10;
    const totalPages = Math.ceil(total / pageSize);

    return {
      items: items.map((item) => DimensionesViewMapper.toItem(item)),
      totalElements: total,
      totalPages,
      currentPage: 0,
    };
  }
}
