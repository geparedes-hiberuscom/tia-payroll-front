import {
  CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
  ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse,
  ProcesosejecucionreversionProcesosejecucionreversiondialogResponse,
  ReversionResultadoResponse,
  SobreGiroListResponse,
  SobreGiroResponse,
  UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest,
} from '../../../input/adapter/dto/ProcesosejecucionreversionProcesosejecucionreversiondialogDto';

export class ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper {
  static toResponse(raw: unknown): ProcesosejecucionreversionProcesosejecucionreversiondialogResponse {
    const source = raw as Partial<ProcesosejecucionreversionProcesosejecucionreversiondialogResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as ProcesosejecucionreversionProcesosejecucionreversiondialogResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): ProcesosejecucionreversionProcesosejecucionreversiondialogListResponse {
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
      data: rows.map((item) => ProcesosejecucionreversionProcesosejecucionreversiondialogApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcesosejecucionreversionProcesosejecucionreversiondialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toReversionResult(raw: unknown): ReversionResultadoResponse {
    const source = raw as Partial<ReversionResultadoResponse>;
    return {
      success: Boolean(source.success),
      message: source.message ?? '',
    };
  }

  static toSobreGiroListResponse(raw: unknown): SobreGiroListResponse {
    const source = raw as { items?: unknown[]; total?: number };
    const items = (source.items ?? []).map((item) => {
      const row = item as Partial<SobreGiroResponse> & {
        ejecucionId?: string | number;
        colaboradorId?: string | number;
        rubroId?: string | number;
      };

      return {
        ejecucionId: Number(row.ejecucionId ?? 0),
        colaboradorId: Number(row.colaboradorId ?? 0),
        rubroId: String(row.rubroId ?? ''),
        descripcion: row.descripcion,
        valor: row.valor,
      };
    });

    return {
      items,
      total: source.total ?? items.length,
    };
  }
}
