import { GestiontablairGestiontablairdialogResponse, GestiontablairGestiontablairdialogListResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest } from '../../../input/adapter/dto/GestiontablairGestiontablairdialogDto';

/**
 * API Mapper: gestionTablaIR.zul / gestionTablaIRDialog.zul
 */
export class GestiontablairGestiontablairdialogApiMapper {

  static toResponse(raw: any): GestiontablairGestiontablairdialogResponse {
    return {
      id: raw.id,
      anio: raw.anio,
      nivel: raw.nivel,
      tipo: raw.tipo,
      valorMinimo: raw.valorMinimo,
      valorMaximo: raw.valorMaximo,
      fraccionBasica: raw.fraccionBasica,
      porcentajeExcedente: raw.porcentajeExcedente,
    };
  }

  static toListResponse(raw: any): GestiontablairGestiontablairdialogListResponse {
    return {
      content: Array.isArray(raw.content) ? raw.content.map(GestiontablairGestiontablairdialogApiMapper.toResponse) : [],
      totalElements: raw.totalElements || 0,
      totalPages: raw.totalPages || 0,
      page: raw.page || 0,
      size: raw.size || 10,
    };
  }

  static toCreatePayload(request: CreateGestiontablairGestiontablairdialogRequest): Record<string, unknown> {
    return { ...request };
  }

  static toUpdatePayload(request: UpdateGestiontablairGestiontablairdialogRequest): Record<string, unknown> {
    return { ...request };
  }
}
