/**
 * View Mapper: Empresas
 * Transforma DTOs de API → modelos de dominio
 */

import { Empresa, EmpresasPageResult } from '@shared/domain/model/Empresas';
import {
  EmpresaResponseDTO,
  PageResponseDTOEmpresaResponseDTO,
} from '@shared/infrastructure/output/adapter/dto/EmpresasDto';

export class EmpresasViewMapper {
  static toItem(dto: EmpresaResponseDTO): Empresa {
    return {
      iidempresa: dto.iidempresa,
      cliId: dto.cliId,
      vempresanl: dto.vempresanl,
      vempresanc: dto.vempresanc,
      vruc: dto.vruc,
      vidacreditacion: dto.vidacreditacion,
      vidempresacl: dto.vidempresacl,
      vruccontador: dto.vruccontador,
      vimagenempresa: dto.vimagenempresa,
      horaingresoAu: dto.horaingresoAu,
      usuarioingresoAu: dto.usuarioingresoAu,
      horamodificacionAu: dto.horamodificacionAu,
      usuariomodificacionAu: dto.usuariomodificacionAu,
    };
  }

  static toPageResult(response: PageResponseDTOEmpresaResponseDTO): EmpresasPageResult {
    return {
      items: response.content.map((dto) => EmpresasViewMapper.toItem(dto)),
      page: response.page,
      size: response.size,
      totalElements: response.totalElements,
      totalPages: response.totalPages,
    };
  }
}
