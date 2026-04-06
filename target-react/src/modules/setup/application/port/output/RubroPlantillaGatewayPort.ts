/**
 * Gateway Port para Rubros de Plantillas Contables
 * Define el contrato de comunicación con el backend
 */

import {
  CreateRubroPlantillaRequest,
  UpdateRubroPlantillaRequest,
  RubroPlantillaResponse,
  RubroPlantillaFilterParams,
  RubroPlantillaListResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/RubroPlantillaDto';

export interface RubroPlantillaGatewayPort {
  findAll(plantillaId: number): Promise<RubroPlantillaListResponse>;
  findById(plantillaId: number, rubroId: string): Promise<RubroPlantillaResponse>;
  create(plantillaId: number, request: CreateRubroPlantillaRequest): Promise<RubroPlantillaResponse>;
  update(plantillaId: number, rubroId: string, request: UpdateRubroPlantillaRequest): Promise<RubroPlantillaResponse>;
  remove(plantillaId: number, rubroId: string): Promise<DeleteResponse>;
}
