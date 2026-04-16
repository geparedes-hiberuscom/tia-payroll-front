import { PlantillacontablePlantillacontabledialogGatewayPort } from '../../../../application/port/output/PlantillacontablePlantillacontabledialogGatewayPort';
import { PlantillacontablePlantillacontabledialogResponse, PlantillacontablePlantillacontabledialogListResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../../../input/adapter/dto/PlantillacontablePlantillacontabledialogDto';
import { PlantillacontablePlantillacontabledialogApiMapper } from '../mapper/PlantillacontablePlantillacontabledialogApiMapper';
import { httpClient } from '@shared/infrastructure/output/adapter/api/httpClient';

const BASE_PATH = '/api/v1/plantillas-contables';

/**
 * Error extendido que captura el mensaje del backend
 */
class BackendErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BackendErrorException';
  }
}

/**
 * Extrae el mensaje de error del backend desde la respuesta HTTP
 */
const extractBackendErrorMessage = (error: any): string => {
  // Si el error tiene respuesta del backend con mensaje
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  // Si es un error de validación con detalles
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  // Si hay un mensaje de error general
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  // Si es solo el mensaje HTTP
  if (error.response?.statusText) {
    return `${error.response.status} - ${error.response.statusText}`;
  }
  // Fallback al mensaje estándar del error
  return error.message || 'Error desconocido';
};

/**
 * API Gateway Adapter: plantillaContable.zul / plantillaContableDialog.zul
 * Implementa el Gateway Port usando Axios (httpClient).
 * Conecta el frontend con los endpoints REST del backend.
 * Extrae y propaga mensajes de error específicos del backend.
 */
export class PlantillacontablePlantillacontabledialogGatewayAdapter implements PlantillacontablePlantillacontabledialogGatewayPort {

  async findById(id: number): Promise<PlantillacontablePlantillacontabledialogResponse> {
    try {
      const { data } = await httpClient.get(`${BASE_PATH}/${id}`);
      return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
    } catch (error) {
      throw new BackendErrorException(extractBackendErrorMessage(error));
    }
  }

  async findAll(params?: PlantillacontablePlantillacontabledialogFilterParams): Promise<PlantillacontablePlantillacontabledialogListResponse> {
    try {
      const { data } = await httpClient.get(BASE_PATH, { params });
      return PlantillacontablePlantillacontabledialogApiMapper.toListResponse(data);
    } catch (error) {
      throw new BackendErrorException(extractBackendErrorMessage(error));
    }
  }

  async create(request: CreatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    try {
      const payload = PlantillacontablePlantillacontabledialogApiMapper.toCreatePayload(request);
      const { data } = await httpClient.post(BASE_PATH, payload);
      return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
    } catch (error) {
      throw new BackendErrorException(extractBackendErrorMessage(error));
    }
  }

  async update(id: number, request: UpdatePlantillacontablePlantillacontabledialogRequest): Promise<PlantillacontablePlantillacontabledialogResponse> {
    try {
      const payload = PlantillacontablePlantillacontabledialogApiMapper.toUpdatePayload(request);
      const { data } = await httpClient.put(`${BASE_PATH}/${id}`, payload);
      return PlantillacontablePlantillacontabledialogApiMapper.toResponse(data);
    } catch (error) {
      throw new BackendErrorException(extractBackendErrorMessage(error));
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await httpClient.delete(`${BASE_PATH}/${id}`);
    } catch (error) {
      throw new BackendErrorException(extractBackendErrorMessage(error));
    }
  }
}
