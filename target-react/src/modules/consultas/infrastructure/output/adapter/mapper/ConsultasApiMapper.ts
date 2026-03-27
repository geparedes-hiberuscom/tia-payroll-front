import { Consultas } from '../../../../domain/model/Consultas';

interface ConsultasApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class ConsultasApiMapper {
  static toDomain(dto: ConsultasApiDto): Consultas {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Consultas>): Partial<ConsultasApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
