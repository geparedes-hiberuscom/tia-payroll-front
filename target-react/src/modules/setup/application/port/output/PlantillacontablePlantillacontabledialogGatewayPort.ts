import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../../infrastructure/input/adapter/dto/PlantillacontablePlantillacontabledialogDto';

/**
 * Gateway Port (Output Port): plantillaContable.zul / plantillaContableDialog.zul
 * Define el contrato de comunicación con la API REST del backend.
 *
 * Endpoints relacionados:
 */
export interface PlantillacontablePlantillacontabledialogGatewayPort {
  findById(id: string): Promise<PlantillacontablePlantillacontabledialogResponse>;
  findAll(params?: PlantillacontablePlantillacontabledialogFilterParams): Promise<PlantillacontablePlantillacontabledialogListResponse>;
  create(request: CreatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse>;
  update(id: string, request: UpdatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse>;
  remove(id: string): Promise<void>;
  // TODO: Agregar métodos adicionales según los endpoints de la API
}
