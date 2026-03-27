// Beneficios module barrel
export type { Beneficios } from './domain/model/Beneficios';
export { BeneficiosService } from './application/service/BeneficiosService';
export { useBeneficios } from './infrastructure/input/adapter/hooks/useBeneficios';
export { BeneficiosPage } from './infrastructure/input/adapter/pages/BeneficiosPage';
export { BeneficiosList } from './infrastructure/input/adapter/components/BeneficiosList';
export { BeneficiosForm } from './infrastructure/input/adapter/components/BeneficiosForm';
