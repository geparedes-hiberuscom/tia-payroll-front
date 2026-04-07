import {
  CreateEjecucionbotRequest,
  EjecucionbotListResponse,
  EjecucionbotResponse,
  UpdateEjecucionbotRequest,
} from '../../../input/adapter/dto/EjecucionbotDto';

export class EjecucionbotApiMapper {
  static toResponse(raw: unknown): EjecucionbotResponse {
    const source = raw as Partial<EjecucionbotResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as EjecucionbotResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): EjecucionbotListResponse {
    const source = raw as {
      data?: unknown[];
      content?: unknown[];
      totalElements?: number;
      total?: number;
      totalPages?: number;
      page?: number;
      number?: number;
      size?: number;
      pageSize?: number;
    };
    const rows = source.data ?? source.content ?? [];
    return {
      data: rows.map((item) => EjecucionbotApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateEjecucionbotRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateEjecucionbotRequest): Record<string, unknown> {
    return { ...request };
  }
}
