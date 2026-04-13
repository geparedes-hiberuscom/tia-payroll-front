import {
  Clasesrubro,
  ClasesrubroFilter,
  ClasesrubroPageResult,
} from '@modules/rubros/domain/model/Clasesrubro';

export interface ClasesrubroUseCase {
  findAll(filter?: ClasesrubroFilter): Promise<ClasesrubroPageResult>;
  findById(claseId: string): Promise<Clasesrubro>;
}
