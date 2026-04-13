import { httpClient } from './httpClient';
import {
  DimensionesResponseDTO,
  DimensioneslResponseDTO,
} from '../dto/DimensionesDto';
import { DimensionesApiMapper } from '../mapper/DimensionesApiMapper';

const BASE_PATH = '/api/v1/dimensiones';

export class DimensionesGatewayAdapter {
  async listTypes(): Promise<DimensionesResponseDTO[]> {
    const { data } = await httpClient.get(BASE_PATH);
    return DimensionesApiMapper.toDimensionTypeList(data);
  }

  async listItems(dimensionCode: string): Promise<DimensioneslResponseDTO[]> {
    const { data } = await httpClient.get(`${BASE_PATH}/${dimensionCode}/items`);
    return DimensionesApiMapper.toDimensionItemList(data);
  }

  async getItemById(
    dimensionCode: string,
    id: string | number,
  ): Promise<DimensioneslResponseDTO> {
    const { data } = await httpClient.get(`${BASE_PATH}/${dimensionCode}/items/${id}`);
    return DimensionesApiMapper.toDimensionItemResponse(data);
  }
}
