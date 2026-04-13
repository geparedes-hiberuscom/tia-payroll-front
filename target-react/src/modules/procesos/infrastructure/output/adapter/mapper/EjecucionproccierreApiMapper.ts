import {
  CierreResultadoResponse,
  CreateEjecucionproccierreRequest,
  EjecucionproccierreListResponse,
  EjecucionproccierreResponse,
  ProcesoResultadoResponse,
  UpdateEjecucionproccierreRequest,
} from '../../../input/adapter/dto/EjecucionproccierreDto';

export class EjecucionproccierreApiMapper {
  static toResponse(raw: unknown): EjecucionproccierreResponse {
    const source = raw as Partial<EjecucionproccierreResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as EjecucionproccierreResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): EjecucionproccierreListResponse {
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
      data: rows.map((item) => EjecucionproccierreApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateEjecucionproccierreRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateEjecucionproccierreRequest): Record<string, unknown> {
    return { ...request };
  }

  static toCierreResult(raw: unknown): CierreResultadoResponse {
    const source = raw as Partial<CierreResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }

  static toProcessResult(raw: unknown): ProcesoResultadoResponse {
    const source = raw as Partial<ProcesoResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }
}
