import {
  CreateProcesosejecaprobarlqRequest,
  ProcesoResultadoResponse,
  ProcesosejecaprobarlqListResponse,
  ProcesosejecaprobarlqResponse,
  RechazarLiquidacionRequest,
  UpdateProcesosejecaprobarlqRequest,
} from '../../../input/adapter/dto/ProcesosejecaprobarlqDto';

export class ProcesosejecaprobarlqApiMapper {
  static toResponse(raw: unknown): ProcesosejecaprobarlqResponse {
    const source = raw as Partial<ProcesosejecaprobarlqResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosejecaprobarlqResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosejecaprobarlqListResponse {
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
      data: rows.map((item) => ProcesosejecaprobarlqApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosejecaprobarlqRequest): Record<string, unknown> {
    return { ...request };
  }

  static toRejectPayload(request: RechazarLiquidacionRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosejecaprobarlqRequest): Record<string, unknown> {
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
