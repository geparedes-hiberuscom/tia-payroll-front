import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../../infrastructure/input/adapter/dto/PlantillacontablePlantillacontabledialogDto';

/**
 * Gateway Port (Output Port): plantillaContable.zul / plantillaContableDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface PlantillacontablePlantillacontabledialogGatewayPort {
  findById(id: number): Promise<PlantillacontablePlantillacontabledialogResponse>;
  findAll(params?: PlantillacontablePlantillacontabledialogFilterParams): Promise<PlantillacontablePlantillacontabledialogListResponse>;
  create(request: CreatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse>;
  update(id: number, request: UpdatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse>;
  remove(id: number): Promise<void>;
}
