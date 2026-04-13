import {
  CreateRubrospreliquidadossubrecursoRequest,
  RubrospreliquidadossubrecursoListResponse,
  RubrospreliquidadossubrecursoResponse,
  UpdateRubrospreliquidadossubrecursoRequest,
} from '../../../input/adapter/dto/RubrospreliquidadossubrecursoDto';

export class RubrospreliquidadossubrecursoApiMapper {
  static toResponse(raw: unknown): RubrospreliquidadossubrecursoResponse {
    const source = raw as Partial<RubrospreliquidadossubrecursoResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as RubrospreliquidadossubrecursoResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): RubrospreliquidadossubrecursoListResponse {
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
      data: rows.map((item) => RubrospreliquidadossubrecursoApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateRubrospreliquidadossubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateRubrospreliquidadossubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }
}
