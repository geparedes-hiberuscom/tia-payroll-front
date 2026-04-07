import { InstanciasprocesosInstanciasprocesosdialogGatewayPort } from '../../../../application/port/output/InstanciasprocesosInstanciasprocesosdialogGatewayPort';
import {
  CreateInstanciasprocesosInstanciasprocesosdialogRequest,
  InstanciasprocesosInstanciasprocesosdialogFilterParams,
  InstanciasprocesosInstanciasprocesosdialogListResponse,
  InstanciasprocesosInstanciasprocesosdialogResponse,
  UpdateInstanciasprocesosInstanciasprocesosdialogRequest,
} from '../../../input/adapter/dto/InstanciasprocesosInstanciasprocesosdialogDto';
import { InstanciasprocesosInstanciasprocesosdialogApiMapper } from '../mapper/InstanciasprocesosInstanciasprocesosdialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/instancias-procesos';

export class InstanciasprocesosInstanciasprocesosdialogGatewayAdapter implements InstanciasprocesosInstanciasprocesosdialogGatewayPort {
  async findById(id: string): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    const { data } = await httpClient.get(BASE_PATH + '/' + id);
    return InstanciasprocesosInstanciasprocesosdialogApiMapper.toResponse(data);
  }

  async findAll(params?: InstanciasprocesosInstanciasprocesosdialogFilterParams): Promise<InstanciasprocesosInstanciasprocesosdialogListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return InstanciasprocesosInstanciasprocesosdialogApiMapper.toListResponse(data);
  }

  async create(request: CreateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    const { data } = await httpClient.post(BASE_PATH, InstanciasprocesosInstanciasprocesosdialogApiMapper.toCreatePayload(request));
    return InstanciasprocesosInstanciasprocesosdialogApiMapper.toResponse(data);
  }

  async update(id: string, request: UpdateInstanciasprocesosInstanciasprocesosdialogRequest): Promise<InstanciasprocesosInstanciasprocesosdialogResponse> {
    const { data } = await httpClient.put(BASE_PATH + '/' + id, InstanciasprocesosInstanciasprocesosdialogApiMapper.toUpdatePayload(request));
    return InstanciasprocesosInstanciasprocesosdialogApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(BASE_PATH + '/' + id);
  }
}
