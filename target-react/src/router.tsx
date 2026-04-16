import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ROUTES } from './routes';
import { setupRoutes } from './modules/setup/setupRoutes';
import { rubrosRoutes } from './modules/rubros/rubrosRoutes';
import { procesosRoutes } from './modules/procesos/procesosRoutes';

const SetupIndexPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.SetupIndexPage })));
const ConsultasPage = lazy(() => import('@modules/consultas').then((m) => ({ default: m.ConsultasPage })));
const PagoPage = lazy(() => import('@modules/pago').then((m) => ({ default: m.PagoPage })));
const PrestamosPage = lazy(() => import('@modules/prestamos').then((m) => ({ default: m.PrestamosPage })));
const CostosPage = lazy(() => import('@modules/costos').then((m) => ({ default: m.CostosPage })));
const BeneficiosPage = lazy(() => import('@modules/beneficios').then((m) => ({ default: m.BeneficiosPage })));
const IntegracionesPage = lazy(() => import('@modules/integraciones').then((m) => ({ default: m.IntegracionesPage })));
const ReportesPage = lazy(() => import('@modules/reportes').then((m) => ({ default: m.ReportesPage })));
const UIKitDemoPage = lazy(() =>
  import('@shared/infrastructure/input/adapter/pages/UIKitDemoPage').then((m) => ({ default: m.UIKitDemoPage })),
);

const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<Loading message="Cargando modulo..." />}>
    {element}
  </Suspense>
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.SETUP} replace />} />

      <Route path={ROUTES.SETUP} element={withSuspense(<SetupIndexPage />)} />
      <Route path={ROUTES.CONSULTAS} element={withSuspense(<ConsultasPage />)} />
      <Route path={ROUTES.PAGO} element={withSuspense(<PagoPage />)} />
      <Route path={ROUTES.PRESTAMOS} element={withSuspense(<PrestamosPage />)} />
      <Route path={ROUTES.COSTOS} element={withSuspense(<CostosPage />)} />
      <Route path={ROUTES.BENEFICIOS} element={withSuspense(<BeneficiosPage />)} />
      <Route path={ROUTES.INTEGRACIONES} element={withSuspense(<IntegracionesPage />)} />
      <Route path={ROUTES.REPORTES} element={withSuspense(<ReportesPage />)} />
      <Route path={ROUTES.UIKIT_DEMO} element={withSuspense(<UIKitDemoPage />)} />

      {setupRoutes}
      {rubrosRoutes}
      {procesosRoutes}

      <Route path="*" element={<div className="container"><h1>404</h1><p>Pagina no encontrada</p></div>} />
    </Routes>
  );
};
