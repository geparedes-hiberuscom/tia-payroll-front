import { Costos } from '../../../../domain/model/Costos';

interface CostosApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class CostosApiMapper {
  static toDomain(dto: CostosApiDto): Costos {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Costos>): Partial<CostosApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
