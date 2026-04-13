// Shared barrel
export { AppError, NotFoundError, ValidationError, NetworkError } from './domain/exception/AppError';
export type { ApiResponse, PaginatedResponse } from './domain/model/ApiResponse';
export type { ErrorResponse } from './domain/model/ErrorResponse';
export { httpClient } from './infrastructure/output/adapter/api/httpClient';
export { DimensionesGatewayAdapter } from './infrastructure/output/adapter/api/DimensionesGatewayAdapter';
export { EmpresasGatewayAdapter } from './infrastructure/output/adapter/api/EmpresasGatewayAdapter';
export { DimensionesApiMapper } from './infrastructure/output/adapter/mapper/DimensionesApiMapper';
export { EmpresasApiMapper } from './infrastructure/output/adapter/mapper/EmpresasApiMapper';
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
export { useErrorHandler } from './infrastructure/input/adapter/hooks/useErrorHandler';
export { Form } from './infrastructure/input/adapter/components/Form';
export { Table } from './infrastructure/input/adapter/components/Table';
export { Loading } from './infrastructure/input/adapter/components/Loading';
export { ErrorBanner } from './infrastructure/input/adapter/components/ErrorBanner';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './infrastructure/input/adapter/components/Tabs';
// Dimensiones & Empresas (Application Layer)
export { DimensionesApplicationService } from './application/service/DimensionesApplicationService';
export { EmpresasApplicationService } from './application/service/EmpresasApplicationService';
export type { DimensionesUseCase } from './application/port/input/DimensionesUseCase';
export type { EmpresasUseCase } from './application/port/input/EmpresasUseCase';
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
// Dimensiones & Empresas (Hooks Layer)
export { useDimensiones } from './infrastructure/input/adapter/hooks/useDimensiones';
export { useEmpresas } from './infrastructure/input/adapter/hooks/useEmpresas';
