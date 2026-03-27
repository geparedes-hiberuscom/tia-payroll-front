import { Integraciones } from '../../../../domain/model/Integraciones';

interface IntegracionesApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class IntegracionesApiMapper {
  static toDomain(dto: IntegracionesApiDto): Integraciones {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Integraciones>): Partial<IntegracionesApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
