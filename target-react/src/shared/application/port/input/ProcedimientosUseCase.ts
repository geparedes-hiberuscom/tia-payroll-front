/**
 * Use Case: Procedimientos
 * Contrato de entrada para operaciones de procedimientos
 */

import {
  Procedimiento,
  ProcedimientosFilter,
  ProcedimientosPageResult,
} from '@shared/domain/model/Procedimientos';

export interface ProcedimientosUseCase {
  listAll(filter?: ProcedimientosFilter): Promise<ProcedimientosPageResult>;
  getById(id: string | number): Promise<Procedimiento>;
   remove(id: string | number): Promise<void>;
}
