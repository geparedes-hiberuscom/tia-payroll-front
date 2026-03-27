import { Pago } from '../../../../domain/model/Pago';
import { PagoRequest, PagoResponse } from '../dto/PagoDto';

export class PagoViewMapper {
  static toRequest(model: Omit<Pago, 'id'>): PagoRequest {
    return {
      nombre: model.nombre,
    };
  }

  static fromResponse(response: PagoResponse): Pago {
    return {
      id: response.id,
      nombre: response.nombre,
    };
  }
}
