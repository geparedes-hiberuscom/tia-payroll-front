import React from 'react';
import { AppRouter } from './router';

// import { SetupPage } from '@modules/setup/infrastructure/input/adapter/pages/SetupPage';
// import { RubrosPage } from '@modules/rubros/infrastructure/input/adapter/pages/RubrosPage';
// import { ProcesosPage } from '@modules/procesos/infrastructure/input/adapter/pages/ProcesosPage';
// import { ConsultasPage } from '@modules/consultas/infrastructure/input/adapter/pages/ConsultasPage';
// import { PagoPage } from '@modules/pago/infrastructure/input/adapter/pages/PagoPage';
// import { PrestamosPage } from '@modules/prestamos/infrastructure/input/adapter/pages/PrestamosPage';
// import { CostosPage } from '@modules/costos/infrastructure/input/adapter/pages/CostosPage';
// import { BeneficiosPage } from '@modules/beneficios/infrastructure/input/adapter/pages/BeneficiosPage';
// import { IntegracionesPage } from '@modules/integraciones/infrastructure/input/adapter/pages/IntegracionesPage';
// import { ReportesPage } from '@modules/reportes/infrastructure/input/adapter/pages/ReportesPage';

export const App: React.FC = () => {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};
