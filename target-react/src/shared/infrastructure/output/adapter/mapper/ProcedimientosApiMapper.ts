import {
  CreateProcedimientoRequestDTO,
  ProcedimientoResponseDTO,
  ProcedimientosListResponseDTO,
  UpdateProcedimientoRequestDTO,
} from '../dto/ProcedimientosDto';

export class ProcedimientosApiMapper {
  static toResponse(raw: unknown): ProcedimientoResponseDTO {
    const source = raw as Partial<ProcedimientoResponseDTO> & {
      id?: string | number;
    };

    return {
      ...(source as ProcedimientoResponseDTO),
    };
  }

  static toListResponse(raw: unknown): ProcedimientosListResponseDTO {
    if (Array.isArray(raw)) {
      const rows = raw;
      return {
        data: rows.map((item) => ProcedimientosApiMapper.toResponse(item)),
        totalElements: rows.length,
        totalPages: 1,
        page: 0,
        size: rows.length,
      };
    }

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
      data: rows.map((item) => ProcedimientosApiMapper.toResponse(item)),
      totalElements: source.totalElements ?? source.total ?? rows.length,
      totalPages: source.totalPages ?? 1,
      page: source.page ?? source.number ?? 0,
      size: source.size ?? source.pageSize ?? rows.length,
    };
  }

  static toCreatePayload(request: CreateProcedimientoRequestDTO): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateProcedimientoRequestDTO): Record<string, unknown> {
    return { ...request };
  }
}
