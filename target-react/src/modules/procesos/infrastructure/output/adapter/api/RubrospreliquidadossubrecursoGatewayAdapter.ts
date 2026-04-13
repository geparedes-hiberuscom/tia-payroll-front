import { RubrospreliquidadossubrecursoGatewayPort } from '../../../../application/port/output/RubrospreliquidadossubrecursoGatewayPort';
import {
  CreateRubrospreliquidadossubrecursoRequest,
  RubrospreliquidadossubrecursoFilterParams,
  RubrospreliquidadossubrecursoListResponse,
  RubrospreliquidadossubrecursoResponse,
  UpdateRubrospreliquidadossubrecursoRequest,
} from '../../../input/adapter/dto/RubrospreliquidadossubrecursoDto';
import { RubrospreliquidadossubrecursoApiMapper } from '../mapper/RubrospreliquidadossubrecursoApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/rubros-preliquidados';

export class RubrospreliquidadossubrecursoGatewayAdapter implements RubrospreliquidadossubrecursoGatewayPort {
  async findById(id: string): Promise<RubrospreliquidadossubrecursoResponse> {
    const [ejecucionId, colaboradorId, rubroId] = id.split('/');
    if (!ejecucionId || !colaboradorId || !rubroId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId/rubroId');
    const { data } = await httpClient.get(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId + '/' + rubroId);
    return RubrospreliquidadossubrecursoApiMapper.toResponse(data);
  }

  async findAll(params?: RubrospreliquidadossubrecursoFilterParams): Promise<RubrospreliquidadossubrecursoListResponse> {
    const { data } = await httpClient.get(BASE_PATH, { params });
    return RubrospreliquidadossubrecursoApiMapper.toListResponse(data);
  }

  async create(_: CreateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse> {
    throw new Error('No existe endpoint POST para rubros preliquidados');
  }

  async update(id: string, request: UpdateRubrospreliquidadossubrecursoRequest): Promise<RubrospreliquidadossubrecursoResponse> {
    const [ejecucionId, colaboradorId, rubroId] = id.split('/');
    if (!ejecucionId || !colaboradorId || !rubroId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId/rubroId');
    const { data } = await httpClient.put(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId + '/' + rubroId, RubrospreliquidadossubrecursoApiMapper.toUpdatePayload(request));
    return RubrospreliquidadossubrecursoApiMapper.toResponse(data);
  }

  async remove(id: string): Promise<void> {
    const [ejecucionId, colaboradorId, rubroId] = id.split('/');
    if (!ejecucionId || !colaboradorId || !rubroId) throw new Error('id compuesto invalido: se esperaba ejecucionId/colaboradorId/rubroId');
    await httpClient.delete(BASE_PATH + '/' + ejecucionId + '/' + colaboradorId + '/' + rubroId);
  }
}
