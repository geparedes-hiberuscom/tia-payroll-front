import {
  CreateProcesosejecabrirlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecabrirlqListResponse,
  ProcesosejecabrirlqResponse,
  UpdateProcesosejecabrirlqRequest,
} from '../../../input/adapter/dto/ProcesosejecabrirlqDto';

export class ProcesosejecabrirlqApiMapper {
  static toResponse(raw: unknown): ProcesosejecabrirlqResponse {
    const source = raw as Partial<ProcesosejecabrirlqResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosejecabrirlqResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosejecabrirlqListResponse {
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
      data: rows.map((item) => ProcesosejecabrirlqApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosejecabrirlqRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosejecabrirlqRequest): Record<string, unknown> {
    return { ...request };
  }

  static toProcessResult(raw: unknown): ProcesoResultadoResponse {
    const source = raw as Partial<ProcesoResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }
}
