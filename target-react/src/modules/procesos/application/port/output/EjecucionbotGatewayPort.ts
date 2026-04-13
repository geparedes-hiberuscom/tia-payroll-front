import {
  CreateEjecucionbotRequest,
  EjecucionbotFilterParams,
  EjecucionbotListResponse,
  EjecucionbotResponse,
  UpdateEjecucionbotRequest,
} from '../../../infrastructure/input/adapter/dto/EjecucionbotDto';

export interface EjecucionbotGatewayPort {
  findById(id: string): Promise<EjecucionbotResponse>;
  findAll(params?: EjecucionbotFilterParams): Promise<EjecucionbotListResponse>;
  create(request: CreateEjecucionbotRequest): Promise<EjecucionbotResponse>;
  update(id: string, request: UpdateEjecucionbotRequest): Promise<EjecucionbotResponse>;
  remove(id: string): Promise<void>;
}
