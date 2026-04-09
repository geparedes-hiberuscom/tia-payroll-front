import { httpClient } from './httpClient';
import {
  EmpresaResponseDTO,
  EmpresasFilterParamsDTO,
  PageResponseDTOEmpresaResponseDTO,
} from '../dto/EmpresasDto';
import { EmpresasApiMapper } from '../mapper/EmpresasApiMapper';

const BASE_PATH = '/api/v1/empresas';

export class EmpresasGatewayAdapter {
  async findAll(
    params?: EmpresasFilterParamsDTO,
  ): Promise<PageResponseDTOEmpresaResponseDTO> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return EmpresasApiMapper.toListResponse(data);
  }

  async findById(id: string | number): Promise<EmpresaResponseDTO> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return EmpresasApiMapper.toResponse(data);
  }
}
