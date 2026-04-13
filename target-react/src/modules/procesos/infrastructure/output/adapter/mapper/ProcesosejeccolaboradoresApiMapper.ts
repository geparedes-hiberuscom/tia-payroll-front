import {
  CreateProcesosejeccolaboradoresRequest,
  EjecucionResultadoResponse,
  ProcesosejeccolaboradoresListResponse,
  ProcesosejeccolaboradoresResponse,
  RubroPreliquidadoListResponse,
  RubroPreliquidadoItem,
  UpdateProcesosejeccolaboradoresRequest,
} from '../../../input/adapter/dto/ProcesosejeccolaboradoresDto';

export class ProcesosejeccolaboradoresApiMapper {
  static toResponse(raw: unknown): ProcesosejeccolaboradoresResponse {
    const source = raw as Partial<ProcesosejeccolaboradoresResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosejeccolaboradoresResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosejeccolaboradoresListResponse {
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
      data: rows.map((item) => ProcesosejeccolaboradoresApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosejeccolaboradoresRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosejeccolaboradoresRequest): Record<string, unknown> {
    return { ...request };
  }

  static toExecutionResult(raw: unknown): EjecucionResultadoResponse {
    const source = raw as Partial<EjecucionResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }

  static toRubroPreliquidadoListResponse(raw: unknown): RubroPreliquidadoListResponse {
    const source = raw as { items?: unknown[]; total?: number };
    const items = (source.items ?? []).map((item) => {
      const row = item as Partial<RubroPreliquidadoItem> & { rubroId?: string | number };
      return {
        rubroId: String(row.rubroId ?? ''),
        valor: row.valor,
        descripcion: row.descripcion,
      };
    });

    return {
      items,
      total: source.total ?? items.length,
    };
  }
}
