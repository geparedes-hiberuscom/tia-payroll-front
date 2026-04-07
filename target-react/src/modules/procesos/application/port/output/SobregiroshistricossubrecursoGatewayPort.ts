import {
  CreateSobregiroshistricossubrecursoRequest,
  SobregiroshistricossubrecursoFilterParams,
  SobregiroshistricossubrecursoListResponse,
  SobregiroshistricossubrecursoResponse,
  UpdateSobregiroshistricossubrecursoRequest,
} from '../../../infrastructure/input/adapter/dto/SobregiroshistricossubrecursoDto';

export interface SobregiroshistricossubrecursoGatewayPort {
  findById(id: string): Promise<SobregiroshistricossubrecursoResponse>;
  findAll(params?: SobregiroshistricossubrecursoFilterParams): Promise<SobregiroshistricossubrecursoListResponse>;
  create(request: CreateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse>;
  update(id: string, request: UpdateSobregiroshistricossubrecursoRequest): Promise<SobregiroshistricossubrecursoResponse>;
  remove(id: string): Promise<void>;
}
