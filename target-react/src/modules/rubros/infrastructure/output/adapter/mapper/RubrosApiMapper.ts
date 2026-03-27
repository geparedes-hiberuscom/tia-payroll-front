import { Rubros } from '../../../../domain/model/Rubros';

interface RubrosApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class RubrosApiMapper {
  static toDomain(dto: RubrosApiDto): Rubros {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Rubros>): Partial<RubrosApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
