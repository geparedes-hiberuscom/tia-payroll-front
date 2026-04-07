import {
  CreateSobregiroshistricossubrecursoRequest,
  SobregiroshistricossubrecursoListResponse,
  SobregiroshistricossubrecursoResponse,
  UpdateSobregiroshistricossubrecursoRequest,
} from '../../../input/adapter/dto/SobregiroshistricossubrecursoDto';

export class SobregiroshistricossubrecursoApiMapper {
  static toResponse(raw: unknown): SobregiroshistricossubrecursoResponse {
    const source = raw as Partial<SobregiroshistricossubrecursoResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as SobregiroshistricossubrecursoResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): SobregiroshistricossubrecursoListResponse {
    const source = raw as {
      data?: unknown[];
      content?: unknown[];
      items?: unknown[];
      totalElements?: number;
      total?: number;
      totalPages?: number;
      page?: number;
      number?: number;
      size?: number;
      pageSize?: number;
    };
    const rows = source.data ?? source.content ?? source.items ?? [];
    return {
      data: rows.map((item) => SobregiroshistricossubrecursoApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateSobregiroshistricossubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateSobregiroshistricossubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }
}
