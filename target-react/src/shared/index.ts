// Shared barrel
export { AppError, NotFoundError, ValidationError, NetworkError } from './domain/exception/AppError';
export type { ApiResponse, PaginatedResponse } from './domain/model/ApiResponse';
export type { ErrorResponse } from './domain/model/ErrorResponse';
export { httpClient } from './infrastructure/output/adapter/api/httpClient';
export { useErrorHandler } from './infrastructure/input/adapter/hooks/useErrorHandler';
export { Form } from './infrastructure/input/adapter/components/Form';
export { Table } from './infrastructure/input/adapter/components/Table';
export { Loading } from './infrastructure/input/adapter/components/Loading';
export { ErrorBanner } from './infrastructure/input/adapter/components/ErrorBanner';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './infrastructure/input/adapter/components/Tabs';
