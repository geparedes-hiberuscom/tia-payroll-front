import {
  CreateLogderegistrosdeprocesosubrecursoRequest,
  LogderegistrosdeprocesosubrecursoListResponse,
  LogderegistrosdeprocesosubrecursoResponse,
  UpdateLogderegistrosdeprocesosubrecursoRequest,
} from '../../../input/adapter/dto/LogderegistrosdeprocesosubrecursoDto';

export class LogderegistrosdeprocesosubrecursoApiMapper {
  static toResponse(raw: unknown): LogderegistrosdeprocesosubrecursoResponse {
    const source = raw as Partial<LogderegistrosdeprocesosubrecursoResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as LogderegistrosdeprocesosubrecursoResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): LogderegistrosdeprocesosubrecursoListResponse {
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
      data: rows.map((item) => LogderegistrosdeprocesosubrecursoApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateLogderegistrosdeprocesosubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateLogderegistrosdeprocesosubrecursoRequest): Record<string, unknown> {
    return { ...request };
  }
}
