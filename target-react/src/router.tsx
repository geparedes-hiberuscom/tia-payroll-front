import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SetupPage } from '@modules/setup/infrastructure/input/adapter/pages/SetupPage';
import { RubrosPage } from '@modules/rubros/infrastructure/input/adapter/pages/RubrosPage';
import { ProcesosPage } from '@modules/procesos/infrastructure/input/adapter/pages/ProcesosPage';
import { ConsultasPage } from '@modules/consultas/infrastructure/input/adapter/pages/ConsultasPage';
import { PagoPage } from '@modules/pago/infrastructure/input/adapter/pages/PagoPage';
import { PrestamosPage } from '@modules/prestamos/infrastructure/input/adapter/pages/PrestamosPage';
import { CostosPage } from '@modules/costos/infrastructure/input/adapter/pages/CostosPage';
import { BeneficiosPage } from '@modules/beneficios/infrastructure/input/adapter/pages/BeneficiosPage';
import { IntegracionesPage } from '@modules/integraciones/infrastructure/input/adapter/pages/IntegracionesPage';
import { ReportesPage } from '@modules/reportes/infrastructure/input/adapter/pages/ReportesPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Inicio</div>} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/rubros" element={<RubrosPage />} />
        <Route path="/procesos" element={<ProcesosPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/pago" element={<PagoPage />} />
        <Route path="/prestamos" element={<PrestamosPage />} />
        <Route path="/costos" element={<CostosPage />} />
        <Route path="/beneficios" element={<BeneficiosPage />} />
        <Route path="/integraciones" element={<IntegracionesPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
    </Routes>
  );
};
