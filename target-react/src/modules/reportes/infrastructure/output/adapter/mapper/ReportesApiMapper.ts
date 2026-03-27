import { Reportes } from '../../../../domain/model/Reportes';

interface ReportesApiDto {
  id: string;
  nombre: string;
  // TODO: Mapear campos de la API
}

export class ReportesApiMapper {
  static toDomain(dto: ReportesApiDto): Reportes {
    return {
      id: dto.id,
      nombre: dto.nombre,
    };
  }

  static toApi(model: Partial<Reportes>): Partial<ReportesApiDto> {
    return {
      nombre: model.nombre,
    };
  }
}
