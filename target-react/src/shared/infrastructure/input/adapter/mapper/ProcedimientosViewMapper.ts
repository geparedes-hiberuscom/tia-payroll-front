import {
  Procedimiento,
  ProcedimientosPageResult,
} from '@shared/domain/model/Procedimientos';
import {
  ProcedimientoResponseDTO,
  ProcedimientosFilterParamsDTO,
  ProcedimientosListResponseDTO,
} from '@shared/infrastructure/output/adapter/dto/ProcedimientosDto';

export class ProcedimientosViewMapper {
  static toItem(dto: ProcedimientoResponseDTO): Procedimiento {
    return {...dto
    };
  }

  static toPageResult(response: ProcedimientosListResponseDTO): ProcedimientosPageResult {
    return {
      items: response.data.map((item) => ProcedimientosViewMapper.toItem(item)),
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      page: response.page,
      size: response.size,
    };
  }

  static toFilterDto(filter?: {
    page?: number;
    size?: number;
    tipo?: string;
  }): ProcedimientosFilterParamsDTO {
    return {
      page: filter?.page,
      size: filter?.size,
      tipo: filter?.tipo,
    };
  }

}
