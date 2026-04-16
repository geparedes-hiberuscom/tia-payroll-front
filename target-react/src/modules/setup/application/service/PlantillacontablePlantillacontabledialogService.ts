import { PlantillacontablePlantillacontabledialogGatewayPort } from '../port/output/PlantillacontablePlantillacontabledialogGatewayPort';
import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../../infrastructure/input/adapter/dto/PlantillacontablePlantillacontabledialogDto';

/**
 * Application Service: plantillaContable.zul / plantillaContableDialog.zul (plantillaContable_plantillaContableDialog)
 * Implementa la lógica de aplicación invocando el Gateway Port (puerto de salida).
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Implementa lógica de negocio adicional (validaciones, transformaciones).
 */
export class PlantillacontablePlantillacontabledialogService {
  constructor(private readonly gateway: PlantillacontablePlantillacontabledialogGatewayPort) {}

  // Origen controlador: GET /api/v1/plantillas-contables — GET /api/v1/plantillas-contables — Listar plantillas contables
  // Origen controlador: GET /api/v1/plantillas-contables/{id} — GET /api/v1/plantillas-contables/{id} — Obtener plantilla contable por ID
  // Origen controlador: POST /api/v1/plantillas-contables — POST /api/v1/plantillas-contables — Crear plantilla contable
  // Origen controlador: PUT /api/v1/plantillas-contables/{id} — PUT /api/v1/plantillas-contables/{id} — Actualizar plantilla contable
  // Origen controlador: DELETE /api/v1/plantillas-contables/{id} — DELETE /api/v1/plantillas-contables/{id} — Eliminar plantilla contable

  async findById(id: number): Promise<PlantillacontablePlantillacontabledialogResponse> {
    return this.gateway.findById(id);
  }

  async findAll(params?: PlantillacontablePlantillacontabledialogFilterParams): Promise<PlantillacontablePlantillacontabledialogListResponse> {
    return this.gateway.findAll(params);
  }

  async create(request: CreatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    return this.gateway.create(request);
  }

  async update(id: number, request: UpdatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    return this.gateway.update(id, request);
  }

  async remove(id: number): Promise<void> {
    return this.gateway.remove(id);
  }

}
