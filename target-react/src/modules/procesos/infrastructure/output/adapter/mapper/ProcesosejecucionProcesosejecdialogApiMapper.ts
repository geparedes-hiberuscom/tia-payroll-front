import {
  CreateProcesosejecucionProcesosejecdialogRequest,
  EjecucionResultadoResponse,
  ProcesosejecucionProcesosejecdialogListResponse,
  ProcesosejecucionProcesosejecdialogResponse,
  UpdateProcesosejecucionProcesosejecdialogRequest,
} from '../../../input/adapter/dto/ProcesosejecucionProcesosejecdialogDto';

export class ProcesosejecucionProcesosejecdialogApiMapper {
  static toResponse(raw: unknown): ProcesosejecucionProcesosejecdialogResponse {
    const source = raw as Partial<ProcesosejecucionProcesosejecdialogResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosejecucionProcesosejecdialogResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosejecucionProcesosejecdialogListResponse {
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
      data: rows.map((item) => ProcesosejecucionProcesosejecdialogApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosejecucionProcesosejecdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosejecucionProcesosejecdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toExecutionResult(raw: unknown): EjecucionResultadoResponse {
    const source = raw as Partial<EjecucionResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }
}
