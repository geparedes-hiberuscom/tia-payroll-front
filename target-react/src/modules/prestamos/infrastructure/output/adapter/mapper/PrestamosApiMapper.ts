import { Prestamos } from '../../../../domain/model/Prestamos';

interface PrestamosApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class PrestamosApiMapper {
  static toDomain(dto: PrestamosApiDto): Prestamos {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Prestamos>): Partial<PrestamosApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
