import {
  EmpresaResponseDTO,
  PageResponseDTOEmpresaResponseDTO,
} from '../dto/EmpresasDto';

export class EmpresasApiMapper {
  static toResponse(raw: any): EmpresaResponseDTO {
    return {
      iidempresa: Number(raw.iidempresa ?? raw.id ?? 0),
      cliId: Number(raw.cliId ?? 0),
      vempresanl: String(raw.vempresanl ?? ''),
      vempresanc: String(raw.vempresanc ?? ''),
      vruc: String(raw.vruc ?? ''),
      vidacreditacion: raw.vidacreditacion,
      vidempresacl: raw.vidempresacl,
      vruccontador: raw.vruccontador,
      vimagenempresa: raw.vimagenempresa,
      horaingresoAu: raw.horaingresoAu,
      usuarioingresoAu: raw.usuarioingresoAu,
      horamodificacionAu: raw.horamodificacionAu,
      usuariomodificacionAu: raw.usuariomodificacionAu,
    };
  }

  static toListResponse(raw: any): PageResponseDTOEmpresaResponseDTO {
    const data = raw.content || raw.data || raw.items || raw;
    const content = Array.isArray(data)
      ? data.map((item: any) => EmpresasApiMapper.toResponse(item))
      : [];

    return {
      content,
      page: raw.page || raw.number || 0,
      size: raw.size || 10,
      totalElements: raw.totalElements || raw.total || content.length,
      totalPages:
        raw.totalPages ||
        Math.ceil((raw.totalElements || content.length) / (raw.size || 10)),
    };
  }
}
