// Prestamos module barrel
export type { Prestamos } from './domain/model/Prestamos';
export { PrestamosService } from './application/service/PrestamosService';
export { usePrestamos } from './infrastructure/input/adapter/hooks/usePrestamos';
export { PrestamosPage } from './infrastructure/input/adapter/pages/PrestamosPage';
export { PrestamosList } from './infrastructure/input/adapter/components/PrestamosList';
export { PrestamosForm } from './infrastructure/input/adapter/components/PrestamosForm';
