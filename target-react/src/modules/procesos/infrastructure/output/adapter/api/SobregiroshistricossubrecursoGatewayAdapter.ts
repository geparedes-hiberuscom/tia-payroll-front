import { SobregiroshistricossubrecursoGatewayPort } from '../../../../application/port/output/SobregiroshistricossubrecursoGatewayPort';
import {
  CreateSobregiroshistricossubrecursoRequest,
  SobregiroshistricossubrecursoFilterParams,
  SobregiroshistricossubrecursoListResponse,
  SobregiroshistricossubrecursoResponse,
  UpdateSobregiroshistricossubrecursoRequest,
} from '../../../input/adapter/dto/SobregiroshistricossubrecursoDto';
import { SobregiroshistricossubrecursoApiMapper } from '../mapper/SobregiroshistricossubrecursoApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/sobregiros-historicos';

export class SobregiroshistricossubrecursoGatewayAdapter implements SobregiroshistricossubrecursoGatewayPort {
  async findById(id: string): Promise<SobregiroshistricossubrecursoResponse> {
    const [ejecucionId, colaboradorId, rubroId] = id.split('/');
    if (!ejecucionId || !colaboradorId || !rubroId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId/rubroId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId + '/' + rubroId);
    return SobregiroshistricossubrecursoApiMapper.toResponse(data);
  }

  async findAll(params?: SobregiroshistricossubrecursoFilterParams): Promise<SobregiroshistricossubrecursoListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return SobregiroshistricossubrecursoApiMapper.toListResponse(data);
  }

  async create(_: CreateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse> {
    throw new Error('No existe endpoint POST para sobregiros historicos');
  }

  async update(_: string, __: UpdateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse> {
    throw new Error('No existe endpoint PUT para sobregiros historicos');
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId, colaboradorId, rubroId] = id.split('/');
    if (!ejecucionId || !colaboradorId || !rubroId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId/rubroId');
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId + '/' + rubroId);
  }
}
