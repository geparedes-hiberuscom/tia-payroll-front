import {
  DimensionesResponseDTO,
  DimensioneslResponseDTO,
} from '../dto/DimensionesDto';

export class DimensionesApiMapper {
  static toDimensionTypeResponse(raw: any): DimensionesResponseDTO {
    return {
      codigo: String(raw.codigo ?? ''),
      nombre: String(raw.nombre ?? ''),
    };
  }

  static toDimensionItemResponse(raw: any): DimensioneslResponseDTO {
    return {
      id: Number(raw.id ?? 0),
      codigoDimension: String(raw.codigoDimension ?? ''),
      codigo: String(raw.codigo ?? ''),
      descripcion: String(raw.descripcion ?? ''),
      descripcionAdicional: raw.descripcionAdicional,
      area: raw.area,
      tipo: raw.tipo,
    };
  }

  static toDimensionTypeList(raw: any): DimensionesResponseDTO[] {
    const data = raw.content || raw.data || raw.items || raw;
    return Array.isArray(data)
      ? data.map((item: any) => DimensionesApiMapper.toDimensionTypeResponse(item))
      : [];
  }

  static toDimensionItemList(raw: any): DimensioneslResponseDTO[] {
    const data = raw.content || raw.data || raw.items || raw;
    return Array.isArray(data)
      ? data.map((item: any) => DimensionesApiMapper.toDimensionItemResponse(item))
      : [];
  }
}
