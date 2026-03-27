// Consultas module barrel
export type { Consultas } from './domain/model/Consultas';
export { ConsultasService } from './application/service/ConsultasService';
export { useConsultas } from './infrastructure/input/adapter/hooks/useConsultas';
export { ConsultasPage } from './infrastructure/input/adapter/pages/ConsultasPage';
export { ConsultasList } from './infrastructure/input/adapter/components/ConsultasList';
export { ConsultasForm } from './infrastructure/input/adapter/components/ConsultasForm';
