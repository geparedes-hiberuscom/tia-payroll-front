import { Beneficios } from '../../../../domain/model/Beneficios';

interface BeneficiosApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class BeneficiosApiMapper {
  static toDomain(dto: BeneficiosApiDto): Beneficios {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Beneficios>): Partial<BeneficiosApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
