/**
 * Gateway Port para Plantillas Contables
 * Define el contrato de comunicación con el backend
 */

import {
  CreatePlantillaContableRequest,
  UpdatePlantillaContableRequest,
  PlantillaContableResponse,
  PlantillaContableFilterParams,
  PlantillaContablePageResponse,
  DeleteResponse,
} from '../../infrastructure/input/adapter/dto/PlantillaContableDto';

export interface PlantillaContableGatewayPort {
  findAll(filters?: PlantillaContableFilterParams): Promise<PlantillaContablePageResponse>;
  findById(id: number): Promise<PlantillaContableResponse>;
  create(request: CreatePlantillaContableRequest): Promise<PlantillaContableResponse>;
  update(id: number, request: UpdatePlantillaContableRequest): Promise<PlantillaContableResponse>;
  remove(id: number): Promise<DeleteResponse>;
}
