import { Setup } from '../../../../domain/model/Setup';
import { SetupRequest, SetupResponse } from '../dto/SetupDto';

export class SetupViewMapper {
  static toRequest(model: Omit<Setup, 'id'>): SetupRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: SetupResponse): Setup {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
