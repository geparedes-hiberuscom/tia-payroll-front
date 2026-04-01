import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';

// ─── Lazy imports — módulos principales ───
const SetupPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages/SetupPage').then(m => ({ default: m.SetupPage })));
const RubrosIndexPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosIndexPage').then(m => ({ default: m.RubrosIndexPage })));
const ProcesosPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages/ProcesosPage').then(m => ({ default: m.ProcesosPage })));
const ConsultasPage = lazy(() => import('@modules/consultas/infrastructure/input/adapter/pages/ConsultasPage').then(m => ({ default: m.ConsultasPage })));
const PagoPage = lazy(() => import('@modules/pago/infrastructure/input/adapter/pages/PagoPage').then(m => ({ default: m.PagoPage })));
const PrestamosPage = lazy(() => import('@modules/prestamos/infrastructure/input/adapter/pages/PrestamosPage').then(m => ({ default: m.PrestamosPage })));
const CostosPage = lazy(() => import('@modules/costos/infrastructure/input/adapter/pages/CostosPage').then(m => ({ default: m.CostosPage })));
const BeneficiosPage = lazy(() => import('@modules/beneficios/infrastructure/input/adapter/pages/BeneficiosPage').then(m => ({ default: m.BeneficiosPage })));
const IntegracionesPage = lazy(() => import('@modules/integraciones/infrastructure/input/adapter/pages/IntegracionesPage').then(m => ({ default: m.IntegracionesPage })));
const ReportesPage = lazy(() => import('@modules/reportes/infrastructure/input/adapter/pages/ReportesPage').then(m => ({ default: m.ReportesPage })));

// ─── Rubros vertical slices ───
const RubrosRubrosdialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosRubrosdialogPage').then(m => ({ default: m.RubrosRubrosdialogPage })));
const RubrosRubrosdialogCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosRubrosdialogCreatePage').then(m => ({ default: m.RubrosRubrosdialogCreatePage })));
const RubrosRubrosdialogDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosRubrosdialogDetailPage').then(m => ({ default: m.RubrosRubrosdialogDetailPage })));

const RubrosxprocesodialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosxprocesodialogPage').then(m => ({ default: m.RubrosxprocesodialogPage })));
const RubrosxprocesodialogCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosxprocesodialogCreatePage').then(m => ({ default: m.RubrosxprocesodialogCreatePage })));
const RubrosxprocesodialogDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosxprocesodialogDetailPage').then(m => ({ default: m.RubrosxprocesodialogDetailPage })));

const RubrosidomainPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidomainRubrosidolistRubrosidodetailPage').then(m => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailPage })));
const RubrosidomainCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidomainRubrosidolistRubrosidodetailCreatePage').then(m => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailCreatePage })));
const RubrosidomainDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidomainRubrosidolistRubrosidodetailDetailPage').then(m => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailDetailPage })));

const RubrosidocargaxprocesoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidocargaxprocesoPage').then(m => ({ default: m.RubrosidocargaxprocesoPage })));
const RubrosidocargaxprocesoCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidocargaxprocesoCreatePage').then(m => ({ default: m.RubrosidocargaxprocesoCreatePage })));
const RubrosidocargaxprocesoDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/RubrosidocargaxprocesoDetailPage').then(m => ({ default: m.RubrosidocargaxprocesoDetailPage })));

const CargarubrosidoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/CargarubrosidoPage').then(m => ({ default: m.CargarubrosidoPage })));
const CargarubrosidoCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/CargarubrosidoCreatePage').then(m => ({ default: m.CargarubrosidoCreatePage })));
const CargarubrosidoDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/CargarubrosidoDetailPage').then(m => ({ default: m.CargarubrosidoDetailPage })));

const ConsultarubrosidolistPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/ConsultarubrosidolistPage').then(m => ({ default: m.ConsultarubrosidolistPage })));
const ConsultarubrosidolistCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/ConsultarubrosidolistCreatePage').then(m => ({ default: m.ConsultarubrosidolistCreatePage })));
const ConsultarubrosidolistDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages/ConsultarubrosidolistDetailPage').then(m => ({ default: m.ConsultarubrosidolistDetailPage })));

