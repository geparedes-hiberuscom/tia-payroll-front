import { Pago } from '../../../../domain/model/Pago';

interface PagoApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class PagoApiMapper {
  static toDomain(dto: PagoApiDto): Pago {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Pago>): Partial<PagoApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
