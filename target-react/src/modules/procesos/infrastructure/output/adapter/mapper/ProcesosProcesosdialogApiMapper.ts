import {
  CreateProcesosProcesosdialogRequest,
  ProcesosProcesosdialogListResponse,
  ProcesosProcesosdialogResponse,
  UpdateProcesosProcesosdialogRequest,
} from '../../../input/adapter/dto/ProcesosProcesosdialogDto';

export class ProcesosProcesosdialogApiMapper {
  static toResponse(raw: unknown): ProcesosProcesosdialogResponse {
    const source = raw as Partial<ProcesosProcesosdialogResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosProcesosdialogResponse),
      id: Number(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosProcesosdialogListResponse {
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
      data: rows.map((item) => ProcesosProcesosdialogApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosProcesosdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosProcesosdialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
