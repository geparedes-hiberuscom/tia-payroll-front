import {
  ClasesrubroListResponse,
  ClasesrubroResponse,
} from "../../../input/adapter/dto/ClasesrubroDto";

/**
 * API Mapper: clases-rubro
 * Transforma respuestas raw de API a DTOs tipados.
 */
export class ClasesrubroApiMapper {
  static toResponse(raw: any): ClasesrubroResponse {
    return {
      vidclase: String(raw.vidclase ?? raw.id ?? raw.codigo ?? ""),
      vclase: raw.vclase ?? raw.descripcion ?? "",
      vidclasepadre: raw.vidclasepadre,
      creportenomina: raw.creportenomina,
      cocultar: raw.cocultar,
    };
  }

  static toListResponse(raw: any): ClasesrubroListResponse {
    const data = raw.content || raw.data || raw;
    const items = Array.isArray(data)
      ? data.map((item: any) => ClasesrubroApiMapper.toResponse(item))
      : [];

    return {
      content: items,
      totalElements: raw.totalElements || raw.total || items.length,
      totalPages:
        raw.totalPages ||
        Math.ceil((raw.totalElements || items.length) / (raw.size || 10)),
      number: raw.number || raw.page || 0,
      size: raw.size || 10,
    };
  }
}
