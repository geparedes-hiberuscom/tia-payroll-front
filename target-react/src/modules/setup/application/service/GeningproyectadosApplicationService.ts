import { Geningproyectados, CreateGeningproyectados, UpdateGeningproyectados, GeningproyectadosFilter, GeningproyectadosPageResult } from '../../domain/model/Geningproyectados';
import { GeningproyectadosUseCase } from '../port/input/GeningproyectadosUseCase';
import { GeningproyectadosGatewayPort } from '../port/output/GeningproyectadosGatewayPort';
import { GeningproyectadosNotFoundError, GeningproyectadosValidationError } from '../../domain/exception/GeningproyectadosError';
import { GeningproyectadosApiMapper } from '../../infrastructure/output/adapter/mapper/GeningproyectadosApiMapper';
import { GeningproyectadosViewMapper } from '../../infrastructure/input/adapter/mapper/GeningproyectadosViewMapper';

/**
 * Application Service: genIngProyectados.zul (genIngProyectados)
 *
 * Implementa el Use Case (Input Port).
 * Usa el Gateway Port (Output Port) para comunicación con el backend.
 * Usa los Mappers para transformar entre Domain ↔ DTOs.
 * Contiene la lógica de negocio del frontend: validaciones, transformaciones, orquestación.
 *
 * Controladores fuente: 5
 * Servicios fuente: 0
 *
 * TODO: Copilot — Migra la lógica de negocio desde los controladores/servicios fuente.
 */
export class GeningproyectadosApplicationService implements GeningproyectadosUseCase {

  constructor(private readonly gatewayPort: GeningproyectadosGatewayPort) {}

  // Origen controlador: GET /api/v1/ingresos-proyectados — GET /api/v1/ingresos-proyectados — Listar ingresos proyectados
  // Origen controlador: GET /api/v1/ingresos-proyectados/{id} — GET /api/v1/ingresos-proyectados/{id} — Obtener ingreso proyectado por ID
  // Origen controlador: POST /api/v1/ingresos-proyectados/generar — POST /api/v1/ingresos-proyectados/generar — Generar ingresos proyectados
  // Origen controlador: PUT /api/v1/ingresos-proyectados/{id} — PUT /api/v1/ingresos-proyectados/{id} — Actualizar ingreso proyectado
  // Origen controlador: DELETE /api/v1/ingresos-proyectados/{id} — DELETE /api/v1/ingresos-proyectados/{id} — Eliminar ingreso proyectado

  async findById(id: string): Promise<Geningproyectados> {
    if (!id) {
      throw new GeningproyectadosValidationError('El ID es requerido');
    }
    const response = await this.gatewayPort.findById(id);
    return GeningproyectadosViewMapper.toDomain(response);
  }

  async findAll(filter?: GeningproyectadosFilter): Promise<GeningproyectadosPageResult> {
    const params = filter ? GeningproyectadosViewMapper.toFilterParams(filter) : undefined;
    const response = await this.gatewayPort.findAll(params);
    return GeningproyectadosViewMapper.toPageResult(response);
  }

  async create(model: CreateGeningproyectados): Promise<Geningproyectados> {
    this.validateGeningproyectados(model);
    const request = GeningproyectadosViewMapper.toCreateRequest(model);
    const response = await this.gatewayPort.create(request);
    return GeningproyectadosViewMapper.toDomain(response);
  }

  async update(id: string, model: UpdateGeningproyectados): Promise<Geningproyectados> {
    if (!id) {
      throw new GeningproyectadosValidationError('El ID es requerido para actualizar');
    }
    const request = GeningproyectadosViewMapper.toUpdateRequest(model);
    const response = await this.gatewayPort.update(id, request);
    return GeningproyectadosViewMapper.toDomain(response);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new GeningproyectadosValidationError('El ID es requerido para eliminar');
    }
    await this.gatewayPort.remove(id);
  }

  // ─── Validaciones de negocio ───

  private validateGeningproyectados(model: Partial<Geningproyectados>): void {
    // Ejemplo:
    // if (!model.nombre || model.nombre.trim().length === 0) {
    //   throw new GeningproyectadosValidationError('El nombre es obligatorio', 'nombre');
    // }
  }

  // Ejemplo: procesar lotes, cálculos, orquestación de múltiples llamadas al gateway
}