const wrap = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading message="Cargando..." />}>
    <Component />
  </Suspense>
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/setup" replace />} />

      {/* ── Setup ── */}
      <Route path="/setup" element={wrap(SetupPage)} />

      {/* ── Rubros index ── */}
      <Route path="/rubros" element={wrap(RubrosIndexPage)} />

      {/* ── Rubros / RubrosDialog ── */}
      <Route path="/rubros-rubrosdialog" element={wrap(RubrosRubrosdialogPage)} />
      <Route path="/rubros-rubrosdialog/create" element={wrap(RubrosRubrosdialogCreatePage)} />
      <Route path="/rubros-rubrosdialog/:id" element={wrap(RubrosRubrosdialogDetailPage)} />
      <Route path="/rubros-rubrosdialog/editar/:id" element={wrap(RubrosRubrosdialogCreatePage)} />

      {/* ── Rubros x Proceso ── */}
      <Route path="/rubrosxprocesodialog" element={wrap(RubrosxprocesodialogPage)} />
      <Route path="/rubrosxprocesodialog/create" element={wrap(RubrosxprocesodialogCreatePage)} />
      <Route path="/rubrosxprocesodialog/:id" element={wrap(RubrosxprocesodialogDetailPage)} />
      <Route path="/rubrosxprocesodialog/editar/:id" element={wrap(RubrosxprocesodialogCreatePage)} />

      {/* ── Rubros IDO Main/List/Detail ── */}
      <Route path="/rubrosidomain-rubrosidolist-rubrosidodetail" element={wrap(RubrosidomainPage)} />
      <Route path="/rubrosidomain-rubrosidolist-rubrosidodetail/create" element={wrap(RubrosidomainCreatePage)} />
      <Route path="/rubrosidomain-rubrosidolist-rubrosidodetail/:id" element={wrap(RubrosidomainDetailPage)} />
      <Route path="/rubrosidomain-rubrosidolist-rubrosidodetail/editar/:id" element={wrap(RubrosidomainCreatePage)} />

      {/* ── Rubros IDO Carga x Proceso ── */}
      <Route path="/rubrosidocargaxproceso" element={wrap(RubrosidocargaxprocesoPage)} />
      <Route path="/rubrosidocargaxproceso/create" element={wrap(RubrosidocargaxprocesoCreatePage)} />
      <Route path="/rubrosidocargaxproceso/:id" element={wrap(RubrosidocargaxprocesoDetailPage)} />
      <Route path="/rubrosidocargaxproceso/editar/:id" element={wrap(RubrosidocargaxprocesoCreatePage)} />

      {/* ── Carga Rubros IDO ── */}
      <Route path="/cargarubrosido" element={wrap(CargarubrosidoPage)} />
      <Route path="/cargarubrosido/create" element={wrap(CargarubrosidoCreatePage)} />
      <Route path="/cargarubrosido/:id" element={wrap(CargarubrosidoDetailPage)} />
      <Route path="/cargarubrosido/editar/:id" element={wrap(CargarubrosidoCreatePage)} />

      {/* ── Consulta Rubros IDO ── */}
      <Route path="/consultarubrosidolist" element={wrap(ConsultarubrosidolistPage)} />
      <Route path="/consultarubrosidolist/create" element={wrap(ConsultarubrosidolistCreatePage)} />
      <Route path="/consultarubrosidolist/:id" element={wrap(ConsultarubrosidolistDetailPage)} />
      <Route path="/consultarubrosidolist/editar/:id" element={wrap(ConsultarubrosidolistCreatePage)} />

      {/* ── Otros módulos ── */}
      <Route path="/procesos" element={wrap(ProcesosPage)} />
      <Route path="/consultas" element={wrap(ConsultasPage)} />
      <Route path="/pago" element={wrap(PagoPage)} />
      <Route path="/prestamos" element={wrap(PrestamosPage)} />
      <Route path="/costos" element={wrap(CostosPage)} />
      <Route path="/beneficios" element={wrap(BeneficiosPage)} />
      <Route path="/integraciones" element={wrap(IntegracionesPage)} />
      <Route path="/reportes" element={wrap(ReportesPage)} />

      {/* 404 */}
      <Route path="*" element={<div style={{ textAlign: 'center', padding: '4rem' }}><h1>404</h1><p>Página no encontrada</p></div>} />
    </Routes>
  );
};
