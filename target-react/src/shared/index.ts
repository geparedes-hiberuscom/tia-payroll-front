// Shared barrel
export { AppError, NotFoundError, ValidationError, NetworkError } from './domain/exception/AppError';
export type { ApiResponse, PaginatedResponse } from './domain/model/ApiResponse';
export type { ErrorResponse } from './domain/model/ErrorResponse';
export type { DominioItem, DominioCatalogKey } from './domain/model/Dominios';
export {
  DOMINIOS,
  getDominioList,
  getDominioListByIdForNumber,
  getDominioListByIdForString,
  getDominioItemById,
  getDominioItemByDomId,
} from './domain/model/Dominios';
export { httpClient } from './infrastructure/output/adapter/api/httpClient';
export { DimensionesGatewayAdapter } from './infrastructure/output/adapter/api/DimensionesGatewayAdapter';
export { EmpresasGatewayAdapter } from './infrastructure/output/adapter/api/EmpresasGatewayAdapter';
export { ProcedimientosGatewayAdapter } from './infrastructure/output/adapter/api/ProcedimientosGatewayAdapter';
export { DimensionesApiMapper } from './infrastructure/output/adapter/mapper/DimensionesApiMapper';
export { EmpresasApiMapper } from './infrastructure/output/adapter/mapper/EmpresasApiMapper';
export { ProcedimientosApiMapper } from './infrastructure/output/adapter/mapper/ProcedimientosApiMapper';
export type {
  DimensionesResponseDTO,
  DimensioneslResponseDTO,
  DimensionResponseDTO,
  DimensionesFilterParamsDTO,
} from './infrastructure/output/adapter/dto/DimensionesDto';
export type {
  EmpresaResponseDTO,
  EmpresasFilterParamsDTO,
  PageResponseDTOEmpresaResponseDTO,
  EmpresasListResponseDTO,
} from './infrastructure/output/adapter/dto/EmpresasDto';
export type {
  CreateProcedimientoRequestDTO,
  UpdateProcedimientoRequestDTO,
  ProcedimientosFilterParamsDTO,
  ProcedimientoResponseDTO,
  ProcedimientosListResponseDTO,
} from './infrastructure/output/adapter/dto/ProcedimientosDto';
export { useErrorHandler } from './infrastructure/input/adapter/hooks/useErrorHandler';
export { Form } from './infrastructure/input/adapter/components/Form';
export { Loading } from './infrastructure/input/adapter/components/Loading';
export { ErrorBanner } from './infrastructure/input/adapter/components/ErrorBanner';
export * from './infrastructure/input/adapter/components';
// Dimensiones & Empresas (Application Layer)
export { DimensionesApplicationService } from './application/service/DimensionesApplicationService';
export { EmpresasApplicationService } from './application/service/EmpresasApplicationService';
export { ProcedimientosApplicationService } from './application/service/ProcedimientosApplicationService';
export type { DimensionesUseCase } from './application/port/input/DimensionesUseCase';
export type { EmpresasUseCase } from './application/port/input/EmpresasUseCase';
export type { ProcedimientosUseCase } from './application/port/input/ProcedimientosUseCase';
// Dimensiones & Empresas (Domain Layer)
export type {
  DimensionType,
  DimensionItem,
  DimensionesFilter,
  DimensionesPageResult,
} from './domain/model/Dimensiones';
export type {
  Empresa,
  EmpresasFilter,
  EmpresasPageResult,
} from './domain/model/Empresas';
export type {
  Procedimiento,
  ProcedimientosFilter,
  ProcedimientosPageResult,
} from './domain/model/Procedimientos';
export {
  DimensionesError,
  DimensionesNotFoundError,
  DimensionesValidationError,
} from './domain/exception/DimensionesError';
export {
  EmpresasError,
  EmpresasNotFoundError,
  EmpresasValidationError,
} from './domain/exception/EmpresasError';
export {
  ProcedimientosError,
  ProcedimientosNotFoundError,
  ProcedimientosValidationError,
} from './domain/exception/ProcedimientosError';
// Dimensiones & Empresas (Hooks Layer)
export { useDimensiones } from './infrastructure/input/adapter/hooks/useDimensiones';
export { useEmpresas } from './infrastructure/input/adapter/hooks/useEmpresas';
export { useProcedimientos } from './infrastructure/input/adapter/hooks/useProcedimientos';
