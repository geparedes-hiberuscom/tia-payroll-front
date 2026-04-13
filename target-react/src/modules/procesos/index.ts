// Procesos module barrel
export type { Procesos } from './domain/model/Procesos';
export { ProcesosService } from './application/service/ProcesosService';
export { useProcesos } from './infrastructure/input/adapter/hooks/useProcesos';
export { ProcesosPage } from './infrastructure/input/adapter/pages/ProcesosPage';
export { ProcesosList } from './infrastructure/input/adapter/components/ProcesosList';
export { ProcesosForm } from './infrastructure/input/adapter/components/ProcesosForm';
export * from './infrastructure/input/adapter/config/ProcesosModuleConfig';
