import { httpClient } from './httpClient';
import {
  CreateProcedimientoRequestDTO,
  ProcedimientoResponseDTO,
  ProcedimientosFilterParamsDTO,
  ProcedimientosListResponseDTO,
  UpdateProcedimientoRequestDTO,
} from '../dto/ProcedimientosDto';
import { ProcedimientosApiMapper } from '../mapper/ProcedimientosApiMapper';

const BASE_PATH = '/api/v1/procedimientos';

export class ProcedimientosGatewayAdapter {
  async findAll(
    params?: ProcedimientosFilterParamsDTO,
  ): Promise<ProcedimientosListResponseDTO> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return ProcedimientosApiMapper.toListResponse(data);
  }

  async findById(id: string | number): Promise<ProcedimientoResponseDTO> {
    const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
    return ProcedimientosApiMapper.toResponse(data);
  }

  async create(
    request: CreateProcedimientoRequestDTO,
  ): Promise<ProcedimientoResponseDTO> {
    const payload = ProcedimientosApiMapper.toCreatePayload(request);
    const { data } = await httpClient.post(BASE_PATH, payload);
    return ProcedimientosApiMapper.toResponse(data);
  }

  async update(
    id: string | number,
    request: UpdateProcedimientoRequestDTO,
  ): Promise<ProcedimientoResponseDTO> {
    const payload = ProcedimientosApiMapper.toUpdatePayload(request);
    const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
    return ProcedimientosApiMapper.toResponse(data);
  }

  async remove(id: string | number): Promise<void> {
    await httpClient.delete(`${BASE_PATH}/${id}`);
  }
}
