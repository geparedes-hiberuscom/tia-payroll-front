import { Setup } from '../../../../domain/model/Setup';

interface SetupApiDto {
  id: string;
  nombre: string;
}

export class SetupApiMapper {
  static toDomain(dto: SetupApiDto): Setup {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Setup>): Partial<SetupApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
