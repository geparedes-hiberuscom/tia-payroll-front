import { Procesos } from '../../../../domain/model/Procesos';

interface ProcesosApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class ProcesosApiMapper {
  static toDomain(dto: ProcesosApiDto): Procesos {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Procesos>): Partial<ProcesosApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
