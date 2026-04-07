import {
  CreateInstanciasprocesosInstanciasprocesosdialogRequest,
  InstanciasprocesosInstanciasprocesosdialogListResponse,
  InstanciasprocesosInstanciasprocesosdialogResponse,
  UpdateInstanciasprocesosInstanciasprocesosdialogRequest,
} from '../../../input/adapter/dto/InstanciasprocesosInstanciasprocesosdialogDto';

export class InstanciasprocesosInstanciasprocesosdialogApiMapper {
  static toResponse(raw: unknown): InstanciasprocesosInstanciasprocesosdialogResponse {
    const source = raw as Partial<InstanciasprocesosInstanciasprocesosdialogResponse> & { id?: string | number; rubroId?: string };
    return {
      ...(source as InstanciasprocesosInstanciasprocesosdialogResponse),
      id: String(source.id ?? source.rubroId ?? ''),
    };
  }

  static toListResponse(raw: unknown): InstanciasprocesosInstanciasprocesosdialogListResponse {
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
      data: rows.map((item) => InstanciasprocesosInstanciasprocesosdialogApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateInstanciasprocesosInstanciasprocesosdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateInstanciasprocesosInstanciasprocesosdialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
